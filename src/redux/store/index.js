import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import sagaRoot from "../saga";
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
// const middleware = createReactNavigationReduxMiddleware("root", state => state.nav);
 const createAppStore = composeWithDevTools(applyMiddleware(
    // authMiddleware,
    // middleware,
    sagaMiddleware,
))(createStore); 

export const store = (createAppStore)(rootReducer)

export default function configureStore() {
    
    const persistor = persistStore(store);
    sagaMiddleware.run(sagaRoot);
    return { store, persistor }
}
