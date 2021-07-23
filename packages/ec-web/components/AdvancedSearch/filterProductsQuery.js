import { gql } from '@apollo/client';

export default function query() {
    const query = gql`  
        query{
            products: searchProducts {
                name,
                brand{
                    name
                },
                platform_name,
                ram,
                screen_size,
                battery_capacity,
                screen_panel
            }
        }
  `

    return query;
}