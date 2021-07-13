import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';
import './_app'
import './_document'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import client from '../components/Category/apolloClient';
import getProductsQuery from '../components/Category/getProductsQuery';

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getProductsQuery()
  });

  return {
    props: {
      products: data.products,
    },
  };
}

export default function Home({ products }) {

  const ProductItem = products.slice(0, 5).map((product) => {
    const regularPrice = product.regular_price.toLocaleString("DE-de");
    const finalPrice = product.final_price.toLocaleString("DE-de");

    return (
      <Link href="/product/[slug]" as={`/product/${product.slug}`}>
        <div className="product">
          <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url} alt="" className="product__img mb-4" />
          <span className="product__title">
            <Link href="/product/[slug]" as={`/product/${product.slug}`} className="text-dark">
              {product.name}
            </Link>
          </span>
          <div className="product__price">
            {product.sales_percentage === 0 ?
              null :
              <span className="sales-price">{finalPrice}₫</span>
            }
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
            product.sales_percentage != 0 ?
              <div className="product__box-sticker">
                <p className="sticker-percent">{product.sales_percentage}%</p>
              </div>
              : null
          }

        </div>
      </Link>
    )
  }
  )

  const ProductList = (typeCategory) => {

    return (
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
          <div className="js-flickity " data-flickity-options='{ "freeScroll": true, "prevNextButtons": false, "pageDots": false, "contain": true }'>
            <div className="product-list product-list--non-slide border-0">
              {ProductItem}
            </div>
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
