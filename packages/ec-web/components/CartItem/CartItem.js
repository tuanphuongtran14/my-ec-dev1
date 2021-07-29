import { useEffect, useState } from 'react';
import { cartApi } from '../../apis';

export default function CartItem({item, index}) {

    // *********** START: Process toggle select items  ************ //
    const toggleSelectItem = async (e, itemId) => {
        const value = e.target.checked;
        try {
            const data = await cartApi.toggleSelectItem(localStorage.getItem("cartId"), itemId, value);
            setNewCart(data.cart);
        } catch(error) {
            console.log(error);
        }
    };
    
    // ********** START: Process delete selected items  *********** //
    const removeSelectedItems = async () => {
        try {
            const data = await cartApi.removeSelectedItems(localStorage.getItem('cartId'));

            setNewCart(data.cart);
        } catch(error) {
            console.log(error);
        }
    };

    const confirmRemoveItems = () => {
        $(`#removeMutilConfirm`).modal();
    }

    // *********** START: Process render option select  ************ //
    let qtyInStock = 0;
    const optionSelect = item.product.options.map(option => {
        if(option.color === item.color) {
            qtyInStock = option.quantityInStock;
            return (
                <option value={option.color} selected>{ option.color }</option>
            )
        }
        
        return (
            <option value={option.color}>{ option.color }</option>
        )
    });

    return (
        <div className="card mb-3" key={`checkbox${index}`}>
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-1">
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={`customCheck${index}`}
                                    name={`customCheck${index}`}
                                    defaultChecked={item.selected}
                                    onChange={e =>  toggleSelectItem(e, item._id)}
                                />
                                <label
                                    className="custom-control-label"
                                    for={`customCheck${index}`}
                                ></label>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 col-lg-2 pl-0">
                        <img
                            className="img-fluid"
                            src={process.env.NEXT_PUBLIC_API_URL + item.product.thumbnail.url}
                            alt=""
                        />
                    </div>
                    <div className="col">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-5 mb-3">
                                <p className="font-weight-bold">
                                    {item.product.name}
                                </p>
                                <div className="form-group mb-0">
                                    {/* <label for=""></label> */}
                                    <select
                                        className="form-control form-control-sm bg-grey border"
                                        onChange={e => changeItemColor(e, item._id)}
                                    >
                                        { optionSelect }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 mb-3 text-center">
                                <p className="regular-price center">
                                    {item.product.finalPrice.toLocaleString("DE-de")}đ
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-red mr-2"
                                >
                                    <i
                                        className="fa fa-heart"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => confirmRemoveItem(item._id)}
                                >
                                    <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                            <div className="col-12 col-lg-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <button
                                            className="btn btn-quantity-control border rounded-0"
                                            type="button"
                                            id="button-addon1"
                                            onClick={() => decrementQuantityItemByOne(item._id, qtyInStock, `qtyInput${index}`)}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <input
                                        type="number"
                                        className="form-control text-center border rounded-0 pr-0"
                                        defaultValue={item.qty}
                                        id={`qtyInput${index}`}
                                        min={1}
                                        max={qtyInStock}
                                        disabled
                                        aria-label="Example text with button addon"
                                        aria-describedby="button-addon1"
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-quantity-control border rounded-0"
                                            type="button"
                                            id="button-addon2"
                                            onClick={() => incrementQuantityItemByOne(item._id, qtyInStock, `qtyInput${index}`)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <p className="text-center mt-3">Còn lại: {qtyInStock}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
