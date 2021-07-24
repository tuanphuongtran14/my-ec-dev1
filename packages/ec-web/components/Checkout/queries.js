import {gql} from '@apollo/client'

const GET_ALL_ITEMS_CART = gql`
query {
  getCart(cartId:"60fad82a01bf170548e3abbc")
  {
    _id
    items{
      color
      product{
        thumbnail{
          url
        }
        name
        finalPrice
      }
      qty
      amount
    }
    finalAmount
  }
}`;
  export {GET_ALL_ITEMS_CART};