export const GET_WISH_LIST = `
getWishLists {
    products {
      id,
      name,
      thumbnail{
        url
      }
      finalPrice,
      options{
        quantityInStock
      }
      
    }
}
`;