export function mergeArrayByField(field){
    return {
        merge(existing, incoming, { readField, mergeObjects }) {
            const merged = existing ? existing.slice(0) : [];
            const movieNameToIndex = Object.create(null);

            if (existing) {
                existing.forEach((movie, index) => {
                    movieNameToIndex[readField(field, movie)] = index;
                });
            }

            incoming.forEach(movie => {
                const name = readField(field, movie);
                const index = movieNameToIndex[name];
                if (typeof index === "number") {
                    // Merge the new movie data with the existing movie data.
                    merged[index] = mergeObjects(merged[index], movie);
                } else {
                    // First time we've seen this movie in this array.
                    movieNameToIndex[name] = merged.length;
                    merged.push(author);
                }
            });

            return merged;
        }
    } 
}

export function scrollPagination(keyArgs = false) {
    return {
        keyArgs,

        merge(existing, incoming, { args, isReference, readField }) {

            // TODO: Check when readField should be used instead

            /*
                Assumption: 
                    If there is an error from the API while fetching the result
                    of the first page, it is obvious that subsequent pages do not
                    exist. This is so because "search" is a key argument and the
                    API key is constant

            */

            // First page query

            if(!existing) {
                return {
                    ...incoming
                };
            }

            // At the time of error in incoming
            
            if(incoming.Response === "False"){          
                return {
                    ...existing
                };
            }

            const offset = (args.page - 1) * 10;
            const incomingArray = incoming.Search;
            const existingArray = existing.Search;

            /* 
                But just in case by mistake if the existing query resulted in an error
                and the incomeing query i.e. a query which does not have page as 1,
                we will return the previous errored query result forcing the client 
                to fetch from the first page being a scroll based pagination
            */

            if(!existingArray) {
                return {
                    ...existing
                }
            }

            /*  
                As it is an infinite scroll, the search results will be cached
                only and only in a sequential order otherwise the result will not be merged

                TODO: Think of a logic for different pages caching where pages are not
                fetched in a sequential order
            */

            if(existingArray.length !== offset) {
                // In this case, we are returning the existing result in the cache

                return {
                    ...existing
                };
            }

            return {
                Response: incoming.Response,
                Error: incoming.Error,
                totalResults: incoming.totalResults,
                Search: [...incomingArray, ...existingArray]
            };

        }
    }
}
