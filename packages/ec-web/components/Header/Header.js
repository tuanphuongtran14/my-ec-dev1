import React from 'react';
import PropTypes from 'prop-types';

import './header.css';
import LinkBtn from '../LinkBtn';

export const Header = () => (
  <header>
    {/* TODO replace by brand logo */}
    <h1>Hello header</h1>

    <div className="link-block">
      <LinkBtn label={'Home'} />
      <LinkBtn label={'Laptop'} />
      <LinkBtn label={'Accessory'} />
      <LinkBtn label={'Blog'} />
    </div>
  </header>
);

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
};
