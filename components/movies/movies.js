import styles from './movies.module.css';
import { useQuery } from '@apollo/client';
import { getMoviesQuery } from '../../lib/queries/queries';


export default function Movies({ search, file }){
    
    const {loading, error, data, fetchMore} = useQuery(getMoviesQuery, {
        variables: { search, page: 1 }
    });
    
    if(loading) return 'Loading...';
    if(error) return 'No results found';

    var i = 1;

    var q = setInterval(async () => {
        
        if(i === 12)
            clearInterval(q);

        await fetchMore({
            variables: {
                page: 2
            }
        });

    }, 5000);

    return (
        <>
            { data.movies.Error? 'No results found' :

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

            }
            
            {
                console.log(data.movies.Search.length) }
             {   console.log(file)
            }
        </>
    );
};
