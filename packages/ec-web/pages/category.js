import Head from 'next/head'
import Header from '../components/Header/Header';
// import {GetServerSideProps} from 'next'

// var Product = {};

export async function getServerSideProps(){
    const res = await fetch(`http://localhost:1337/products`)
    const products = await res.json()

    return { props : {products}}
}

export default function({products}) {
    var product = products.map((product,index)=>{
        const regularPrice = parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').slice(0,-3);
        const salePrice = (product.price - (product.price * product.salespercentage / 100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').slice(0,-3);
        
        // const displayImg = [...product.colors.map(color => {
        //     const imagesOfColor = color.images.map((image, index) => {
        //         return (
        //             <img src={process.env.NEXT_PUBLIC_API_URL + image.url} />
        //         )
        //     })
        //     return imagesOfColor;
        // })]
            // console.log(displayImg)

        return (
            <a href="/product.html" className="product">
                <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url} alt="" className="product__img mb-4" />
                <span className="product__title">{product.name}</span>
                <div className="product__price">
                { product.salespercentage == 0 ? 
                        null :
                        <span className="sales-price">
                            {salePrice}₫
                        </span>
                    }
                    
                    <span className="regular-price">{regularPrice}₫</span>
                </div>
                <div className="product__rating">
                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                    <span>({product.votes})</span>
                </div>
                    { product.salespercentage == 0 ? 
                        null :
                        <div className="product__box-sticker">
                            <p className="sticker-percent">
                                -{product.salespercentage}%
                            </p>
                        </div>
                    }
            </a>
        )
    })
    return (
        <>
            <Head>
                <title>Category</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="title"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                {/* <!-- Bootstrap CSS --> */}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                <link rel="stylesheet" href="./vendors/flickity.min.css" />
                {/* <!-- Optional CSS --> */}
                <link rel="stylesheet" href="./css/style.css" />
            </Head>
            <Header></Header>
            <body id="body">
                <div id="root">
                    <div className="container px-0 banner">
                        <div className="carousel row mx-0">
                            <div className="col-12 col-lg-8 px-0">
                                <div className="gallery js-flickity " data-flickity-options='{ "freeScroll": true, "wrapAround": true }'>
                                    <img className="gallery-cell" src="./img/banner/ROG_Phone_Sliding_desk.webp" alt="" />
                                    <img className="gallery-cell" src="./img/banner/690x300_Buds_.webp" alt="" />
                                    <img className="gallery-cell" src="./img/banner/mg-6690x300.webp" alt="" />
                                    <img className="gallery-cell" src="./img/banner/IMG_20210515_220924_947.webp" alt="" />
                                </div>
                            </div>
                            <div className="sub-banner col-12 col-lg-4 px-0">
                                <div className="col-12 mb-2 pr-0">
                                    <img src="./img/banner/iPhone_12_690x300_copy_3_.webp" alt="" />
                                </div>
                                <div className="col-12 pr-0">
                                    <img src="./img/banner/Right_banner.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-12 bottom-banner px-0 mt-2">
                                <img src="./img/banner/bottom-banner.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="container bg-white mb-5 filter">
                        <div className="d-block py-3">
                            <select name="" id="" className="filter__option mr-2 my-2"> 
                                <option selected>Hãng...</option>
                                <option value="">Iphone</option>
                                <option value="">SamSung</option>
                                <option value="">Oppo</option> 
                            </select>
                    
                            <select name="" id="" className="filter__option mr-2 my-2"> 
                                <option selected>Giá...</option>
                                <option value="">Dưới 2 triệu</option>
                                <option value="">Từ 2 đến 4 triệu</option>
                                <option value="">Từ 4 đến 7 triệu</option>
                                <option value="">Từ 7 đến 13 triệu</option>
                                <option value="">Từ 13 đến 20 triệu</option>
                                <option value="">Trên 20 triệu</option>
                            </select>
                    
                            <select name="" id="" className="filter__option mr-2 my-2"> 
                                <option selected>Hiệu năng & Pin...</option>
                                <option value="">Chơi game / Cấu hình cao</option>
                                <option value="">Pin khủng trên 5000 mAh</option>
                                <option value="">Sạc pin nhanh</option>
                                
                            </select>
                            <select name="" id="" className="filter__option mr-2 my-2"> 
                                <option selected>Ram...</option>
                                <option value="">Dưới 4 GB</option>
                                <option value="">4 - 6 GB</option>
                                <option value="">8 GB trở lên</option>
                                
                            </select>
                            <select name="" id="" className="filter__option mr-2 my-2"> 
                                <option selected>Bộ nhớ trong...</option>
                                <option value="">Dưới 32 GB</option>
                                <option value="">32 - 64 GB</option>
                                <option value="">128 - 256 GB</option>
                                <option value="">512 GB trở lên</option>
                            </select>
                            
                            <select name="" id="" className="filter__option mr-2 my-2"> 
                                <option selected>Tính năng đặc biệt...</option>
                                <option value="">Hỗ trợ 5G</option>
                                <option value="">Bảo mật khuôn mặt</option>
                                <option value="">Bảo mật vân tay</option>
                                <option value="">Sạc không dây</option>
                                <option value="">Chống nước, bụi</option>
                            </select>
                        </div>
                        <div className="product-list product-list--non-slide border-0">
                            {product}
                            {/* <a href="/product.html" className="product">
                                <img src="./img/products/thumb_IP12Pro_VN_1-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Apple iPhone 12 Pro 128GB Chính hãng VN/A</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                                <div className="product__box-sticker">
                                    <p className="sticker-percent">-12%</p>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb-S10-5G-1-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Samsung Galaxy S10 5G 256 cũ 99%</span>
                                <div className="product__price">
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb_A90_1-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Samsung Galaxy A90 5G Hàn 99%</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                                <div className="product__box-sticker">
                                    <p className="sticker-percent">-12%</p>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb_11-ProMAX_2-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Apple iPhone 11 Pro MAX 64GB cũ 99%</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                                <div className="product__box-sticker">
                                    <p className="sticker-percent">-12%</p>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb_Reno5_1-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">OPPO Reno 5 8G/128G Chính Hãng</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb_X3Pro_1-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Xiaomi Poco X3 Pro Chính hãng (6G/128G)</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                                <div className="product__box-sticker">
                                    <p className="sticker-percent">-12%</p>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb_RMN10p_2-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Xiaomi Redmi Note 10 Pro Chính hãng (6GB/ 128GB)</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                                <div className="product__box-sticker">
                                    <p className="sticker-percent">-12%</p>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb-S10-5G-1-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Samsung Galaxy S10 5G 256 cũ 99%</span>
                                <div className="product__price">
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb_A90_1-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Samsung Galaxy A90 5G Hàn 99%</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                                <div className="product__box-sticker">
                                    <p className="sticker-percent">-12%</p>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb_11-ProMAX_2-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Apple iPhone 11 Pro MAX 64GB cũ 99%</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                                <div className="product__box-sticker">
                                    <p className="sticker-percent">-12%</p>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb_Reno5_1-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">OPPO Reno 5 8G/128G Chính Hãng</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb_X3Pro_1-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Xiaomi Poco X3 Pro Chính hãng (6G/128G)</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                                <div className="product__box-sticker">
                                    <p className="sticker-percent">-12%</p>
                                </div>
                            </a>
                            <a href="/product.html" className="product">
                                <img src="./img/products/thumb_RMN10p_2-300x300.jpg" alt="" className="product__img mb-4" />
                                <span className="product__title">Xiaomi Redmi Note 10 Pro Chính hãng (6GB/ 128GB)</span>
                                <div className="product__price">
                                    <span className="sales-price">8.990.000₫</span>
                                    <span className="regular-price">9.490.000₫</span>
                                </div>
                                <div className="product__rating">
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                                    <span>(472 đánh giá)</span>
                                </div>
                                <div className="product__box-sticker">
                                    <p className="sticker-percent">-12%</p>
                                </div>
                            </a> */}
                        </div>
                
                        <nav aria-label="..." className="d-flex justify-content-center my-5">
                        <ul className="pagination pagination--custom">
                            <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item" aria-current="page">
                            <a className="page-link" href="#">2</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                        </nav>
                
                    </div>
                    <footer className="footer mt-auto bg-dark"> 
                        <div className="container text-white text-left text-md-left pt-5">
                        <div className="row">
                            {/* <!-- COLUMN 1 --> */}
                            <div className="col-md-3 mx-auto mb-4 px-3">
                            <h6 className="footer__title text-uppercase font-weight-bold">THÔNG TIN HỖ TRỢ</h6>
                            <ul className="menu menu--vertical">
                                <li><a className="text-white" href="" >Chính sách bảo hành</a></li>
                                <li><a className="text-white" href="/chinh-sach-bao-hanh-iphone-ipad/" title="Chính sách bảo hành iPhone - iPad">Chính sách bảo hành iPhone - iPad</a></li>
                                <li><a className="text-white" href="chinh-sach-doi-tra-hang/" title="Chính sách đổi trả hàng">Bảo hành Xiaomi chính hãng</a></li>
                                <li><a className="text-white" href="/chinh-sach-mua-hang-online/" title="Chính sách mua hàng Online">Chính sách mua hàng Online</a></li>
                                <li><a className="text-white" href="/mua-hang-tra-gop" title="Mua hàng trả góp">Mua hàng trả góp</a></li>
                                <li><a className="text-white" href="/chinh-sach-bao-mat-thong-tin-khach-hang/" title="Mua hàng trả góp">Chính sách bảo mật thông tin khách hàng</a></li>
                                <li><a className="text-white" href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=16826" target="_blank"><img src="https://uqoojcos5nobj.vcdn.cloud/dathongbao.png" style={{width:'130px', height:'auto'}} alt="Đã thông báo với Bộ Công Thương" /></a></li>
                            </ul>
                            </div>
                
                            {/* <!-- COLUMN 2 --> */}
                            <div className="col-md-3 mx-auto mb-4 px-3">
                            <h6 className="footer__title text-uppercase font-weight-bold">THÔNG TIN LIÊN LẠC</h6>
                            <ul className="menu menu--vertical">
                                <li>
                                    <a className="text-white" href="/" title="Hotline">Hotline bán hàng:<br /></a>
                                    <a className="text-white" href="tel:0966062468">0966.06.2468<br /></a>
                                    <a className="text-white" href="tel:1900633471">1900.633.471</a>
                                </li>
                                <li><a className="text-white" href="tel:1900633471" title="Hotline">Hotline bảo hành, kỹ thuật: 1900.633.471</a></li>
                                <li><a className="text-white" href="tel:0962824422" title="Hotline">Hotline hỗ trợ phần mềm: 096.282.4422</a></li>
                                <li><a className="text-white" href="tel:1900633471" title="Hotline">Hotline phản ánh chất lượng dịch vụ:1900.633.471</a></li>
                            </ul>
                            </div>
                
                            {/* <!-- COLUMN 3 --> */}
                            <div className="col-md-3 mx-auto mb-4 px-3">
                            <h6 className="footer__title text-uppercase font-weight-bold">KHU VỰC MIỀN BẮC</h6>
                            <ul className="menu menu--vertical">
                                <li className="text-white">111 Trần Đăng Ninh, Cầu Giấy, Hà Nội</li>
                                <li className="text-white">446 Xã Đàn, Đống Đa, Hà Nội</li>
                                <li className="text-white">118 Thái hà, Đống Đa, Hà Nội</li>
                                <li className="text-white">312 Nguyễn Trãi, P.Trung Văn, Q.Nam Từ Liêm, Hà Nội</li>
                                <li className="text-white">418 Lạch Tray, Ngô Quyền, Hải Phòng</li>
                                <li className="text-white">380 Trần Phú, Ba Đình, TP.Thanh Hóa</li>
                            </ul> 
                            </div>
                
                            {/* <!-- COLUMN 4 --> */}
                            <div className="col-md-3 mx-auto mb-4 px-3">
                            <h6 className="footer__title text-uppercase font-weight-bold">KHU VỰC MIỀN NAM</h6>
                            <ul className="menu menu--vertical">
                                <li className="text-white">111 Trần Đăng Ninh, Cầu Giấy, Hà Nội</li>
                                <li className="text-white">446 Xã Đàn, Đống Đa, Hà Nội</li>
                                <li className="text-white">118 Thái hà, Đống Đa, Hà Nội</li>
                                <li className="text-white">312 Nguyễn Trãi, P.Trung Văn, Q.Nam Từ Liêm, Hà Nội</li>
                                <li className="text-white">418 Lạch Tray, Ngô Quyền, Hải Phòng</li>
                                <li className="text-white">380 Trần Phú, Ba Đình, TP.Thanh Hóa</li>
                            </ul> 
                            </div>
                        </div>
                        </div>
                    </footer>
                </div>
                <form action="" className="search-bar" id="search-bar">
                    <input type="text" name="seach" id="seach" className="search-input" placeholder="Search" />
                    <button type="submit" className="btn btn--search">
                        <i className="fa fa-search " aria-hidden="true"></i>
                    </button>
                </form>
                <div id="overlaybody"></div>
                {/* <!-- Optional JavaScript --> */}
                <script src="./vendors/flickity.pkgd.min.js"></script>
                <script src="./js/main.js"></script>
                {/* <script src=""></script> */}
                {/* <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
            </body>
        </>
    );
}