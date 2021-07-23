import { gql } from '@apollo/client';

export default function query() {
    const query = gql`  
        query{
          cart:getCart(cartId:"60f7f03207418c1d68001ea7"){
            _id
            items{
              _id
              product{
                _id
                name
                thumbnail{
                  url
                }
              }
              color
              qty
              amount
            }
            total_amount
            final_amount
          }
        }
  `
    return query;
}