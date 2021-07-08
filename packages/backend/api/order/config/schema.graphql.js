module.exports = {
    definition: `
        input OrderInfo {
            consignee_name: String!,
            consignee_phone: String!,
            email: String!,
            address_line_1: String!,
            district: String!,
            city: String!,
            payment_method: String!
        }
    `,
    query: `
        getOrders: [Order]!,
    `,
    mutation: `
        checkout(info: OrderInfo!): Order!,
        cancelOrderById(orderId: ID!): Order!,
    `,
    resolver: {
        Query: {
            getOrders : {
                description: `Get user's order`,
                resolver: 'application::order.order.getOrders',
            },
        },
        Mutation: {
            checkout: {
                description: `Checkout user's cart (create an order based on user's cart)`,
                resolver: 'application::order.order.checkout',
            },
            cancelOrderById: {
                description: `Cancel order by id`,
                resolver: 'application::order.order.cancelOrderById',
            },
      },
    },
  }