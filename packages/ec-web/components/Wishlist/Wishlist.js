import React from "react";

export default function Wishlist({
    wishLists,
    isSignedIn,
    jwt,
    params,
    // products,
}) {
  
    return wishLists.products.map(product=>{
        
      const image = product.thumbnail.url;
      const name = product.name;
      const price = product.finalPrice;
      let status = "" ;
      if (product.options[0].quantityInStock === 0 )
        status = "Hết hàng";
      else 
        status = "Còn hàng";
      return (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
            <div className="grid wide d-flex">
                    <li className="breadcrumb-item">
                        <h6>Home</h6>
                    </li>
                    <li className="breadcrumb-item">
                        <h6>Wishlist</h6>
                    </li>
                  </div>
            </ol>
          </nav>
          <div className="wishlist">
            <div className="wishlist-row grid wide">
              <div className="row wishlist-row-f8-header">
                <div className="col l-4 md-6 c-6">
                  <h5>Tên sản phẩm</h5>
                </div>
                <div className="col l-2 md-3 c-0">
                  <h5>Giá</h5>
                </div>
                <div className="col l-2 md-3 c-0">
                  <h5>Trạng thái</h5>
                </div>
                <div className="col l-4 md-0 c-0">
                  <h5>Chỉnh Sửa</h5>
                </div>
              </div>
              <div className="row wishlist-row-item mb-2">
                <div className="col l-4 wishlist-item md-6 c-6 d-flex">
                  <div>
                    <img
                      src={process.env.NEXT_PUBLIC_API_URL+image}
                      alt={name}
                      className="wishlist-item_img"
                    />
                  </div>
                  <div>
                    <span className="wishlist-item_text">
                      {name}
                    </span>
                  </div>
                </div>
                <div className="col l-2 md-3 c-3">
                  <span>{price}</span>
                </div>
                <div className="col l-2 md-3 c-3">
                  <span>{status}</span>
                </div>
                <div className="col c-o-4 l-4 md-o-4">
                  <button type="button" className="btn btn-outline-danger">
                    Xóa
                  </button>
                  <button type="button" className="btn btn-outline-info ml-2">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
          
              
              </div>
            </div>
          </div>
      );
      })
}