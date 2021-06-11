import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension/";
import thunk from "redux-thunk";

function configureStoreDev(initialState) {
    const middlewares = [thunk];
    return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares), composeWithDevTools()));
}

function configureStoreProd(initialState) {
    const middlewares = [thunk];
    return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
}

const configureStore = process.env.NODE_ENV === "development" ? configureStoreDev : configureStoreProd;

export default configureStore;
