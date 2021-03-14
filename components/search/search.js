import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';
import styles from './search.module.css';
import { useLazyQuery } from '@apollo/client';
import { getMoviesExcerptQuery } from '../../lib/queries/queries';


const TYPING_TIMER_LENGTH = 400;
var timeout, input;

export default function Search(props){
    var mouse = false;

    useEffect(() => {

        return () => {
            clearTimeout(timeout);
        };

    }, []);

    useEffect(() => {

        try{
            document.getElementById('searchy').blur();
        } catch(e) {}

    }, [props]);


    const [automatic, { loading: loadingResult, error: errorResult, data: result }]  = useLazyQuery(
        getMoviesExcerptQuery
    );


    const output = () => {        

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            
            automatic({
                variables: {
                        search: encodeURIComponent(input.value.toLowerCase().trim())
                    }
                }
            );

        }, TYPING_TIMER_LENGTH);
 
    };

    const clear = e => {

        if(mouse){
            e.target.focus();
            mouse = false;
            return;
        }

        try{
            document.getElementById('automatic').style.display = 'none';
        } catch(e) {}
        
    };

    const unclear = () => {
        try{
            document.getElementById('automatic').style.display = 'block';
        } catch(e) {}
    };

    const boy = () => {
        mouse = true;
    };


    const handleSubmit = e => {
        e.preventDefault();
        Router.push(`/search/${encodeURIComponent(input.value.toLowerCase().trim())}`);
    };

    return(
        <main>

            <form className='search_can' onSubmit={handleSubmit}>
                <input
                    ref={node => {
                        input = node;
                    }}
                    className="search_bar"
                    type="text"
                    inputMode="text"
                    onChange={output}
                    onBlur={clear}
                    onFocus={unclear}
                    id="searchy"
                    autoComplete="off"
                    placeholder="Search..."
                />

                {
                    (loadingResult || errorResult)?
                    
                        <div className="lds-hourglass">Loading...</div>
                    :
                        null

                }

            </form>
            

            {result && result.movies && result.movies.Error === 'Movie not found!' &&
                
                <div className="auto_container" id="automatic" onMouseDown={boy}>
                    <div className="zero">No results found</div>
                </div>

            }

            {result && result.movies && result.movies.Search && result.movies.Search.length !== 0 &&
            
                <div className="auto_container" id="automatic" onMouseDown={boy}>
                    {result.movies.Search.map(movie => (
                        <div key={movie.imdbID}>
                            <Link href={`/${movie.imdbID}`} className="auto_link">
                                <a>
                                    {`${movie.Title} ${movie.Year}`}
                                </a>
                            </Link>
                            <br />
                            <br />
                        </div>
                    ))}
                </div>

            }
            

        </main>
    );
}