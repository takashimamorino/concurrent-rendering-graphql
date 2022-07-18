import { type FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    }
  });

export const Apollo: FC = () => (
  <ApolloProvider client={client}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<h2>Apollo: Loading</h2>}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  </ApolloProvider>
);

const ViewerQuery = gql`
  query {
    viewer { login }
  }
`;

const Component: FC = () => {
  const { data, loading } = useQuery(ViewerQuery);

  if (loading) return <h2>Apollo: Loading</h2>;

  return (
    <>
      <h2>Apollo</h2>
      <p>{data.viewer.login}</p>
    </>
  )
}

const ErrorFallback = () => {
  return <h2>Apollo: Error</h2>
};

