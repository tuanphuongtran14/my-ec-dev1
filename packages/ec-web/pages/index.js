import Head from "next/head";
import { Header, Footer, Banner, RatingStars } from "../components";
import React, {useState, useEffect } from "react";
import Link from "next/link"
import Flickity from "react-flickity-component";
import { productApi } from "../apis";

export async function getServerSideProps() {
    const { data: {
        productHotSale,
        productsBestSell,
        productsBestNew,
    }} = await productApi.getForHome();

    return {
        props: {
            productHotSale,
            productsBestSell,
            productsBestNew,
        },
    };
}


export default function Home({ productHotSale, productsBestSell, productsBestNew}){
    const [productRelated,setProductRelated]=useState([])
    const [display,setDisplay]= useState(false)
    useEffect(()=>{
        if(window.localStorage.getItem('slug')){
            var slugPr = window.localStorage.getItem('slug')
            setDisplay(true)
        }
        async function getProductRelated(){
            const {data:{productRelated}} = await productApi.getForHome(JSON.parse(slugPr));
            console.log(productRelated)
            if(productRelated.length === 0){
                setDisplay(false)
            }
            setProductRelated(productRelated) 
        }
        getProductRelated()
    },[])

    const setSlugHandler = (slugProduct) => {
        window.localStorage.setItem('slug',JSON.stringify(slugProduct))
    }
    const HotSale = productHotSale.map((product) => {
        const regularPrice = product.regularPrice.toLocaleString("DE-de");
        const finalPrice = product.finalPrice.toLocaleString("DE-de");
        // onClick={setSlugFromLocalStorage.bind(this,product.slug)}

        return (
            <Link  href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} key={product.id + "hotsales"}>
                <div onClick={setSlugHandler.bind(this,product.slug)} className="product">
                    <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url} alt="" className="product__img mb-4" style={{ maxHeight: "204px", maxWidth: "204px" }} />
                    <span className="product__title">
                        <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} className="text-dark">
                            {product.name}
                        </Link>
                    </span>
                    <div className="product__price">
                        {product.salesPercentage === 0 ?
                            null :
                            <span className="sales-price">{finalPrice}₫</span>
                        }
                        <span className="regular-price">{regularPrice}₫</span>
                    </div>
                    <div className="product__rating">
                        <RatingStars stars={product.stars} />
                        <span>({product.votes} đánh giá)</span>
                    </div>
                    {
                        product.salesPercentage != 0 ?
                            <div className="product__box-sticker">
                                <p className="sticker-percent">{product.salesPercentage}%</p>
                            </div>
                            : null
                    }

                </div>
            </Link>
        )
    }
    )

    const productsNew = productsBestNew.map((product) => {
        const regularPrice = product.regularPrice.toLocaleString("DE-de");
        const finalPrice = product.finalPrice.toLocaleString("DE-de");

        return (
            <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} key={product.id + "newarrival"}>
                <div onClick={setSlugHandler.bind(this,product.slug)} className="product">
                    <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url} alt="" className="product__img mb-4" style={{ maxHeight: "204px", maxWidth: "204px" }} />
                    <span className="product__title">
                        <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} className="text-dark">
                            {product.name}
                        </Link>
                    </span>
                    <div className="product__price">
                        {product.salesPercentage === 0 ?
                            null :
                            <span className="sales-price">{finalPrice}₫</span>
                        }
                        <span className="regular-price">{regularPrice}₫</span>
                    </div>
                    <div className="product__rating">
                        <RatingStars stars={product.stars} />
                        <span>({product.votes} đánh giá)</span>
                    </div>
                    {
                        product.salesPercentage != 0 ?
                            <div className="product__box-sticker">
                                <p className="sticker-percent">{product.salesPercentage}%</p>
                            </div>
                            : null
                    }

                </div>
            </Link>
        )
    }
    )

    const bestSeller = productsBestSell.map((product) => {
        const regularPrice = product.regularPrice.toLocaleString("DE-de");
        const finalPrice = product.finalPrice.toLocaleString("DE-de");

        return (
            <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} key={product.id + "bestsellers"}>
                <div onClick={setSlugHandler.bind(this,product.slug)} className="product">
                    <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url} alt="" className="product__img mb-4" style={{ maxHeight: "204px", maxWidth: "204px" }} />
                    <span className="product__title">
                        <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} className="text-dark">
                            {product.name}
                        </Link>
                    </span>
                    <div className="product__price">
                        {product.salesPercentage === 0 ?
                            null :
                            <span className="sales-price">{finalPrice}₫</span>
                        }
                        <span className="regular-price">{regularPrice}₫</span>
                    </div>
                    <div className="product__rating">
                        <RatingStars stars={product.stars} />
                        <span>({product.votes} đánh giá)</span>
                    </div>
                    {
                        product.salesPercentage != 0 ?
                            <div className="product__box-sticker">
                                <p className="sticker-percent">{product.salesPercentage}%</p>
                            </div>
                            : null
                    }

                </div>
            </Link>
        )
    }
    )

    const productsRelated = productRelated.map((product) => {
        const regularPrice = product.regularPrice.toLocaleString("DE-de");
        const finalPrice = product.finalPrice.toLocaleString("DE-de");

        return (
            <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} key={product.id + "newarrival"}>
                <div onClick={setSlugHandler.bind(this,product.slug)} className="product">
                    <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url} alt="" className="product__img mb-4" style={{ maxHeight: "204px", maxWidth: "204px" }} />
                    <span className="product__title">
                        <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} className="text-dark">
                            {product.name}
                        </Link>
                    </span>
                    <div className="product__price">
                        {product.salesPercentage === 0 ?
                            null :
                            <span className="sales-price">{finalPrice}₫</span>
                        }
                        <span className="regular-price">{regularPrice}₫</span>
                    </div>
                    <div className="product__rating">
                        <RatingStars stars={product.stars} />
                        <span>({product.votes} đánh giá)</span>
                    </div>
                    {
                        product.salesPercentage != 0 ?
                            <div className="product__box-sticker">
                                <p className="sticker-percent">{product.salesPercentage}%</p>
                            </div>
                            : null
                    }

                </div>
            </Link>
        )
    }
    )

    const flickityOptions = {
        initialIndex: 0,
        freeScroll: true,
        imagesLoaded: true,
        prevNextButtons: false,
        pageDots: false,
        contain: true
    }

    const ProductList = (typeCategory) => {
        return (
            <div className="container-fluid" style={{ backgroundColor: "#FFF" }}>
                <div className="container">
                    <div className="box">
                        <div className="box-title px-3">
                            <h2 className="title">
                                <i className="fa fa-fire" aria-hidden="true"></i> &nbsp; {typeCategory}
                            </h2>
                            <div className="col text-right">
                                <a href="" className="text-blue">Xem tất cả</a>
                            </div>
                        </div>
                        <div className="box-body">
                            <Flickity
                                className={'product-list border-0'} // default ''
                                elementType={'div'} // default 'div'
                                options={flickityOptions} // takes flickity options {}
                                disableImagesLoaded={false} // default false
                                reloadOnUpdate // default false
                                static // default false
                            >
                                {
                                    typeCategory === 'Hot sales' ? HotSale :
                                    typeCategory === 'Bán chạy' ? bestSeller :
                                    typeCategory === 'Mới nhất' ? productsNew :
                                    typeCategory === 'Đề xuất' ? productsRelated : ''
                                }
                            </Flickity>
                        </div>
                    </div>
                </div></div>
        )
    }

    return (
        <div
            //  className="bodyIndex" 
            id="root"
        >
            <Head>
                <title>Trang chủ</title>
            </Head>
            <Header />
            <Banner />
            {ProductList('Hot sales')}
            {display && ProductList('Đề xuất')}
            {ProductList('Mới nhất')}
            {/* Banner Iphone */}
            <div className="bannerIphone row mx-0">
                <div className="bannerIphone--text col-5">
                    <div>
                        <b><h3 className=" px-auto">Tại sao DeveraShop là nơi tuyệt vời để mua iPhone?</h3></b>
                        <p>Bạn có thể chọn một tùy chọn thanh toán phù hợp với mình, thanh toán ít hơn
                            khi giao dịch, kết nối iPhone mới với nhà cung cấp dịch vụ của bạn và thiết lập nhanh chóng.
                            Bạn cũng có thể trò chuyện với Chuyên gia bất cứ lúc nào.
                        </p>
                        <Link href="/ket-qua-tim-kiem?name=iphone">
                            <button className="bannerIphone--text__btn px-3 py-2">Khám phá ngay</button>
                        </Link>
                    </div>
                </div>
                <div className="bannerIphone--img col-7 px-0">
                    {/* <img
                        src="./img/iphoneWallPaper.jpg"
                        style={{ width: '100%' }}
                    >
                    </img> */}
                </div>
            </div>

            {/* Banner Samsung */}
            <div className="bannerSamsung row mx-0">
                <div className="bannerSamsung--img col-lg-8 px-0"></div>
                <div className="bannerSamsung--text col-lg-4">
                    <div>
                        <b><h3 className=" px-auto">Sáng Tạo Những Khoảnh Khắc Ấn Tượng Với Samsung Galaxy S21 Ultra 5G </h3></b>
                        <p>Được thiết kế với camera cắt viền độc đáo, tạo ra một cuộc cách mạng trong nhiếp ảnh –
                            cho phép bạn quay video 8K chất lượng điện ảnh và chụp nhanh những bức ảnh tuyệt vời,
                            tất cả trong một thao tác. Và với chipset nhanh nhất của Galaxy, loại kính mạnh nhất,
                            5G và pin dùng cả ngày, Ultra dễ dàng tạo nên tên tuổi của mình.
                        </p>
                        <Link href="/ket-qua-tim-kiem?name=samsung">
                            <button className="bannerSamsung--text__btn px-3 py-2">Khám phá ngay</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Banner About Us */}
            <div className="bannerUs mx-0 d-block">
                <div className="bannerUs--text">
                    <b><h3 className="bannerUs--text__title px-auto py-3">Group1's journey</h3></b>
                    <p className="bannerUs--text__content py-3">DeveraShop nhiều năm liền có tên trong các bảng xếp hạng danh giá như TOP 500
                        nhà bán lẻ hàng đầu Châu Á – Thái Bình Dương (Retail Asia) và dẫn đầu TOP 50 công ty kinh doanh
                        hiệu quả nhất Việt Nam (Nhịp Cầu Đầu Tư)… Sự phát triển của DVR cũng là một điển hình tốt được
                        nghiên cứu tại các trường Đại học hàng đầu như Harvard, UC Berkeley, trường kinh doanh Tuck.
                    </p>
                </div>
            </div>
            
            {ProductList('Bán chạy')}

            {/* Banner News */}
            <div className="bannerNews row">
                <div className=" col-12 d-flex justify-content-center align-items-center pb-3">
                    <Link href="new">
                        <h3 className="bannerNews--title">Tin tức mới nhất</h3>
                    </Link>
                </div>
                <div className="bannerNews--content row">
                    <Link href="/tin-tuc/cach-cap-nhat-ios-15-beta-4-dje-su-dung-safari-voi-thiet-ke-giao-dien-moi-va-co-hieu-nang-iphone-on-djinh-hon">
                        <div className="bannerNews--content__item card col-4 border-0">
                            <img src="https://photo2.tinhte.vn/data/attachment-files/2021/07/5567088_cach-cap-nhat-ios-15-beta-4_1280x720-800-resize.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Cách cập nhật iOS 15 Beta 4 để sử dụng Safari với thiết kế giao diện mới và có hiệu năng iPhone ổn định hơn</h5>

                            </div>
                        </div>
                    </Link>
                    <Link href="/tin-tuc/cac-dong-djien-thoai-tam-trung-djang-mua-2021-djen-tu-cac-ong-lon-djau-nganh-la-dan-cong-nghe-lau-nam-ban-dja-biet-het-chua">
                        <div className="bannerNews--content__item card col-4 border-0">
                            <img src="https://i2.wp.com/shiftdelete.net/wp-content/uploads/2021/07/telefon-kameralari-izleniyor-mu-2.jpg?resize=1170%2C658&ssl=1" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Các dòng điện thoại tầm trung đáng mua 2021 đến từ các ông lớn đầu ngành, là dân công nghệ lâu năm, bạn đã biết hết chưa?</h5>

                            </div>
                        </div>
                    </Link>
                    <Link href="/tin-tuc/loat-djien-thoai-vivo-y-giam-sau-het-y-mung-sinh-nhat-gia-djang-hoi-lam-djo-khong-sam-ve-thi-qua-phi">
                        <div className="bannerNews--content__item card col-4 border-0">
                            <img src="https://cdn.tgdd.vn/Files/2021/04/29/1347335/vivoy725gxanh_den-10_800x450_800x450.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Loạt điện thoại Vivo Y giảm sâu hết ý mừng sinh nhật, giá đang hời lắm đó không sắm về thì quá phí</h5>

                            </div>
                        </div>
                    </Link>
                </div>
            </div>


            <Footer />
        </div>
    )
}
