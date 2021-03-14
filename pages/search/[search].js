import Head from 'next/head';

import Movies from '../../components/movies/movies';
import { initializeApollo } from '../../lib/apollo';
import { getMoviesQuery } from '../../lib/queries/queries';

export const getServerSideProps = async (context) => {
  const search = context.params.search;

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: getMoviesQuery,
    variables: { search, page: 1 },
  })
  .catch(e => {
      console.log(e.message);
  });


  return {
    props: { 
          initialApolloState: apolloClient.cache.extract(), 
          search,
          file: (new Date()).getSeconds()
      },
  };
};

export default function Search({ search, file }) {
  return (
    <>
      <Movies search={search} file={file} />
    </>
  );
};