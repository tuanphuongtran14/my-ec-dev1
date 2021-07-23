import { gql } from '@apollo/client';

export default function query() {
    const query = gql`  
        query{
            products: searchProducts {
                name,
                slug,
                salesPercentage,
                regularPrice,
                finalPrice,
                id,
                thumbnail{
                    url
                },
                ram,
                rom,
                brand{
                    name,
                    slug
                },
                updatedAt
            }
            productsBestSell: searchProducts(sort:["total_sold:desc"],
            limit:10
            )
            {
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
            productsBestNew:searchProducts(sort:["createAt:desc"],
            limit:10
            ){
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

            cart:getCart(cartId:"60f7f03207418c1d68001ea7"){
              _id
              items{
                _id
                product{
                  _id
                  name
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