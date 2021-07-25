import React from 'react'

const New = () => {
    return (
        <div>
            <nav className="breadcrumb breadcrumb--custom my-1">
                <div className="container px-0 d-flex">
                    <a className="breadcrumb-item" href="#">Trang chủ</a>
                    <span className="breadcrumb-item active">Tin tức</span>
                </div>
            </nav>
            <div className="container px-0 banner">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="/img/News/690x300_Buds_.webp" alt="First slide"/>
                            <div className="carousel-caption carousel-caption__edit">
                                <span className="category">Tin hot</span>
                                <h3>
                                    <a href="">[Khám phá] 3 thủ thuật nhỏ giúp bạn bảo mật iPhone hiệu quả</a>
                                </h3>
                                <span className="date">18 Tháng Bảy, 2021</span>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/img/News/IMG_20210515_220924_947.webp" alt="Second slide"/>
                            <div className="carousel-caption carousel-caption__edit">
                            <span className="category">Tin hot</span>
                            <h3>
                                <a href="">[Khám phá] 3 thủ thuật nhỏ giúp bạn bảo mật iPhone hiệu quả</a>
                            </h3>
                            <span className="date">18 Tháng Bảy, 2021</span>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/img/News/mg-6690x300.webp" alt="Third slide"/>
                            <div className="carousel-caption carousel-caption__edit">
                            <span className="category">Tin hot</span>
                            <h3>
                                <a href="">[Khám phá] 3 thủ thuật nhỏ giúp bạn bảo mật iPhone hiệu quả</a>
                            </h3>
                            <span className="date">18 Tháng Bảy, 2021</span>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>

            <div className="container  pt-52px px-0 mb-4" style={{"background-color": " #fff "}}>
           <div className="banner-child">
               <div className="banner-item col-lg-4">
                   <img src="img/News/690x300_Buds_.webp"/>
                   <h3>
                       <a href="">[Khám phá] 3 thủ thuật nhỏ giúp bạn bảo mật iPhone hiệu quả</a>
                   </h3>
                   <span className="category">Tin hot</span>
                   <span className="date" >18 Tháng Bảy, 2021</span>
               </div>
               <div className="banner-item col-lg-4">
                   <img src="img/News/690x300_Buds_.webp"/>
                   <h3>
                       <a href="">[Khám phá] 3 thủ thuật nhỏ giúp bạn bảo mật iPhone hiệu quả</a>
                   </h3>
                   <span className="category">Tin hot</span>
                   <span className="date" >18 Tháng Bảy, 2021</span>
               </div>
               <div className="banner-item col-lg-4">
                   <img src="img/News/690x300_Buds_.webp"/>
                   <h3>
                       <a href="">[Khám phá] 3 thủ thuật nhỏ giúp bạn bảo mật iPhone hiệu quả</a>
                   </h3>
                   <span className="category">Tin hot</span>
                   <span className="date" >18 Tháng Bảy, 2021</span>
               </div>
           </div>
        </div>
        <div className="container mt-4  px-0 mb-4 news" style={{"background-color": " #fff "}}>
            <div className="col-lg-8 list-news">
                <div className="list-news__item pt-46">
                    <div className="col-lg-4 list-news__item-img">
                        <img src="./img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news__item-detail">
                        <h3>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h3>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                        <p>Những hình ảnh render đầu tiên về smartphone Redmi Note 11 Pro với camera 200MP đã xuất hiện lần đầu trên trang LetsGoDigital. Lộ diện...</p>
                    </div>
                </div>
                <div className="list-news__item pt-46">
                    <div className="col-lg-4 list-news__item-img">
                        <img src="./img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news__item-detail">
                        <h3>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h3>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                        <p>Những hình ảnh render đầu tiên về smartphone Redmi Note 11 Pro với camera 200MP đã xuất hiện lần đầu trên trang LetsGoDigital. Lộ diện...</p>
                    </div>
                </div>
                <div className="list-news__item pt-46">
                    <div className="col-lg-4 list-news__item-img">
                        <img src="./img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news__item-detail">
                        <h3>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h3>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                        <p>Những hình ảnh render đầu tiên về smartphone Redmi Note 11 Pro với camera 200MP đã xuất hiện lần đầu trên trang LetsGoDigital. Lộ diện...</p>
                    </div>
                </div>
                <div className="list-news__item pt-46">
                    <div className="col-lg-4 list-news__item-img">
                        <img src="./img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news__item-detail">
                        <h3>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h3>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                        <p>Những hình ảnh render đầu tiên về smartphone Redmi Note 11 Pro với camera 200MP đã xuất hiện lần đầu trên trang LetsGoDigital. Lộ diện...</p>
                    </div>
                </div>
                <div className="list-news__item pt-46">
                    <div className="col-lg-4 list-news__item-img">
                        <img src="./img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news__item-detail">
                        <h3>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h3>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                        <p>Những hình ảnh render đầu tiên về smartphone Redmi Note 11 Pro với camera 200MP đã xuất hiện lần đầu trên trang LetsGoDigital. Lộ diện...</p>
                    </div>
                </div>
                <div className="list-news__item pt-46">
                    <div className="col-lg-4 list-news__item-img">
                        <img src="./img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news__item-detail">
                        <h3>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h3>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                        <p>Những hình ảnh render đầu tiên về smartphone Redmi Note 11 Pro với camera 200MP đã xuất hiện lần đầu trên trang LetsGoDigital. Lộ diện...</p>
                    </div>
                </div>
                <div className="wrap-next-prev">
                    <a href="" className="wrap-next-prev__prev">
                        <i className="fa fa-angle-left wrap-next-prev__icon-edit" aria-hidden="true"></i>
                    </a>
                    <a href="" className="wrap-next-prev__next">
                        <i className="fa fa-angle-right wrap-next-prev__icon-edit" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
            <div className="col-lg-4 list-news-hot">
                <h4 className="list-news-hot__title">
                    <span>Bài viết đáng chú ý</span>
                </h4>
                <div className="list-news-hot__item">
                    <div className="col-lg-4 list-news-hot__item-img">
                        <img src="./img/News/690x300_Buds_.webp"/>
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
                        <img src="./img/News/690x300_Buds_.webp"/>
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
                        <img src="./img/News/690x300_Buds_.webp"/>
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
                        <img src="./img/News/690x300_Buds_.webp"/>
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
                        <img src="./img/News/690x300_Buds_.webp"/>
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

        </div>
    )
}

export default New
