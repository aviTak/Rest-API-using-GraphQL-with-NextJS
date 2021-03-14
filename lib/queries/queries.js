import { gql } from '@apollo/client';

export const getDisplayModeQuery = gql`
    query{
        displayMode @client
    }
`;

export const getMovieQuery = gql`
  query($imdbID: String!) {
    movie(imdbID: $imdbID) 
    @rest(type: "Movie", path: "?i={args.imdbID}&apikey=4f2584c7") {
      Error
      imdbID
      imdbRating
      Title
      Year
      Runtime
      Genre
      Director
      Country
      Plot
      Poster
    }
  }
`;

export const getMoviesQuery = gql`
  query($search: String!, $page: Int!) {
    movies(search: $search, page: $page) 
    @rest(type: "Movies", path: "?s={args.search}&apikey=4f2584c7&page={args.page}") {
      Error
      totalResults
      Search {
          Title
          Year
          imdbID
          Poster
      }
    }
  }
`;

export const getMoviesExcerptQuery = gql`
  query($search: String!) {
    movies(search: $search, page: 1) 
    @rest(type: "Movies", path: "?s={args.search}&apikey=4f2584c7&page={args.page}") {
      Error
      Search {
          Title
          Year
          imdbID
      }
    }
  }
`;
