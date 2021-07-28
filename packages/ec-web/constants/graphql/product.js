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

export const GET_PRODUCT_DETAIL_BY_SLUG = `
    searchProducts(filter: {
        slug: $slug
    }) {
        _id
        name
        salesPercentage
        slug
        regularPrice
        finalPrice
        id
        ram
        thumbnail {
            url
        }
        fullDesc
        condition
        warranty
        inclusionBox
        promotion
        height
        width
        depth
        platformName
        platformVersion
        screenSize
        screenPanel
        screenResolution
        cpu
        gpu
        options {
            images {
                url
            }
            color,
        }
    }
`

export const GET_RELATED_PRODUCTS = `
    findRelatedBySlug(slug: $slug){
        id,
        name,
        slug,
        thumbnail{
            url
        }
        regularPrice,
        finalPrice,
        salesPercentage
    }
`

