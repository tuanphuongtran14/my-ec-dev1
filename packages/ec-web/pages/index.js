import Head from "next/head";
import { Header, Footer, Banner, RatingStars } from "../components";
import Link from "next/link"
import React from "react";
import Flickity from "react-flickity-component";
import { productApi } from "../apis";

export async function getServerSideProps() {
  const {
    productHotSale,
    productsBestSell,
    productsBestNew
  } = await productApi.getForHome();

  return {
    props: {
      productHotSale,
      productsBestSell,
      productsBestNew
    },
  };
}


export default function Home({ productHotSale, productsBestSell, productsBestNew }) {

    const HotSale = productHotSale.map((product) => {
        const regularPrice = product.regularPrice.toLocaleString("DE-de");
        const finalPrice = product.finalPrice.toLocaleString("DE-de");

        return (
            <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} key={product.id + "hotsales" }>
                <div className="product">
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
            <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} key={product.id + "newarrival" }>
                <div className="product">
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
            <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} key={product.id + "bestsellers" }>
                <div className="product">
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
        initialIndex: 2,
        freeScroll: true,
        imagesLoaded: true,
        prevNextButtons: false,
        pageDots: false,
        contain: true
    }

    const ProductList = (typeCategory) => {
        return (
            <div className="container-fluid" style={{backgroundColor: "#FFF"}}>
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
                            {typeCategory === 'Hot sales' ? HotSale :
                                typeCategory === 'Bán chạy' ? bestSeller :
                                    typeCategory === 'Mới nhất' ? productsNew : ''
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
            {ProductList('Bán chạy')}

            {/* Banner Iphone */}
            <div className="bannerIphone row bg-white mx-0">
                <div className="bannerIphoneText col-5 d-flex justify-content-center align-items-center text-center">
                    <div>
                        <b><h3 className=" px-auto">Tại sao DeveraShop là nơi tuyệt vời để mua iPhone?</h3></b>
                        <p>Bạn có thể chọn một tùy chọn thanh toán phù hợp với mình, thanh toán ít hơn
                            khi giao dịch, kết nối iPhone mới với nhà cung cấp dịch vụ của bạn và thiết lập nhanh chóng.
                            Bạn cũng có thể trò chuyện với Chuyên gia bất cứ lúc nào.
                        </p>
                        <button className="btnIphone px-3 py-2">Khám phá ngay</button>
                    </div>
                </div>
                <div className="bannerIphoneImg col-7 px-0">
                    <img
                        src="./img/iphoneWallPaper.jpg"
                        style={{ width: '100%' }}
                    >
                    </img>
                </div>
            </div>

            {/* Banner Samsung */}
            <div className="bannerSamsung row bg-white mx-0">
                <div className="bannerSamsungImg col-8 px-0">
                    <img
                        src="https://images.unsplash.com/photo-1611282104291-6bd45ca8bf93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        style={{ width: '100%' }}
                    >
                    </img>
                </div>
                <div className="bannerSamsungText col-4 d-flex justify-content-center align-items-center text-center">
                    <div>
                        <b><h3 className=" px-auto">Sáng Tạo Những Khoảnh Khắc Ấn Tượng Với Samsung Galaxy S21 Ultra 5G </h3></b>
                        <p>Được thiết kế với camera cắt viền độc đáo, tạo ra một cuộc cách mạng trong nhiếp ảnh – 
                            cho phép bạn quay video 8K chất lượng điện ảnh và chụp nhanh những bức ảnh tuyệt vời, 
                            tất cả trong một thao tác. Và với chipset nhanh nhất của Galaxy, loại kính mạnh nhất, 
                            5G và pin dùng cả ngày, Ultra dễ dàng tạo nên tên tuổi của mình.
                        </p>
                        <button className="btnSamsung px-3 py-2">Khám phá ngay</button>
                    </div>
                </div>
            </div>
            <div className="bannerUs row bg-white mx-0">
                <div className="bannerUsText d-flex justify-content-center align-items-center text-center" style={{backgroundColor: "#111113"}}>
                    <div>
                        <b><h3 className="px-auto py-3">Group1's journey</h3></b>
                        <p className="py-3">DeveraShop nhiều năm liền có tên trong các bảng xếp hạng danh giá như TOP 500 
                        nhà bán lẻ hàng đầu Châu Á – Thái Bình Dương (Retail Asia) và dẫn đầu TOP 50 công ty kinh doanh 
                        hiệu quả nhất Việt Nam (Nhịp Cầu Đầu Tư)… Sự phát triển của DVR cũng là một điển hình tốt được 
                        nghiên cứu tại các trường Đại học hàng đầu như Harvard, UC Berkeley, trường kinh doanh Tuck.
                        </p>
                    </div>
                </div>
            </div>


            {ProductList('Mới nhất')}
            <Footer />
        </div>
    )
}
