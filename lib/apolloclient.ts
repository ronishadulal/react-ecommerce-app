import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://api.escuelajs.co/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;