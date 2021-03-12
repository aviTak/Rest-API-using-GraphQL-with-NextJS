import { makeVar, InMemoryCache } from "@apollo/client";
import { mergeArrayByField, scrollPagination } from "../lib/helper";

var mode;

if (typeof window !== "undefined")
    mode = localStorage.getItem('mode') === 'dark' ? 'dark' : 'light';

export const displayMode = makeVar(mode);

export const cache = new InMemoryCache({
    typePolicies: {

        Query: {
            fields: {
                displayMode: {
                    read() {
                        return displayMode();
                    }
                },

                movie: {
                    keyArgs: ["imdbID"]
                },

                movies: scrollPagination(["search"])
            }
        },

        Movie: {
            keyFields: ["imdbID"],
        },        
        
        Movies: {
            fields: {
                Search: {
                    merge: mergeArrayByField("imdbID")
                }
            }
        }
    }
    
});
