import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const LinkBtn = (props) => {
  const { label, onClick, href } = props;

  /**
   * return JSX
   * a react component
   */
  return (
    <a className="btn-link" href={href} onClick={onClick}>
      {label}
    </a>
  );
};

LinkBtn.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

LinkBtn.defaultProps = {
  label: 'link btn',
};

export default LinkBtn;
