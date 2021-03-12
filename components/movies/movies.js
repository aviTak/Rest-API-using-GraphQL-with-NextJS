import styles from './movies.module.css';
import { useQuery } from '@apollo/client';
import { getMoviesQuery } from '../../lib/queries/queries';
import { useState } from 'react';


export default function Movies({ search, file }){

    const [count, setCount] = useState(1);
    
    const {loading, error, data, fetchMore} = useQuery(getMoviesQuery, {
        variables: { search, page: 1 }
    });
    
    if(loading) return 'Loading...';
    if(error) return 'No results found';

    const limit = data.movies.totalResults / 10;

    const loadMore = () => {
        if(count >= limit) return;

        setCount(count + 1)

        await fetchMore({
            variables: {
                page: count
            }
        }); 
   }

    return (
        <>
            { data.movies.Error? 'No results found' :

                <>
                    <div>
                        {data.movies.totalResults}
                        <br />
                        <br />
                        {data.movies.Search && data.movies.Search.map(movie => (
                            <div key={movie.imdbID}>
                                {movie.imdbID} 
                                <br />
                                {movie.Title}
                                <br />
                                {movie.Year}
                                <br />
                                {movie.Poster}
                                <br />
                                <br />
                            </div>
                        ))}
                    </div>

                    {(count < limit) && <button onClick={loadMore}>Load More</button>}
                </>

            }
            
            {
                console.log(data.movies.Search.length) }
             {   console.log(file)
            }
        </>
    );
};
