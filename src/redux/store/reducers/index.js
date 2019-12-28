import app from "./app";
import dataLocal from "./dataLocal";
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const rootConfigPersist = {
    key: 'root',
    storage: AsyncStorage,
    whiteList: ['dataLocal'],
    stateReconciler: autoMergeLevel2,
}
const appConfigPersist = {
    key: 'app',
    storage: AsyncStorage,
    whiteList: ['language'],
    stateReconciler: autoMergeLevel2,
}
const rootReducer = combineReducers({
    app: persistReducer(appConfigPersist, app),
    dataLocal
})
export default persistReducer(rootConfigPersist, rootReducer)