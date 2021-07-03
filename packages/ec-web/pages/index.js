import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';
import './_app'
import './_document'


export default function Home() {

  const ProductItem = () => {

    return (
      <a href="/product.html" className="product">
          <img src="./img/products/thumb_IP12Pro_VN_1-300x300.jpg" alt="" className="product__img mb-4"/>
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
    )
  }

  const ProductList = () => {

    return(
      <div className="box container px-0">
        <div className="box-title px-3">
            <h2 className="title">
                <i className="fa fa-fire" aria-hidden="true"></i> &nbsp; Hot sale
            </h2>
            <div className="col text-right">
                <a href="" className="text-blue">Xem tất cả</a>
            </div>
        </div>
        <div className="box-body">
          <div className="product-list js-flickity " data-flickity-options='{ "freeScroll": true, "prevNextButtons": false,
          "pageDots": false, "contain": true }'>
              <ProductItem/>
              <ProductItem/>
              <ProductItem/>
              <ProductItem/>
              <ProductItem/>
          </div>
        </div>
      </div>   
    )
  }

  return (
    
      <div id="root">
        <Header />
        <Banner />
        <ProductList />
        <ProductList />
        <ProductList />
        <ProductList />
        <Footer />
      </div>
      
  )
}
