import { combineReducers } from "redux";
import golfReducer from "./golfReducer";

const rootReducer = combineReducers({
    golf: golfReducer,
});

export default rootReducer;
