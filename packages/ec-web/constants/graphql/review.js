export const GET_PRODUCT_REVIEWS = `
    getReviewsByProductSlug(slug: $slug) {
        reviews {
            _id
            user {
                username
            }
            comment
            stars
            createdAt
        }
        userReview {
            _id
            user {
                username
            }
            comment
            stars
            createdAt
        }
        overviews {
            oneStar
            twoStar
            threeStar
            fourStar
            fiveStar
            total,
            average
        }
    }
`;