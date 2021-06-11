import initialState from "./InitialState";
import * as actionTypes from "../Actions/ActionTypes";

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.user,
            };
        default:
            return state;
    }
};
