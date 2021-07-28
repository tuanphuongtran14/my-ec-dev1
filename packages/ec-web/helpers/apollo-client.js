import {ApolloClient, InMemoryCache, gql } from "@apollo/client";

function graphqlClient(authToken) {
    const options = {
        uri: "http://localhost:1337/graphql",
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'ignore',
              },
              query: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
              },
        }
    };
    

    if (authToken) options.headers = {
        Authorization: `Bearer ${authToken}`
    };

    const client = new ApolloClient(options);

    return client;
}

export { graphqlClient, gql }