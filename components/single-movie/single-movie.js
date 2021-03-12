import styles from './single-movie.module.css';
import { useQuery } from '@apollo/client';
import { getMovieQuery } from '../../lib/queries/queries';


export default function SingleMovie({ id }){
    
    const {loading, error, data} = useQuery(getMovieQuery, {
        variables: { imdbID: id }
    });
    
    if(loading) return 'Loading...';
    if(error) return 'Movie not found';

    return (
        <>
            { data.movie.Error? 'Movie not found' :

                <div>
                    {data.movie.imdbID}
                    <br />
                    {data.movie.imdbRating}
                    <br />
                    {data.movie.Title}
                    <br />
                    {data.movie.Year}
                    <br />
                    {data.movie.Runtime}
                    <br />
                    {data.movie.Genre}
                    <br />
                    {data.movie.Director}
                    <br />
                    {data.movie.Country}
                    <br />
                    {data.movie.Plot}
                    <br />
                    {data.movie.Poster}
                </div>
            }
        </>
    );
};
