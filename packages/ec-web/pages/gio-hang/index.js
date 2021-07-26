import React, {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link"
import { useAuth } from '../../helpers/auth';
import { cartApi } from '../../apis';
import { Header, Footer, Modal } from '../../components';

export const getServerSideProps = useAuth(async ({ req, res, params }) => {
    const user = req.session.get("user");
    return {
        props: {
            isSignedIn: user ? true : false,
        },
    };
});

const index = () => {
    const [items, setItems] = useState([]);
    const [coupon, setCoupon] = useState({});
    const [enableMutilRemove, setEnableMutilRemove] = useState(false);
    const [amount, setAmount] = useState({
        totalAmount: 0,
        finalAmount: 0,
    });
    let deleleItemId = '';

    // ************* START: Fetch cart first time ************** //
    useEffect(() => {
        fetchCart();
    }, []);

    // ********* START: Track selection to turn on select all ********* //
    useEffect(() => {
        const selectedItems = items.filter(item => {
            return item.selected;
        });

        if(selectedItems.length === items.length && items.length > 0)
            document.getElementById("customCheckAll").checked = true;
        else   
            document.getElementById("customCheckAll").checked = false;

        if(selectedItems.length > 0)
            setEnableMutilRemove(true);
        else 
            setEnableMutilRemove(false);
            
    },[items]);

    // ************* START: Set state for new cart ************** //
    const setNewCart = (newCart) => {
        localStorage.setItem("cartId", newCart._id);
        setItems([]);
        setAmount({
            totalAmount: newCart.totalAmount,
            finalAmount: newCart.finalAmount,
        });
        setCoupon({
            code: (newCart.coupon) ? newCart.coupon.code : null,
            couponIsValid: newCart.couponIsValid
        });
        setItems(newCart.items);
    }

    // ************** START: Fetch cart first time  *************** //
    const fetchCart = async () => {
        try {
            const data = await cartApi.getCart(localStorage.getItem("cartId"));

            setNewCart(data.cart);

        } catch(error) {
            console.log(error);
        }
    };

    // *********** START: Process toggle select items  ************ //
    const toggleSelectItem = async (e, itemId) => {
        const value = e.target.checked;

        try {
            const data = await cartApi.toggleSelectItem(localStorage.getItem("cartId"), itemId, value);

            setNewCart(data.cart);
        } catch(error) {
            console.log(error);
        }
    }

    // ********** START: Process toggle select all items  ********** //
    const toggleSelectAll = async e => {
        const value = e.target.checked;

        try {
            const data = await cartApi.toggleSelectAllItems(localStorage.getItem("cartId"), value);

            setNewCart(data.cart);

            const selects = document.querySelectorAll(".custom-checkbox input[type=checkbox]");
            for(let i = 0; i <= selects.length; i++) {
                selects[i].checked = value;
            }

        } catch(error) {
            console.log(error);
        }
    }

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
                    
    // ************* START: Process delete an item  ************** //
    const removeItem = async itemId => {
        try {
            const data = await cartApi.removeItem(localStorage.getItem('cartId'), itemId);
            
            setNewCart(data.cart);
        } catch(error) {
            console.log(error);
        }
    };

    const confirmRemoveItem = itemId => {
        $(`#removeItemConfirm`).modal();
        deleleItemId = itemId;
    }            
    
    // ********** START: Process increment quantity item ********** //
    const incrementQuantityItemByOne = async (itemId, qtyInStock, qtyInputId) => {
        const currentQty = Number(document.getElementById(qtyInputId).value);
        if(currentQty + 1 > qtyInStock) 
            return warnIncrementQty(qtyInStock);

        try {
            const data = await cartApi.incrementQuantity(localStorage.getItem('cartId'), itemId, 1);

            setNewCart(data.cart);
        } catch(error) {
            console.log(error);
        }
    }

    const warnIncrementQty = qtyInStock => {
        document.querySelector("#warningIncreQty .modal-title").innerText = `Số lượng tối đa mà bạn có thể mua sản phẩm này là: ${qtyInStock}`;
        $(`#warningIncreQty`).modal();
    };
    
    // ********** START: Process decrement quantity item ********** //
    const decrementQuantityItemByOne = async (itemId, qtyInStock, qtyInputId) => {
        const currentQty = Number(document.getElementById(qtyInputId).value);
        if(currentQty - 1 < 1) 
            return warnDecrementQty(itemId);

        try {
            const data = await cartApi.decrementQuantity(localStorage.getItem('cartId'), itemId, 1);
            setNewCart(data.cart);
        } catch(error) {
            console.log(error);
        }
    };

    const warnDecrementQty = itemId => {
        $(`#warningDecreQty`).modal();
    };

    // *************** START: Process apply coupon *************** //
    const applyCoupon = async () => {
        const couponCode = document.getElementById('couponInput').value;
        try {
            const data = await cartApi.applyCoupon(localStorage.getItem('cartId'), couponCode);
            setNewCart(data.cart);
        } catch(error) {
            console.log(error);
            setCoupon({
                wrong: true
            });
        } 
    }

    // *************** START: Process remove coupon *************** //
    const removeCoupon = async () => {
        try {
            const data = await cartApi.removeCoupon(localStorage.getItem('cartId'));
            setNewCart(data.cart);
        } catch(error) {
            console.log(error);
            setCoupon({
                wrong: true
            });
        } 
    }

    // ************* START: Process change item color ************* //
    const changeItemColor = async (e, itemId) => {
        const color = e.target.value;

        try {
            const data = await cartApi.changeItemColor(localStorage.getItem('cartId'), itemId, color);
            setNewCart(data.cart);
        } catch(error) {
            console.log(error);
        } 
    }

    // *************** START: Process display items *************** //
    const displayItems = () => {
        return items.map((item, index) => {
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
                                                className="form-control form-control-sm bg-grey border-0"
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
                                            <div class="input-group-append">
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
            );
        })
    };


    return (
        <>
            <Head>
                <title>Giỏ hàng</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Header />
            {/* <Cart/> */}
            <nav className="breadcrumb breadcrumb--custom my-1">
                <div className="container">
                    <a className="breadcrumb-item" href="/">
                        Trang chủ
                    </a>
                    <span className="breadcrumb-item active">Giỏ hàng</span>
                </div>
            </nav>
            <div className="container mb-3">
                <div className="box-2-column">
                    <div className="box-left-12 box-left-9-lg">
                        <div className="card mb-3">
                            <div className="card-body py-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-group mb-0">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="customCheckAll"
                                                name="customCheckAll"
                                                onChange={toggleSelectAll}
                                            />
                                            <label
                                                className="custom-control-label"
                                                for="customCheckAll"
                                            >
                                                Chọn tất cả
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <button className={`btn w-100 d-flex align-items-center ${!enableMutilRemove ? 'invisible' : ''}`} onClick={confirmRemoveItems}>
                                            <span className="d-block mr-2">
                                                <i
                                                    className="fa fa-trash-o fa--md text-grey"
                                                    aria-hidden="true"
                                                ></i>
                                            </span>
                                            <span className="d-block">Xóa</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { displayItems() }
                    </div>
                    <div className="box-left-12 box-right-3-lg">
                        <div className="card mb-3">
                            <div className="card-body">
                                <label htmlFor="couponInput">
                                    <h2 className="title mb-3">
                                        Nhập mã khuyến mãi
                                    </h2>
                                </label>
                                <form className="coupon__section d-flex ">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            name="couponInput"
                                            id="couponInput"
                                            className="form-control rounded-left"
                                            defaultValue={coupon.code}
                                            aria-describedby="helpId"
                                            disabled={(!coupon.code) ? false : true}
                                        />
                                        <div className="input-group-append">
                                            {(!coupon.code) ? (
                                                <button
                                                    className="btn btn-success"
                                                    type="button"
                                                    onClick={applyCoupon}
                                                >
                                                    Áp dụng
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-dark"
                                                    type="button"
                                                    onClick={removeCoupon}
                                                >
                                                    Hủy bỏ
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                                { (!coupon.couponIsValid && coupon.code) ? (
                                    <p className="text-danger">
                                        Mã khuyến mãi này đã hết hạn!
                                    </p>
                                ) : '' }
                                { (coupon.wrong) ? (
                                    <p className="text-danger">
                                        Mã khuyến mãi này không hợp lệ!
                                    </p>
                                ) : '' }
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <dl className="dlist-align">
                                    <dt>Tổng tiền:</dt>
                                    <dd className="text-right">{amount.totalAmount.toLocaleString("DE-de")}đ</dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Giảm giá:</dt>
                                    <dd className="text-right text-danger">
                                        - {(amount.totalAmount - amount.finalAmount).toLocaleString("DE-de")}đ
                                    </dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Thành tiền:</dt>
                                    <dd className="text-right text-dark b">
                                        <strong>{amount.finalAmount.toLocaleString("DE-de")}đ</strong>
                                    </dd>
                                </dl>
                                <hr />
                                <Link href="/checkout">
                                <a
                                    href=""
                                    className="btn btn--buy-now  btn-block"
                                >
                                    {" "}
                                    Thanh toán{" "}
                                </a>
                                </Link>
                                <Link href="/"> 
                                    <a className="btn btn-light btn-block">
                                        Tiếp tục mua sắm
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                id="removeMutilConfirm"
                title="Bạn có chắc muốn xóa các sản phẩm này khỏi giỏ hàng?"
                confirmStyle="danger"
                cancelStyle="success"
                callback={removeSelectedItems}
            />
            <Modal
                id="removeItemConfirm"
                title="Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?"
                confirmStyle="danger"
                cancelStyle="success"
                callback={() => removeItem(deleleItemId)}
            />
            <Modal
                id="warningIncreQty"
                title={`Số lượng tối đa mà bạn có thể mua với sản phẩm này là: ${0}`}
                confirmStyle="success"
                onlyConfirm={true}
            />
            <Modal
                id="warningDecreQty"
                title={`Số lượng tối thiểu để bạn có thể mua sản phẩm này là: 1`}
                confirmStyle="success"
                onlyConfirm={true}
            />
            <Footer />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </>
    );
};

export default index;
