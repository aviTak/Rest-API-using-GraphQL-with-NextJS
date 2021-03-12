import { ApolloClient } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { cache } from '../config/cache';

const restLink = new RestLink({ 
  uri: "https://www.omdbapi.com/",
  //responseTransformer: async response => response.json().then(({data}) => data),

  typePatcher: {    
    Movies: (data, outerType, patchDeeper) => {
      if (data.Search != null) {
        data.Search =
          data.Search.map(search => ({ __typename: "Movie", ...search }));
      }

      return data;
    }
  }
});

export default function createApolloClient() {
  return new ApolloClient({
    ssrMode: false,
    link: restLink,
    cache: cache,
  });
}
