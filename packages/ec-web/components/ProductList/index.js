import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import ItemCard from '../ItemCard';

const ProductList = (props) => {
  const { items } = props;

  /**
   * return JSX
   * a react component
   */
  return (
    <div className="product-list">
      {items && items.map((item) => <ItemCard {...item} key={item.id} />)}
    </div>
  );
};

ProductList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(ItemCard.propTypes)),
};

export default ProductList;
