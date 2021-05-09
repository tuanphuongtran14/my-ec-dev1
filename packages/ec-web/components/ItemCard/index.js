import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const ItemCard = (props) => {
  const { name, price, imgUrl, onClick } = props;

  /**
   * return JSX
   * a react component
   */
  return (
    <div className="item-card" onClick={onClick}>
      <div className="item-card__thumbnail">
        <img src={imgUrl} alt="item-thumbnail" />
      </div>

      <div className="item-card__info">
        <p>{name}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  imgUrl: PropTypes.string,
  onClick: PropTypes.func,
};

ItemCard.defaultProps = {
  label: 'link btn',
};

export default ItemCard;
