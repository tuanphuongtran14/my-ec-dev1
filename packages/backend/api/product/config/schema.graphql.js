module.exports = {
    definition: `
        input ProductFilter {
            name: String,
            minPrice: Int,
            maxPrice: Int,
            minRam: Int,
            maxRam: Int,
            screenPanel: String,
            screenResolution: String,
            minScreenSize: Float,
            maxScreenSize: Float,
            minBatteryCapacity: Int,
            maxBatteryCapacity: Int,
            platform: String,
            brand: String,
        }
    `,
    query: `
        searchProducts(filter: ProductFilter, limit: Int, skip: Int, sort: [String]): [Product]!
        findSimilarProducts(id: ID!, limit: Int, skip: Int, sort: [String]): [Product]!
    `,
    resolver: {
      Query: {
          searchProducts: {
            description: 'Search products which match filter',
            resolver: 'application::product.product.search',
          },
          findSimilarProducts: {
            description: 'Receiving product id, then find similar products',
            resolver: 'application::product.product.findSimilar',
          },
      },
    },
  }