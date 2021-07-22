import { gql } from '@apollo/client';

export default function query() {
    const query = gql`  
        query{
            products: searchProducts {
                name,
                slug,
                sales_percentage,
                regular_price,
                final_price,
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
              regular_price
              sales_percentage
              final_price
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
              regular_price
              sales_percentage
              final_price
              votes
              stars
              thumbnail{
                url
              }
            }
        }
  `

    return query;
}