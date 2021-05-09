import React from 'react';
import ItemCard from '.';

export default {
  title: 'Components/ItemCard',
  component: ItemCard,
};

const Template = (args) => <ItemCard {...args} />;

export const View = Template.bind({});

View.args = {
  imgUrl: 'https://vlink.com.vn/uploads/laptop_la_gi.jpg',
  name: 'HP laptop',
  price: '0 VND',
};

