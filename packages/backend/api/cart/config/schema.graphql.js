module.exports = {
    definition: `
        input CartItem {
            product: ID!,
            color: String!,
            qty: Int! 
        }
    `,
    query: `
        getCart: Cart!,
    `,
    mutation: `
        addItemToCart(item: CartItem!): Cart!,
        removeItemFromCart(itemId: ID!): Cart!
    `,
    resolver: {
        Query: {
            getCart : {
                description: 'Get user cart',
                resolver: 'application::cart.cart.getCart',
            },
        },
        Mutation: {
            addItemToCart: {
                description: 'Add an item to user cart',
                resolver: 'application::cart.cart.addItemToCart',
            },
            removeItemFromCart: {
                description: 'Remove an item to user cart',
                resolver: 'application::cart.cart.removeItemFromCart',
            },
      },
    },
  }