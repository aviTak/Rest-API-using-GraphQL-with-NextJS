import '../styles/globals.css';
import '../config/theme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import Search from '../components/search/search';

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Search />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
