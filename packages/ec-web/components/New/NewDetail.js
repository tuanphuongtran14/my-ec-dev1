import React from 'react'

const NewDetail = (props) => {
    return (
        <>
            <nav className="breadcrumb breadcrumb--custom my-1">
            <div className="container px-0 d-flex">
                <a className="breadcrumb-item" href="#">Trang chủ</a>
                <span className="breadcrumb-item active">Tin tức</span>
            </div>
        </nav>
        <div className="container mt-4 pt-28 px-0 mb-4" style={{"background-color": "#fff"}}>
            <div className="list-category">
                <span className="category"><a href="">Tin hot</a></span>
                <span className="category"><a href="">Tin trong ngày</a></span>
                <span className="category"><a href="">Tin tức</a></span>
                <span className="category"><a href="">Tin công nghệ</a></span>
               
            </div>
            <h1 className="entry-title">{props.title}</h1>
            <span className="date-header-news-detail">18 Tháng Bảy, 2021</span>
        </div>
        <div className="container mt-4  px-0 mb-4 news">
            <div className="col-lg-8 news-detail">
                <div className="news-detail__image">
                    <img src="../../img/News/690x300_Buds_.webp"/>
                </div>
                <div id="news-detail__description" dangerouslySetInnerHTML={{
                                        __html: props.description,
                                    }}>
                </div>
            </div>
            <div className="col-lg-4 list-news-hot">
                <h4 className="list-news-hot__title">
                    <span>Bài viết mới</span>
                </h4>
                <div className="list-news-new__item">
                    <div className="col-lg-12 list-news-new__item-img">
                        <img src="../../img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-12 list-news-new__item-detail">
                        <h5>
                            <a href="">IPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h5>
                        <span>18 Tháng Bảy, 2021</span>
                        <p>Rò rỉ thương hiệu phụ của Xiaomi là Redmi đang chuẩn bị giới thiệu mẫu Redmi K40 Ultra. Thông tin chi tiết về pin...</p>
                    </div>
                </div>
                <div className="list-news-hot__item">
                    <div className="col-lg-4 list-news-hot__item-img">
                        <img src="../../img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news-hot__item-detail">
                        <h5>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h5>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                    </div>
                </div>
                <div className="list-news-hot__item">
                    <div className="col-lg-4 list-news-hot__item-img">
                        <img src="../../img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news-hot__item-detail">
                        <h5>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h5>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                    </div>
                </div>
                <div className="list-news-hot__item">
                    <div className="col-lg-4 list-news-hot__item-img">
                        <img src="../../img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news-hot__item-detail">
                        <h5>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h5>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                    </div>
                </div>
                <div className="list-news-hot__item">
                    <div className="col-lg-4 list-news-hot__item-img">
                        <img src="../../img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news-hot__item-detail">
                        <h5>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h5>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default NewDetail
