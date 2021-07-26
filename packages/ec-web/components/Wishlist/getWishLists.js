import { gql, useQuery } from '@apollo/client';

export default function query() {
const query =
gql`
query {
	wishLists:
  getWishLists {
    products {
      id,
      name,
      thumbnail{
        url
      }
      finalPrice
      options{
        quantityInStock
      }
      
    }
	}
}

`
return query;
}
