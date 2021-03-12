import Link from 'next/link';
import styles from './movies.module.css';
import { useQuery } from '@apollo/client';
import { getMoviesQuery } from '../../lib/queries/queries';

var busy = false;

export default function Movies({ search, file }){
    
    const {loading, error, data, fetchMore} = useQuery(getMoviesQuery, {
        variables: { search, page: 1 }
    });
    
    if(loading) return 'Loading...';
    if(error) return 'No results found';

    const limit = data.movies.totalResults;
    const count = data.movies.Search.length;

    const loadMore = async () => {
        if(count >= limit || busy) return;

        busy = true;

        await fetchMore({
            variables: {
                page: (count / 10) + 1
            }
        }); 

        busy = false;
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
                                <Link href={`/${movie.imdbID}`}>
                                    <a>
                                        {movie.imdbID} 
                                        <br />
                                        {movie.Title}
                                        <br />
                                        {movie.Year}
                                        <br />
                                        {movie.Poster}
                                        <br />
                                        <br />
                                    </a>
                                </Link>
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
