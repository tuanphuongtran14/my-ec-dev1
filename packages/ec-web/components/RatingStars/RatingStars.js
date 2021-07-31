import React from 'react'

export default function RatingStars({ stars }) {
    const result = [];
    for (let index = 1; index <= stars; index++) {
      result.push(
        <i className="fas fa-star product__rating-icon checked"  key={index}></i>
      );
    }
    if ((stars - Math.floor(stars)) > 0) {
      result.push(
        <i className="fas fa-star-half-alt product__rating-icon checked"  key={result.length + 1}></i>
      );
    }
    for (let index = result.length + 1; index <= 5; index++) {
      result.push(
        <i className="far fa-star product__rating-icon checked"  key={index}></i>
      );
    }
    return result;
}
