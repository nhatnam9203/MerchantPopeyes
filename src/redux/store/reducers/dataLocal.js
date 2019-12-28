const initialState = {
    movie: [],
    token: ''
}
const dataLocal = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOVIE':
            return { ...state, movie: action.movie }
        default:
            return state
    }
}
export default dataLocal