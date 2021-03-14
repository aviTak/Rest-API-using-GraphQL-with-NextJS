import Head from 'next/head';

import SingleMovie from '../components/single-movie/single-movie';
import { initializeApollo } from '../lib/apollo';
import { getMovieQuery } from '../lib/queries/queries';

export const getServerSideProps = async (context) => {
    const id = context.params.imdbID;
  
    const apolloClient = initializeApollo();

    await apolloClient.query({
      query: getMovieQuery,
      variables: { imdbID: id },
    })
    .catch(e => {
        console.log(e.message);
    });


    return {
      props: { 
            initialApolloState: apolloClient.cache.extract(), 
            id
        },
    };
};


export default function Movie({ id }) {
  return (
    <>
      <SingleMovie id={id} />
    </>
  );
};