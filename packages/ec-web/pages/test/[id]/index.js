import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
    const client = new ApolloClient({
        uri: `http://localhost:1337/graphql`,
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
      query: gql`  
      query($filter: ProductFilter!) {
        products: searchProducts {
              name,
              salesPercentage,
              price,
              id,
              thumbnail{
                  url
              }
              options{
                  images{
                      url
                    }
              }
          }
          product: searchProducts(filter: $filter){
              name,
              salesPercentage,
              price,
              id,
              thumbnail{
                  url
              }
              options{
                  images{
                      url
                    }
              }
          }
      }
  `,
  variables: {
    "filter": {
      "id": "60e8201d5718d04fe87af6ae"
    }
  }
    });
  
    return {
      props: {
        product: data.product,
        products: data.products,
      },
    };
  }

const Test = ({product}) => {
    console.log(product)
    return 
    (<>
    </>)
}

export default Test