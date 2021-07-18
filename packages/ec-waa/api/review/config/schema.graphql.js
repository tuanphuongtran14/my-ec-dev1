module.exports = {
    definition: `
        input editReviewByIdInput {
            comment: String,
            stars: Int
        }
        input createProductReviewInput {
            productId: ID!, 
            comment: String!, 
            stars: Int!
        }
    `,
    query: `
        getReviewsByProduct(productId: ID!): [Review]!
    `,
    mutation: `
        createReviewForProduct(createReviewInput: createProductReviewInput!): Review!
        editReviewById(reviewId: ID!, editReviewInput: editReviewInput!): Review!
        deleteReviewById(reviewId: ID!): Review!
    `,
    resolver: {
      Query: {
        getReviewsByProduct: {
            description: `Retrieve product's reviews by product id`,
            resolver: 'application::review.review.getReviewsByProduct',
        },
      },
      Mutation: {
        createReviewForProduct: {
            description: 'Add review for product by id',
            resolver: 'application::review.review.createReviewForProduct',
        },
        editReviewById: {
            description: 'Edit review by id',
            resolver: 'application::review.review.editReviewById',
        },
        deleteReviewById: {
            description: 'Delete review by id',
            resolver: 'application::review.review.deleteReviewById',
        },
      },
    },
  }