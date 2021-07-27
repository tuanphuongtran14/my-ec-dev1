import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: `${process.env.GRAPHLQL_API_URL}/graphql`,
    cache: new InMemoryCache(),
});

export { apolloClient, gql };