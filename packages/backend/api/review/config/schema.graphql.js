module.exports = {
    definition: `
        input editReviewByIdInput {
            comment: String,
            stars: Int
        }
        input addReviewInput {
            productId: ID!, 
            comment: String!, 
            stars: Int!
        }
    `,
    query: `
        getProductReviews(productId: ID!): [Review]!
    `,
    mutation: `
        addProductReview(addReviewInput: addReviewInput!): Review!
        editProductReview(reviewId: ID!, editReviewInput: editReviewInput!): Review!
        deleteProductReview(reviewId: ID!): Review!
    `,
    resolver: {
      Query: {
        getProductReviews: {
            description: `Retrieve product's reviews by product id`,
            resolver: 'application::review.review.getProductReviews',
        },
      },
      Mutation: {
        addProductReview: {
            description: 'Add review for product by id',
            resolver: 'application::review.review.addProductReview',
        },
        editProductReview: {
            description: 'Edit review by id',
            resolver: 'application::review.review.editProductReview',
        },
        deleteProductReview: {
            description: 'Delete review by id',
            resolver: 'application::review.review.deleteProductReview',
        },
      },
    },
  }