import React, { useEffect } from 'react'

export default function ProductList(props) {
    useEffect(() => {
        if(props.isCarousel){
            new Flickity(`#${props.id}`, {
              imagesLoaded: true,
              freeScroll: true,
              prevNextButtons: false,
              pageDots: false,
              contain: true
            });
          }
    })

    let productList = props.productsList.map((product, index) => {
        return (<Product key={index} images={`${Config.API_URL}${product.thumbnail.url}`} sales={product.sales} regularPrice={product.regularPrice} rating={product.rating} votes={product.votes}>
          {product.name}
        </Product>)
      })
  
      return (
            <div className="product-list" id={props.id}>
              {productList}
            </div>
      )
}
