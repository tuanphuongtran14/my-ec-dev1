import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useEffect, useState } from 'react';

const Test = () => {
    const client = new ApolloClient({
        uri: `http://localhost:1337/graphql`,
        cache: new InMemoryCache(),
    });

    const [products, setProducts] = useState([])

    const graphql = gql`
        query GetProducts{
            products{
                name,
                id
            }
        }
    `

    useEffect(() => {
        client
            .query({
                query: graphql
            })
            .then(res => setProducts(res.data.products))
        
    }, [])

    return (
        <>
            {products.map(product => {
                return (
                    <h2>{product.name}</h2>
                )
            })}
        </>
    );
}

export default Test