import { all } from "redux-saga/effects";
import dataLocal from './dataLocal';
import auth from './auth'
import customer from './customer'
export default function* sagaRoot() {
    yield all([
        dataLocal(),
        auth(),
        customer()
    ])
}