module.exports = {
    definition: `
        input CartItemInput {
            product: ID!,
            color: String!,
            qty: Int! 
        },

        type ProductOption {
            color: String!,
            quantity_in_stock: Int!,
            sold_quantity: Int!,
        }

        type ProductItem {
            _id: ID!,
            name: String!,
            slug: String!,
            regular_price: Long!,
            final_price: Long!,
            thumbnail: UploadFile!,
            brand: Brand!,
            options: [ProductOption]!,
        }

        type CartItem {
            _id: ID!,
            product: ProductItem!,
            color: String!,
            qty: Int!,
            amount: Long!
        },

        type UserCart {
            _id: ID!,
            coupon: Coupon,
            items: [CartItem]!,
            coupon_is_valid: Boolean!,
            total_amount: Long!,
            final_amount: Long!,
        }
    `,
    query: `
        getCart(cartId: ID): UserCart!,
    `,
    mutation: `
        addItemToCart(cartId: ID!, newItem: CartItemInput!): UserCart!,
        removeItemFromCart(cartId: ID!, itemId: ID!): UserCart!,
        incrementItemQuantity(cartId: ID!, itemId: ID!, by: Int!): UserCart!,
        decrementItemQuantity(cartId: ID!, itemId: ID!, by: Int!): UserCart!,
        applyCoupon(cartId: ID!, couponCode: String!): UserCart!,
        removeCoupon(cartId: ID!): UserCart!,
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
            incrementItemQuantity: {
                description: 'Increment quantity item',
                resolver: 'application::cart.cart.incrementItemQuantity',
            },
            decrementItemQuantity: {
                description: 'Decrement quantity item',
                resolver: 'application::cart.cart.decrementItemQuantity',
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