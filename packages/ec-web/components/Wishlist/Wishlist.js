import React from 'react'

const Wishlist = () => {
    return (
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">WhishList</li>
            </ol>
            </nav>
            <div className="wishlist">
            <h1>Wishlist</h1>
            <hr />
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
                <div className="row wishlist-row-item">
                <div className="col l-4 wishlist-item md-6 c-6 d-flex">
                    <div>
                    <img
                        src="https://didongviet.vn/pub/media/catalog/product//i/p/iphone-12-didongviet_1.jpg"
                        alt="iphone"
                        className="wishlist-item_img"
                    />
                    </div>
                    <div>
                    <span className="wishlist-item_text"
                        >iPhone 12 128GB Chính hãng (VN/A)</span
                    >
                    </div>
                </div>
                <div className="col l-2 md-3 c-3">
                    <span>25.000.000đ</span>
                </div>
                <div className="col l-2 md-3 c-3">
                    <span>Còn hàng</span>
                </div>
                <div className="col c-o-4 l-4 md-o-4">
                    <button type="button" className="btn btn-outline-danger">Xóa</button>
                    <button type="button" className="btn btn-outline-info">
                    Thêm vào giỏ hàng
                    </button>
                </div>
                </div>
                <div className="row wishlist-row-item">
                <div className="col l-4 wishlist-item md-6 c-6 d-flex">
                    <div>
                    <img
                        src="https://didongviet.vn/pub/media/catalog/product//i/p/iphone-12-didongviet_1.jpg"
                        alt="iphone"
                        className="wishlist-item_img"
                    />
                    </div>
                    <div>
                    <span className="wishlist-item_text"
                        >iPhone 12 128GB Chính hãng (VN/A)</span
                    >
                    </div>
                </div>
                <div className="col l-2 md-3 c-3">
                    <span>25.000.000đ</span>
                </div>
                <div className="col l-2 md-3 c-3">
                    <span>Còn hàng</span>
                </div>
                <div className="col c-o-4 l-4 md-o-4">
                    <button type="button" className="btn btn-outline-danger">Xóa</button>
                    <button type="button" className="btn btn-outline-info">
                    Thêm vào giỏ hàng
                    </button>
                </div>
                </div>
                <div className="row wishlist-row-item">
                <div className="col l-4 wishlist-item md-6 c-6 d-flex">
                    <div>
                    <img
                        src="https://didongviet.vn/pub/media/catalog/product//i/p/iphone-12-didongviet_1.jpg"
                        alt="iphone"
                        className="wishlist-item_img"
                    />
                    </div>
                    <div>
                    <span className="wishlist-item_text"
                        >iPhone 12 128GB Chính hãng (VN/A)</span
                    >
                    </div>
                </div>
                <div className="col l-2 md-3 c-3">
                    <span>25.000.000đ</span>
                </div>
                <div className="col l-2 md-3 c-3">
                    <span>Còn hàng</span>
                </div>
                <div className="col c-o-4 l-4 md-o-4">
                    <button type="button" className="btn btn-outline-danger">Xóa</button>
                    <button type="button" className="btn btn-outline-info">
                    Thêm vào giỏ hàng
                    </button>
                </div>
                </div>
            </div>
            <hr />
            </div>
        </div>
    )
}

export default Wishlist
