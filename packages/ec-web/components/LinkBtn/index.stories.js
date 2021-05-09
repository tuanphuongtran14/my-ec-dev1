import React from 'react';
import LinkBtn from '.';

export default {
  title: 'Components/LinkBtn',
  component: LinkBtn,
};

const Template = (args) => <LinkBtn {...args} />;

export const HomeLink = Template.bind({});

HomeLink.args = {
  label: 'Home',
};

export const LinkBtns = () => (
  <div style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}>
    <LinkBtn label={'Home'} />
    <LinkBtn label={'Laptop'} />
    <LinkBtn label={'Accessory'} />
    <LinkBtn label={'Blog'} />
  </div>
);
