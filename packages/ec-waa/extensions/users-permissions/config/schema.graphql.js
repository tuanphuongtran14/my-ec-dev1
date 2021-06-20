module.exports = {
  definition: `
    input CartDetail {
      product: ID!,
      quantity: Int!,
      selectedColor: String!
    },
    type ResponseMessage {
      statusCode: Int!
      message: String!
    }
  `,
  query: `
    cart: [ComponentCartUserCart]!
  `,
  mutation: `
    addItemsToCart(input: [CartDetail]!): ResponseMessage!,
    deleteAllCartItems: ResponseMessage!,
    deleteOneCartItem(id: ID!): ResponseMessage!
  `,
  resolver: {
    Query: {
      cart: {
        description: 'Return the user cart',
        resolver: 'plugins::users-permissions.users.getCart'
      }
    },
    Mutation: {
      addItemsToCart: {
        description: 'Add new detail to user cart',
        resolver: 'plugins::users-permissions.users.addItemsToCart'
      },
      deleteAllCartItems: {
        description: 'Delete all user cart details',
        resolver: 'plugins::users-permissions.users.deleteAllCartItems'
      },
      deleteOneCartItem: {
        description: 'Delete all user cart details',
        resolver: 'plugins::users-permissions.users.deleteOneCartItem'
      }
    }
  },
};