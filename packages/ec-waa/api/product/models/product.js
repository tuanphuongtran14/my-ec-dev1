'use strict';
const slugify = require('slugify');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
      beforeCreate: async (data) => {
        if (data.name) 
          data.slug = slugify(data.name, {
              lower: true
          });

        if (data.sales_percentage > 0) {
          data.final_price = data.regular_price * (1 - data.sales_percentage / 100);
          data.final_price -= data.final_price % 10000;
        }
        else
          data.final_price = data.regular_price;
      },
      beforeUpdate: async (params, data) => {
        if (data.name) 
          data.slug = slugify(data.name, {
            lower: true
        });
          
        if (data.sales_percentage > 0) {
          data.final_price = data.regular_price * (1 - data.sales_percentage / 100);
          data.final_price -= data.final_price % 1000;
        }
        else
          data.final_price = data.regular_price;
      },
    },
};
