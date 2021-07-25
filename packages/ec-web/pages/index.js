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
import Flickity from 'react-flickity-component'

export async function getStaticProps() {
  const { data } = await client.query({
    query: getProductsQuery()
  });

  return {
    props: {
      products: data.products,
      productsBestSell: data.productsBestSell,
      productsBestNew: data.productsBestNew
    },
  };
}


export default function Home({ products, productsBestSell, productsBestNew }) {

  const productHotSale = products.filter(product => product.salesPercentage > 0)

  productHotSale.sort(function (a, b) {
    return b.salesPercentage - a.salesPercentage;
  });

  const displayStars = (stars) => {
    const result = [];
    for (let index = 0; index < stars; index++) {
      result.push(
        <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
      )
    }
    if ((stars - Math.floor(stars)) > 0) {
      result.push(
        <i className="fa product__rating-icon fa-star-half" aria-hidden="true"></i>
      )
    }
    for (let index = result.length; index < 5; index++) {
      result.push(
        <i className="fa product__rating-icon fa-star-o" aria-hidden="true"></i>
      )
    }
    return result;
  }

  const HotSale = productHotSale.map((product) => {
    const regularPrice = product.regularPrice.toLocaleString("DE-de");
    const finalPrice = product.finalPrice.toLocaleString("DE-de");

    return (
      <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} key={product.id}>
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
            {displayStars(product.stars)}
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
      <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} key={product.id}>
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
            {displayStars(product.stars)}
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
      <Link href="/san-pham/[slug]" as={`/san-pham/${product.slug}`} key={product.id}>
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
            {displayStars(product.stars)}
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
      </div>
    )
  }

  return (
    <body className="bodyIndex" id="root">
        <Head>
          <title>Trang chủ</title>
        </Head>
        <Header />
        <Banner />
        {ProductList('Hot sales')}
        {ProductList('Bán chạy')}
        {ProductList('Mới nhất')}
        <Footer />
    </body>
  )
}
