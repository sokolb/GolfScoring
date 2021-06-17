import initialState from "./initialState";
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
        case actionTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageName,
            };
        default:
            return state;
    }
};
