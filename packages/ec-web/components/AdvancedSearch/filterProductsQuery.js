import { gql } from '@apollo/client';

export default function query() {
    const query = gql`  
        query{
            products: searchProducts {
                name,
                brand{
                    name
                },
                platformName,
                ram,
                screenSize,
                battery_capacity,
                screenPanel
            }
        }
  `

    return query;
}