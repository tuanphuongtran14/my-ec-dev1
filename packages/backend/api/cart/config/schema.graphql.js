module.exports = {
    definition: `
        input CartItemInput {
            product: ID!,
            color: String!,
            qty: Int! 
        },

        type ProductItem {
            _id: ID!,
            name: String!,
            slug: String!,
            regular_price: Long!,
            final_price: Long!,
            thumbnail: UploadFile!,
            brand: Brand!
        }

        type CartItem {
            _id: ID!,
            product: ProductItem!,
            color: String!,
            qty: Int!,
            price: Long!
        },

        type UserCart {
            _id: ID!,
            user: UsersPermissionsUser!,
            coupon: Coupon,
            items: [CartItem]!,
            coupon_is_valid: Boolean!,
            total_price: Long!,
            final_price: Long!,
        }
    `,
    query: `
        getCart: UserCart!,
    `,
    mutation: `
        addItemToCart(item: CartItemInput!): UserCart!,
        removeItemFromCart(itemId: ID!): UserCart!,
        applyCoupon(couponCode: String!): UserCart!,
        removeCoupon: UserCart!,
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
            applyCoupon: {
                description: 'Apply a coupon to user cart',
                resolver: 'application::cart.cart.applyCoupon',
            },
            removeCoupon: {
                description: 'Remove a coupon to user cart',
                resolver: 'application::cart.cart.removeCoupon',
            },
      },
    },
  }