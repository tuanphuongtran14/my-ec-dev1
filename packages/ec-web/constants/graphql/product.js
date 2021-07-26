export const GET_BEST_SELLERS = `
    searchProducts(sort:["total_sold:desc"], limit: $limit) {
        name
        slug
        regularPrice
        salesPercentage
        finalPrice
        votes
        stars
        thumbnail{
            url
        }
    }
`;

export const GET_HOT_SALES = `
    searchProducts(sort:["salesPercentage:desc"], limit: $limit) {
        name
        slug
        regularPrice
        salesPercentage
        finalPrice
        votes
        stars
        thumbnail{
            url
        }
    }
`;

export const GET_NEW_ARRIVALS = `
    searchProducts(sort:["createAt:desc"], limit: $limit) {
        name
        slug
        regularPrice
        salesPercentage
        finalPrice
        votes
        stars
        thumbnail{
            url
        }
    }
`;

