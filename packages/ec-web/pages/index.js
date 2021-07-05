import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';
import './_app'
import './_document'
import Link from 'next/link'

export async function getServerSideProps(){
  const res = await fetch(`http://localhost:1337/products`)
  const products = await res.json() 
  return { props : {products}}
}
 
export default function Home({products}) {

  const ProductItem = products.slice(0,5).map((product) => {
    const regularPrice = parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&.").slice(0, -3);
    const salePrice = (product.price - (product.price * product.salespercentage) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&.").slice(0, -3);
    
    return (
      <a href="/html" className="product">
          <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url} alt="" className="product__img mb-4"/>
          <span className="product__title">
            <Link href="/product/[idProduct]" as={`/product/${product.id}`} className="text-dark">
              {product.name}
            </Link>
          </span>
          <div className="product__price">
              <span className="sales-price">{salePrice}₫</span>
              <span className="regular-price">{regularPrice}₫</span>
          </div>
          <div className="product__rating">
              <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
              <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
              <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
              <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
              <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
              <span>(472 đánh giá)</span>
          </div>
          {
            product.salespercentage != 0 ?
            <div className="product__box-sticker">
              <p className="sticker-percent">{product.salespercentage}%</p>
            </div>
            : null
          }
          
      </a>
    )
  }
  )

  const ProductList = (typeCategory) => {

    return(
      <div className="box container px-0">
        <div className="box-title px-3">
            <h2 className="title">
                <i className="fa fa-fire" aria-hidden="true"></i> &nbsp; {typeCategory}
            </h2>
            <div className="col text-right">
                <a href="" className="text-blue">Xem tất cả</a>
            </div>
        </div>
        <div className="box-body">
          <div className="product-list js-flickity " data-flickity-options='{ "freeScroll": true, "prevNextButtons": false,
          "pageDots": false, "contain": true }'>
              {ProductItem}
          </div>
        </div>
      </div>   
    )
  }

  return (
    <body id="body">
      <div id="root">
        <Head>
          <title>Trang chủ</title>
        </Head>
        <Header />
        <Banner />
        {ProductList('Hot sale')}
        {ProductList('Bán chạy nhất')}
        {ProductList('Sản phẩm mới nhất')}
        <Footer />
      </div>
    </body>      
  )
}
