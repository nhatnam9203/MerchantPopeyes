export function get_movie() {
    return {
        type: 'GET_MOVIE',
        route: 'movies.json',
        method:'GET'
    }
}
export function set_movie(movie) {
    return {
        type: 'SET_MOVIE',
        movie
    }
}