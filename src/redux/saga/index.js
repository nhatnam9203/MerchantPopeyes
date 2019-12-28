import { all } from "redux-saga/effects";
import dataLocal from './dataLocal';
export default function* sagaRoot() {
    yield all([
        dataLocal(),
    ])
}