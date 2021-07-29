import React from "react";
import Router from 'next/router'
import { useState,useEffect } from "react";
import { graphqlClient, gql } from "../../helpers/apollo-client";
import Modal from "../../components/Modal/Modal";
export default function Wishlist({ currentProducts, jwt }) {
  
  const [refreshProducts, setRefreshProducts] = useState(currentProducts);
  
  const refreshWishList = async () =>{
    alert('chay roi')
    try{ const client = graphqlClient(jwt);
    
    const {data} = await client.query({
        query: gql`
        query {
            wishLists:
            getWishLists {
              products {
                id,
                name,
                thumbnail{
                  url
                }
                finalPrice
                options{
                  quantityInStock
                }
                
              }
            }
          }
          
          `,
    });
    console.log(data)
    setRefreshProducts([])
    setRefreshProducts(data.wishLists.products)
    return true
  }
  catch{
      return false 
    }
  }
  
  const deleteWishList = async (productId) => {
    const client = graphqlClient(jwt);

    const { dataDeleted } = await client.mutate({
      mutation: gql`
        mutation removeItemsInWishList($productId: ID!) {
          removeItemsInWishList(productId: $productId) {
            user {
              username
            }
            products {
              id
              name
              finalPrice
            }
          }
        }
      `,
      variables: {
        productId: productId,
      },
    });

    return dataDeleted ? true: false;
  };
  
  return refreshProducts.map((product) => {
    const id = product.id;
    const image = product.thumbnail.url;
    const name = product.name;
    const price = product.finalPrice.toLocaleString("DE-de");
    let status = "";
    if (product.options[0].quantityInStock === 0) status = "Hết hàng";
    else status = "Còn hàng";

    /*************************  remove product from wishList *******************************************/
    const handleSubmitDeleteWishList = async () => {
      // e.preventDefault();
      const modal = document.getElementById("deleteConfirm");
      const yesBtn = modal.querySelector("#yesBtn");
  
      try {
        yesBtn.setAttribute("disabled", true);
        yesBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm"></span>
            Đang xóa... 
        `;
  
        const deleteWishList1 = await deleteWishList(id);
  
        if (deleteWishList1) {
      //    $(`#deleteConfirm`).modal("hide");
          alert("alo alo")
          console.log("alo alo")
          await refreshWishList()
          
        }
  
        yesBtn.removeAttribute("disabled");
        yesBtn.innerHTML = "Đồng ý";
      } catch (error) {
        yesBtn.removeAttribute("disabled");
        yesBtn.innerHTML = `
            Đồng ý 
        `;
      }
    };

    return (
      <div
        key={id}
        className="container rounded shadow row wishlist-row-item mt-2 mb-3 ml-2 pt-2 pb-2 text-center"
      >
        <div className="col l-4 wishlist-item md-6 c-6 d-flex">
          <div>
            <img
              // src={process.env.NEXT_PUBLIC_API_URL + image}
              alt={name}
              className="wishlist-item_img"
            />
          </div>
          <div>
            <span className="wishlist-item_text">{name}</span>
          </div>
        </div>
        <div className="col l-2 md-3 c-3 d-flex align-items-center justify-content-center">
          <span>{price} VND</span>
        </div>
        <div className="col l-2 md-3 c-3 d-flex align-items-center justify-content-center">
          <span>{status}</span>
        </div>
        <div className="col c-o-4 l-4 md-o-4 d-flex align-items-center justify-content-center">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => {
              $(`#deleteConfirm`).modal();
            }}
          >
            Xóa
          </button>
          <Modal
            id="deleteConfirm"
            title="Bạn có chắc muốn xóa sản phẩm này ra khỏi sản phẩm yêu thích của bạn không?"
            body="Sản phẩm này sau khi xóa sẽ không thể khôi phục được. Bạn có chắc muốn thực hiện điều này?"
            confirmStyle="danger"
            cancelStyle="secondary"
            callback={handleSubmitDeleteWishList}
          />
          <button type="button" className="btn btn-outline-info ml-2"id="addToCartBtn">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    );
  });
}
