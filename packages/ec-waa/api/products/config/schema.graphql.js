module.exports = {
  query: `
    productsByName(searchInput: String!): [Products]!
  `,
  resolver: {
    Query: {
        productsByName: {
        description: 'Return the products by name',
        resolverOf: 'application::products.products.find', // Will apply the same policy on the custom resolver as the controller's action `findByCategories`.
        resolver: async (obj, options, ctx) => {
          // ctx is the context of the Koa request.
          console.log(obj);
          console.log(ctx);

          let products = await strapi.models.products.find({name: options.searchInput});

          return products;
        },
      },
    },
  },
};