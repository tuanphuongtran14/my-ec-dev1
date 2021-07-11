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
                }
            }
        }
  `

    return query;
}