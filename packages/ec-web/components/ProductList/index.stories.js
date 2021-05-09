import React from 'react';
import ProductList from '.';

export default {
  title: 'Components/ProductList',
  component: ProductList,
};

const Template = (args) => <ProductList {...args} />;

export const View = Template.bind({});

View.args = {
  items: new Array(27).fill(null).map((_, idx) => ({
    id: idx,
    imgUrl: 'https://vlink.com.vn/uploads/laptop_la_gi.jpg',
    name: 'HP laptop',
    price: '0 VND',
  })),
};
