import Head from "next/head";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://localhost:1337/products/${params.id}`); // REST API
    const product = await res.json(); 
    const res2 = await fetch(`http://localhost:1337/products`); // REST API
    const products = await res2.json();
    return { props: { product , products } };
} 

export default function ({ product, products}) {
    
    const regularPrice = parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&.").slice(0, -3);
    const salePrice = (product.price - (product.price * product.salespercentage) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&.").slice(0, -3);
    
    const relatedProduct = products.slice(0,4).map((product, index) => {
        const regularPrice = parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&.").slice(0, -3);
        const salePrice = (product.price - (product.price * product.salespercentage) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&.").slice(0, -3);
        return (
            <a href="/product.html" className="product col-6 col-md-3 col-lg-10 col-xl-9 my-3" >
                <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url} alt="" className="product__img mb-4" />
                <span className="product__title">
                    {product.name}
                </span>
                <div className="product__price">
                    <span className="sales-price">{salePrice}₫</span>
                    <span className="regular-price">{regularPrice}₫</span>
                </div>
                <div className="product__rating">
                    <i className="fa product__rating-icon fa-star" aria-hidden="true" />
                    <i className="fa product__rating-icon fa-star" aria-hidden="true" />
                    <i className="fa product__rating-icon fa-star" aria-hidden="true" />
                    <i className="fa product__rating-icon fa-star" aria-hidden="true" />
                    <i className="fa product__rating-icon fa-star" aria-hidden="true" />
                    <span>(472 đánh giá)</span>
                </div>
                { product.salespercentage > 0 ? 
                    <div className="product__box-sticker">
                        <p className="sticker-percent">-{product.salespercentage}%</p>
                    </div>
                    : ""
                } 
            </a> 
        )
    })

    // Hình ảnh lớn của sản phẩm
    const color = product.colors.map((color, index) => {
        const image = color.images.map((image, index) => {
            return process.env.NEXT_PUBLIC_API_URL + image.url;
        });
        return (
            <>
                <img className="product-image" src={image} alt="" />
            </>
        );
    });
    
    // Hình ảnh nhỏ của sản phẩm
    const thumbs = product.colors.map((color, index) => {
        const image = color.images.map((image, index) => {
            return process.env.NEXT_PUBLIC_API_URL + image.url;
        });
        return (
            <img className={index === 0 ? "thumbnail active" : "thumbnail"} src={image} alt={index} />
        );
    });
    
    // Các lựa chọn màu sắc
    const colorOption = product.colors.map((colorItem,index)=>{
        return  <div className={index === 0 ? "version active" : "version"}>
                        {colorItem.color}
                        <span className="version__price">{index >= 2 ? regularPrice : salePrice}</span>
                    </div>
    }) 

    return (
        <>
            <Head> 
                {/* <!-- CSS --> */}
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
                {/* <!-- JavaScript --> */}
                <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
            </Head>
            <Header />

            <div id="root">
                
            <Head>
                        <title>{product.name}</title>
                    </Head>
                    <nav className="breadcrumb breadcrumb--custom my-1">
                        <div className="container px-0">
                            <a className="breadcrumb-item" href="/">
                                Trang chủ
                            </a>
                            <a className="breadcrumb-item" href="/category">
                                Cửa hàng
                            </a>
                            <span className="breadcrumb-item active">{product.name}</span>
                        </div>
                    </nav>
                    <article className="container product-details bg-white">
                        <section className="row mx-0 py-2">
                            <h1 className="col-12 col-lg-6 product-details__name">
                                {product.name}
                            </h1>
                            <div className="col-12 col-lg-6 product-details__rating">
                                <span className="rating-result mr-3">
                                    <i className="fa fa-star checked" />
                                    <i className="fa fa-star checked" />
                                    <i className="fa fa-star checked" />
                                    <i className="fa fa-star checked" />
                                    <i className="fa fa-star checked" />
                                </span>
                                <span>
                                    4 Đánh giá | <a href>Nhận xét ngay</a>
                                </span>
                            </div>
                        </section>
                        <section className="row mx-0">
                            <div className="product-details__images px-0 px-md-2 col-12 col-lg-4 col-xl-4 mb-3 ">
                                <div
                                    className="product-images__slide js-flickity mb-2"
                                    data-flickity-options='{ "freeScroll": true, "wrapAround": true, "prevNextButtons": false, &apos;pageDots&apos;: false }'
                                >
                                    {color}
                                </div>

                                <div className="product-images__thumbnails px-4">{thumbs}</div>
                            </div>
                            <div className="px-0 px-md-2 col-12 col-lg-4 col-xl-4 mb-3">
                                <div className="product-details__price">
                                    <span className="sales-price">{salePrice} ₫ </span>
                                    <span className="regular-price">{regularPrice} ₫</span>
                                </div>
                                <p className="my-2">
                                    <b>Chọn phiên bản phù hợp</b>
                                </p>
                                <div className="product-details__versions" id="versions">
                                    <div className="version active">
                                        {product.ram}G
                                        <span className="version__price">{salePrice} ₫</span>
                                    </div>
                                    {/* <div className="version active">
                                        512G
                                        <span className="version__price">38,590,000 ₫</span>
                                    </div>
                                    <div className="version">
                                        256G
                                        <span className="version__price">38,590,000 ₫</span>
                                    </div>
                                    <div className="version">
                                        128G
                                        <span className="version__price">38,590,000 ₫</span>
                                    </div> */}
                                </div>
                                <p className="my-2">
                                    <b>Chọn màu phù hợp</b>
                                </p>
                                <div className="product-details__versions" id="colors">
                                    {colorOption}
                                </div>
                                <div className="row px-0 mx-0">
                                    <button className="btn btn--buy-now col-12 px-0 mb-2">
                                        <i
                                            className="fa fa-cart-arrow-down fa--md"
                                            aria-hidden="true"
                                        />
                                        &nbsp; Mua ngay
                                    </button>
                                    <div className="col-6 pl-0 pr-1">
                                        <button className="btn btn-success w-100">
                                            <i className="fa fa-cart-plus" aria-hidden="true" />
                                            &nbsp; Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                    <div className="col-6 pr-0 pl-1">
                                        <button className="btn btn-primary w-100">
                                            <i className="fa fa-heart" aria-hidden="true" />
                                            &nbsp; Thêm vào yêu thích
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="px-0 px-md-2 col-12 col-lg-4 col-xl-4 mb-3">
                                <b>Khuyến mãi: </b>
                                <ul className="product-details__bonus" dangerouslySetInnerHTML={{__html: product.promotions}}></ul>
                                <div className="mt-2">
                                    <b>Tình trạng</b>
                                    <br />
                                    <div className="text-justify" dangerouslySetInnerHTML={{__html: product.condition}}></div>
                                </div>
                                <div className="mt-2">
                                    <b>Hộp bao gồm</b>
                                    <br />
                                    <div className="text-justify pl-3" dangerouslySetInnerHTML={{__html: product.boxIncluded}}></div>
                                </div>
                                <div className="mt-2">
                                    <b>Bảo hành</b>
                                    <br />
                                    <div className="text-justify pl-3" dangerouslySetInnerHTML={{__html: product.warranty}} ></div> 
                                </div>
                            </div>
                        </section>
                    </article>
                    <article className="container row mx-auto px-0">
                        <div className="col-12 col-lg-8 bg-white bd-top--fake-bg px-0 ">
                            <ul className="nav--custom nav nav-pills my-2" id="pills-tab" role="tablist" >
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link"  id="pills-home-tab" data-toggle="pill" href="#pills-desc"  role="tab" aria-controls="pills-desc" aria-selected="true" >
                                        Mô tả
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-specification" role="tab" aria-controls="pills-specification" aria-selected="false" >
                                        Thông số
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="pills-contact-tab" data-toggle="pill"  href="#pills-reviews" role="tab" aria-controls="pills-reviews" aria-selected="false"  >
                                        Đánh giá
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content container" id="pills-tabContent">
                                <div className="tablist_content tab-pane fade show active" id="pills-desc"  role="tabpanel"  aria-labelledby="pills-desc-tab" dangerouslySetInnerHTML={{__html: product.description}}>
                                </div>

                                <div className="tablist_content tab-pane fade" id="pills-specification" role="tabpanel" aria-labelledby="pills-specification-tab" >
                                    <h4>Thông số kỹ thuật chi tiết {product.name}</h4>
                                    <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url}  className="img_product img_product-specification"  alt="" />
                                    <table className="table table-specification">
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>Kích thước</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="row">Chiều dài</td>
                                                <td>{product.height}mm</td>
                                            </tr>
                                            <tr>
                                                <td scope="row">Chiều rộng</td>
                                                <td>{product.width}mm</td>
                                            </tr>
                                            <tr>
                                                <td scope="row">Độ dày</td>
                                                <td>{product.depth}mm</td>
                                            </tr>
                                        </tbody>
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>Màn hình</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="row">Công nghệ màn hình</td>
                                                <td>{product.screenType}</td>
                                            </tr>
                                            <tr>
                                                <td scope="row">Độ phân giải</td>
                                                <td>{product.resolution}</td>
                                            </tr>
                                        </tbody>
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>Nền tảng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="row">Hệ điều hành</td>
                                                <td>{product.platformName}</td>
                                            </tr>
                                            <tr>
                                                <td scope="row">Phiên bản</td>
                                                <td>{product.platformVersion}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div
                                    className="customer-reviews tablist_content tab-pane fade"
                                    id="pills-reviews"
                                    role="tabpanel"
                                    aria-labelledby="pills-reviews-tab"
                                >
                                    <div className="d-flex justify-content-between row mx-0 p-3 border">
                                        <div className="customer-reviews__overviews">
                                            <span className="overviews__grade">4.5/5</span>
                                            <span className="rating-result">
                                                <i className="fa fa-star checked" aria-hidden="true" />
                                                <i className="fa fa-star checked" aria-hidden="true" />
                                                <i className="fa fa-star checked" aria-hidden="true" />
                                                <i className="fa fa-star checked" aria-hidden="true" />
                                                <i className="fa fa-star-half-empty checked" aria-hidden="true" />
                                            </span>
                                            <span className="overviews__quantity-reviews mt-1">
                                                4 Đánh giá
                                            </span>
                                        </div>
                                        <div className="customer-reviews__details">
                                            <div className="rating-details">
                                                <span className="rating-result">
                                                    5
                                                    <i className="fa fa-star checked" aria-hidden="true" />
                                                </span>
                                                <div className="rate-status">
                                                    <div className="rate-status__progress" style={{ width: "50%" }} />
                                                </div>
                                                <span className="rating__ratio">50%</span>
                                            </div>
                                            <div className="rating-details">
                                                <span className="rating-result">
                                                    4
                                                    <i className="fa fa-star checked" aria-hidden="true" />
                                                </span>
                                                <div className="rate-status">
                                                    <div className="rate-status__progress" style={{ width: "50%" }} />
                                                </div>
                                                <span className="rating__ratio">50%</span>
                                            </div>
                                            <div className="rating-details">
                                                <span className="rating-result">
                                                    3
                                                    <i className="fa fa-star checked" aria-hidden="true" />
                                                </span>
                                                <div className="rate-status">
                                                    <div className="rate-status__progress" style={{ width: "0%" }} />
                                                </div>
                                                <span className="rating__ratio">0%</span>
                                            </div>
                                            <div className="rating-details">
                                                <span className="rating-result">
                                                    2
                                                    <i className="fa fa-star checked" aria-hidden="true" />
                                                </span>
                                                <div className="rate-status">
                                                    <div className="rate-status__progress" style={{ width: "0%" }} />
                                                </div>
                                                <span className="rating__ratio">0%</span>
                                            </div>
                                            <div className="rating-details">
                                                <span className="rating-result">
                                                    1
                                                    <i className="fa fa-star checked" aria-hidden="true" />
                                                </span>
                                                <div className="rate-status">
                                                    <div className="rate-status__progress" style={{ width: "0%" }} />
                                                </div>
                                                <span className="rating__ratio">0%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <form action className="px-0">
                                        <p className="font-weight-bold my-2">
                                            Đánh giá sản phẩm này
                                        </p>
                                        <div className="form-group w-100">
                                            <label htmlFor>Đánh giá của bạn: </label>
                                            <span className="rating-result">
                                                <i className="fa fa-star-o checked" aria-hidden="true" />
                                                <i className="fa fa-star-o checked" aria-hidden="true" />
                                                <i className="fa fa-star-o checked" aria-hidden="true" />
                                                <i className="fa fa-star-o checked" aria-hidden="true" />
                                                <i className="fa fa-star-o checked" aria-hidden="true" />
                                            </span>
                                            <textarea className="form-control mb-3"
                                                name
                                                id
                                                rows={3}
                                                defaultValue={""}
                                            />
                                            <button type="submit" className="btn btn-success">
                                                Submit
                                            </button>
                                        </div>
                                    </form>

                                    <div className="row mx-0 padding-x my-3">
                                        <p className="d-inline-block mr-5">Sắp xếp theo: </p>
                                        <div className="form-check mr-5">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="sort" id="sort-positive" defaultValue="checkedValue" defaultChecked />
                                                Đánh giá tích cực
                                            </label>
                                        </div>
                                        <div className="form-check mr-5">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="sort" id="sort-negative" defaultValue="checkedValue" />
                                                Đánh giá tiêu cực
                                            </label>
                                        </div>
                                    </div>
                                    <div className="comment border p-3 my-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="username"> 
                                                Trần Tuấn Phương
                                            </div>
                                            <div className="posted-time">
                                                <span>3 ngày trước</span>
                                                <span>19/4/2020</span>
                                            </div>
                                        </div>
                                        <span className="rating-result">
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                        </span>
                                        <p className="content">
                                            Cho mình hỏi khung nhôm và khung thép không gỉ thì khung
                                            nào tốt hơn và ít bị trầy hơn?
                                        </p>
                                    </div>
                                    <div className="comment border p-3 my-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="username">Võ Yến Nhi</div>
                                            <div className="posted-time">
                                                <span>4 ngày trước</span>
                                                <span>18/4/2020</span>
                                            </div>
                                        </div>
                                        <span className="rating-result">
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                        </span>
                                        <p className="content">
                                            Mình muốn mua trả góp từ bao nhiêu tuổi thì được?
                                        </p>
                                    </div>
                                    <div className="comment border p-3 my-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="username"> 
                                                Nguyễn Anh Tuấn
                                            </div>
                                            <div className="posted-time">
                                                <span>3 ngày trước</span>
                                                <span>19/4/2020</span>
                                            </div>
                                        </div>
                                        <span className="rating-result">
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                            <i className="fa fa-star checked" aria-hidden="true" />
                                        </span>
                                        <p className="content">
                                            Cho hỏi giờ muốn đổi ip12 xanh lá qua đen bù bao nhiêu
                                            tiền mua chưa được tháng
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 bg-white bd-top-left--fake-bg">
                            <h2 className="title text-center my-3">Sản phẩm liên quan</h2>
                            <div className="related-products row mx-0 pb-3">
                                {relatedProduct}
                            </div>
                        </div>
                    </article>
                
                <form action className="search-bar" id="search-bar">
                    <input
                        type="text"
                        name="seach"
                        id="seach"
                        className="search-input"
                        placeholder="Search"
                    />
                    <button type="submit" className="btn btn--search">
                        <i className="fa fa-search " aria-hidden="true" />
                    </button>
                </form>
                <div id="overlaybody" />
            </div>
            <Footer />
            {/* <!-- Optional JavaScript --> */}
            <script src="/vendors/flickity.pkgd.min.js"></script>
            <script src="/js/main.js"></script>
            {/* <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
            <script
                src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossorigin="anonymous"
            ></script>
            <script
                src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
                integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                crossorigin="anonymous"
            ></script>
            <script
                src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                crossorigin="anonymous"
            ></script>
        </>
    );
}
