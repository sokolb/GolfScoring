import AppData from "../DataServices/AppData.js";
import GhinDataService from "../DataServices/GhinDataService.js";
import * as actionTypes from "./ActionTypes.js";

export const logInUser = (user, pwd) => async (dispatch) => {
    await GhinDataService.getUserToken(user, pwd)
        .then((response) => {
            dispatch(
                setLoggedInUserCreator(
                    user,
                    response.data.golfer_user.golfer_user_token
                )
            );
        })
        .catch((error) => {
            if (
                !process.env.NODE_ENV ||
                process.env.NODE_ENV === "development"
            ) {
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

export const addPlayer =
    (firstName, lastName, GHIN, user_token) => async (dispatch) => {
        var handicap = "-1";
        await GhinDataService.getUserHandicap(GHIN, user_token)
            .then((response) => {
                handicap = response.data.golfer.handicap_index;
                dispatch(addPlayerCreator(firstName, lastName, GHIN, handicap));
            })
            .catch((error) => {
                dispatch(setErrorMessageCreator(error.response.data.golfer));
            });
    };

const addPlayerCreator = (firstName, lastName, GHIN, handicap) => ({
    firstName,
    lastName,
    GHIN,
    handicap,
    type: actionTypes.ADD_PLAYER,
});

export const removePlayer = (id) => (dispatch) => {
    dispatch(removePlayerCreator(id));
};

const removePlayerCreator = (id) => ({
    id,
    type: actionTypes.REMOVE_PLAYER,
});

const setErrorMessageCreator = (errorMessage) => ({
    errorMessage,
    type: actionTypes.SET_ERROR_MESSAGE,
});

export const getPlayers = (fileName) => async (dispatch) => {
    await AppData.getPlayers(fileName)
        .then((response) => {
            dispatch(setPlayersCreator(response.data));
        })
        .catch((error) => {
            if (
                !process.env.NODE_ENV ||
                process.env.NODE_ENV === "development"
            ) {
                console.log(error.response);
            }
        });
};

const setPlayersCreator = (players) => ({
    players,
    type: actionTypes.SET_PLAYERS,
});

export const getTeams = (fileName) => async (dispatch) => {
    await AppData.getTeams(fileName)
        .then((response) => {
            dispatch(setTeamsCreator(response.data.teams));
        })
        .catch((error) => {
            if (
                !process.env.NODE_ENV ||
                process.env.NODE_ENV === "development"
            ) {
                console.log(error.response);
            }
        });
};

const setTeamsCreator = (teams) => ({
    teams,
    type: actionTypes.SET_TEAMS,
});

export const removeTeam = (id) => (dispatch) => {
    dispatch(removeTeamCreator(id));
};

const removeTeamCreator = (id) => ({
    id,
    type: actionTypes.REMOVE_TEAM,
});

export const addTeam = (teamMemberIds) => async (dispatch) => {
    dispatch(addTeamCreator(teamMemberIds));
};

const addTeamCreator = (teamMemberIds) => ({
    teamMemberIds,
    type: actionTypes.ADD_TEAM,
});
