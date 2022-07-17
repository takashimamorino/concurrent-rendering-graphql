import { type FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createClient, Provider, useQuery } from 'urql';

const client = createClient({
  url: 'https://api.github.com/graphql',
  suspense: true,
  fetchOptions() {
    return {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    };
  },
});

export const Urql: FC = () => (
  <Provider value={client}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<h2>URQL: Loading</h2>}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  </Provider>
);

const ViewerQuery =`
  query {
    viewer { login }
  }
`;

const Component: FC = () => {
  const [{ data }] = useQuery({
    query: ViewerQuery,
  });

  return (
    <>
      <h2>URQL</h2>
      <p>{data.viewer.login}</p>
    </>
  )
}

const ErrorFallback = () => {
  return <h2>URQL: Error</h2>
};