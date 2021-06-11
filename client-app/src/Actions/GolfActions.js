import * as actionTypes from "./ActionTypes.js";

export const setLoggedInUser = (user) => async (dispatch) => {
    dispatch(setLoggedInUserCreator(user));
};

const setLoggedInUserCreator = (user) => ({
    user,
    type: actionTypes.SET_LOGGED_IN_USER,
});
