import { put, takeLatest, all } from "redux-saga/effects";
import NavigationServices from "../../navigators/NavigatorServices";
import { requestAPI } from '../../utils';

function* getMovie(action) {
    yield put({
        type: 'LOADING_ROOT',
    })
    try {
        const responses = yield requestAPI(action);
        console.log(responses.movies)
        yield put({
            type: 'SET_MOVIE',
            movie: responses.movies
        })
    } catch (error) {
        console.log(error)
    } finally {
        yield put({
            type: 'STOP_LOADING_ROOT',
        })
    }
}
export default function* dataLocal() {
    yield all([
        takeLatest('GET_MOVIE', getMovie),
    ])
}