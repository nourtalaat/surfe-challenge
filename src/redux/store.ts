import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSagas";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// run the saga middleware
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
