import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';
import './_app'
import './_document'


export default function Home() {

  const ProductItem = (props) => {
      
    const {productTitle,salesPrice,regularPrice,numberReview,salesPercent} = props.product
    
    return (
      <a href="/html" className="product">
          <img src="./img/products/thumb_IP12Pro_VN_1-300x300.jpg" alt="" className="product__img mb-4"/>
          <span className="product__title">{productTitle}</span>
          <div className="product__price">
              <span className="sales-price">{salesPrice}₫</span>
              <span className="regular-price">{regularPrice}₫</span>
          </div>
          <div className="product__rating">
              <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
              <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
              <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
              <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
              <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
              <span>({numberReview} đánh giá)</span>
          </div>
          <div className="product__box-sticker">
              <p className="sticker-percent">{salesPercent}%</p>
          </div>
      </a>
    )
  }

  const product = {
    productTitle: 'Apple iPhone 12 Pro 128GB Chính hãng VN/A',
    salesPrice: '8.990.000',
    regularPrice: '9.490.000',
    numberReview: 472,
    salesPercent: -12,
  }

  const ProductList = (props) => {

    const product = props.product
    return(
      <div className="box container px-0">
        <div className="box-title px-3">
            <h2 className="title">
                <i className="fa fa-fire" aria-hidden="true"></i> &nbsp; {props.typeCategory}
            </h2>
            <div className="col text-right">
                <a href="" className="text-blue">Xem tất cả</a>
            </div>
        </div>
        <div className="box-body">
          <div className="product-list js-flickity " data-flickity-options='{ "freeScroll": true, "prevNextButtons": false,
          "pageDots": false, "contain": true }'>
              <ProductItem product={product}/>
              <ProductItem product={product}/>
              <ProductItem product={product}/>
              <ProductItem product={product}/>
              <ProductItem product={product}/>
          </div>
        </div>
      </div>   
    )
  }

  return (
    <body id="body">
      <div id="root">
        <Header />
        <Banner />
        <ProductList product={product} typeCategory= 'Hot sale'/>
        <ProductList product={product} typeCategory= 'Bán chạy nhất'/>
        <ProductList product={product} typeCategory= 'Sản phẩm mới nhất'/>
        <Footer />
      </div>
    </body>      
  )
}
