import '../styles/globals.css';
import '../config/theme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
