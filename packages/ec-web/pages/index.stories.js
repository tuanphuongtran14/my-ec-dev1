import React from 'react';

import Home from './index';

export default {
  title: 'pages/Home',
  component: Home,
};

const T = (args) => <Home {...args} />;

export const View = T.bind({});
View.args = {};
