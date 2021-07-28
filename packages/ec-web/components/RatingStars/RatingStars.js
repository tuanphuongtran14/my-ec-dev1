import React from 'react'

export default function RatingStars({ stars }) {
    const result = [];
    for (let index = 0; index < stars; index++) {
      result.push(
        <i className="fa product__rating-icon fa-star checked" aria-hidden="true"></i>
      );
    }
    if ((stars - Math.floor(stars)) > 0) {
      result.push(
        <i className="fa product__rating-icon fa-star-half checked" aria-hidden="true"></i>
      );
    }
    for (let index = result.length; index < 5; index++) {
      result.push(
        <i className="fa product__rating-icon fa-star-o checked" aria-hidden="true"></i>
      );
    }
    return result;
}
