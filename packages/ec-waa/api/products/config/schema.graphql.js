module.exports = {
  definition: `
    input ProductFilter {
      id: ID,
      name: String,
      minPrice: Int,
      maxPrice: Int,
      screenType: String,
      minScreenSize: Float,
      maxScreenSize: Float,
      minRam: Float,
      maxRam: Float,
      minInternalMem: Int,
      maxInternalMem: Int,
      platform: String,
      brand: String,
      color: String,
      isSales: Boolean
    }
  `,
  query: `
    productsByName(searchInput: String!): [Products]!,
    newArrivalsProduct(limit: Int): [Products]!
    bestSellersProduct(limit: Int): [Products]!
    hotSalesProduct(limit: Int): [Products]!
    searchProduct(filter: ProductFilter, skip: Int, limit: Int): [Products]!
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
        }
      },
      newArrivalsProduct: {
        description: 'Return new arrrivals products',
        resolverOf: 'application::products.products.find', // Will apply the same policy on the custom resolver as the controller's action `find`.
        resolver: async (obj, options, ctx) => {
          let products = await strapi.models.products.find({}).sort({ updatedAt: 'desc'}).limit(options.limit || 10);
          return products;
        }
      },
      bestSellersProduct: {
        description: 'Return bestsellers products',
        resolverOf: 'application::products.products.find', // Will apply the same policy on the custom resolver as the controller's action `find`.
        resolver: async (obj, options, ctx) => {
          let products = await strapi.models.products.find({}).sort({ sold: 'desc'}).limit(options.limit || 10);
          return products;
        }
      },
      hotSalesProduct: {
        description: 'Return bestsellers products',
        resolverOf: 'application::products.products.find', // Will apply the same policy on the custom resolver as the controller's action `find`.
        resolver: async (obj, options, ctx) => {
          let products = await strapi.models.products.find({}).sort({ salespercentage: 'desc'}).limit(options.limit || 10);
          return products;
        }
      },
      searchProduct: {
        description: 'Return products by filter',
        resolver: 'application::products.products.searchProduct'
      }
    },
  },
};