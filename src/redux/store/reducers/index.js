import app from "./app";
import dataLocal from "./dataLocal";
import order from "./OrderInformation"
import auth from './auth'
import address from './address'
import customer from './customer'
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const rootConfigPersist = {
    key: 'root',
    storage: AsyncStorage,
    whiteList: ['auth,dataLocal,order,customer,app'],
    stateReconciler: autoMergeLevel2,
}
const appConfigPersist = {
    key: 'app',
    storage: AsyncStorage,
    whiteList: ['language'],
    stateReconciler: autoMergeLevel2,
}
const rootReducer = combineReducers({
    app,
    dataLocal,
    order,
    auth,
    customer,
    address
})
export default persistReducer(rootConfigPersist, rootReducer)