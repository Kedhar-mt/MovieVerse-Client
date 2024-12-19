import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://movieverse-7969.onrender.com/', // Backend GraphQL server URL
  cache: new InMemoryCache(),
});

const ApolloProviderWrapper = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloProviderWrapper;
