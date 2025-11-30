import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

function configureStoreDev(initialState) {
    const middlewares = [thunk];
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
}

function configureStoreProd(initialState) {
    const middlewares = [thunk];
    return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
}

// Use Vite's built-in DEV boolean for environment detection
const configureStore = import.meta.env.DEV ? configureStoreDev : configureStoreProd;

export default configureStore;
