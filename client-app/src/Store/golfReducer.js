import initialState from "./InitialState";
import * as actionTypes from "../Actions/ActionTypes";

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.user,
                userToken: action.userToken,
            };
        default:
            return state;
    }
};
