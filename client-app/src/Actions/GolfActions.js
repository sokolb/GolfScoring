import GhinDataService from "../Ghin/GhinDataService.js";
import * as actionTypes from "./ActionTypes.js";

export const logInUser = (user, pwd) => async (dispatch) => {
    await GhinDataService.getUserToken(user, pwd)
        .then((response) => {
            dispatch(setLoggedInUserCreator(user, response.data.golfer_user.golfer_user_token));
        })
        .catch((error) => {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
                console.log(error.response);
            }
        });
};

export const setLoggedInUser = (user, userToken) => async (dispatch) => {
    dispatch(setLoggedInUserCreator(user, userToken));
};

const setLoggedInUserCreator = (user, userToken) => ({
    user,
    userToken,
    type: actionTypes.SET_LOGGED_IN_USER,
});

export const setCurrentPage = (pageName) => async (dispatch) => {
    dispatch(setCurrentPageCreator(pageName));
};

const setCurrentPageCreator = (pageName) => ({
    pageName,
    type: actionTypes.SET_CURRENT_PAGE,
});

export const addPlayer = (firstName, lastName, GHIN, user_token) => async (dispatch) => {
    var handicap = "-1";
    await GhinDataService.getUserHandicap(GHIN, user_token).then((response) => {
        handicap = response.data.golfer.handicap_index;
        dispatch(addPlayerCreator(firstName, lastName, GHIN, handicap));
    });
};

const addPlayerCreator = (firstName, lastName, GHIN, handicap) => ({
    firstName,
    lastName,
    GHIN,
    handicap,
    type: actionTypes.ADD_PLAYER,
});
