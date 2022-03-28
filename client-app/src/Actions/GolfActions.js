import AppData from "../DataServices/AppData.js";
import GhinDataService from "../DataServices/GhinDataService.js";
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
    await GhinDataService.getUserHandicap(GHIN, user_token)
        .then(async (response) => {
            handicap = response.data.tee_sets[1].ratings[0].course_handicap;
        })
        .catch((error) => {
            dispatch(setErrorMessageCreator(error.response.data.errors.golfer_id[0]));
        });

    if (handicap !== "-1") {
        var player = {
            GHIN,
            firstName,
            lastName,
            handicap,
        };
        await AppData.addPlayer(player).then((response) => {
            dispatch(addPlayerCreator(response.data, firstName, lastName, GHIN, handicap));
        });
    }
};

const addPlayerCreator = (id, firstName, lastName, GHIN, handicap) => ({
    id,
    firstName,
    lastName,
    GHIN,
    handicap,
    type: actionTypes.ADD_PLAYER,
});

export const removePlayer = (id) => async (dispatch) => {
    await AppData.deletePlayer(id)
        .then((response) => {
            dispatch(removePlayerCreator(id));
        })
        .catch((error) => {
            console.log(error.response);
        });
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
            if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
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
            dispatch(setTeamsCreator(response.data));
        })
        .catch((error) => {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
                console.log(error.response);
            }
        });
};

const setTeamsCreator = (teams) => ({
    teams,
    type: actionTypes.SET_TEAMS,
});

export const removeTeam = (id) => async (dispatch) => {
    await AppData.deleteTeam(id)
        .then((response) => {
            dispatch(removeTeamCreator(id));
        })
        .catch((error) => {
            console.log(error.response);
        });
};

const removeTeamCreator = (id) => ({
    id,
    type: actionTypes.REMOVE_TEAM,
});

export const addTeam = (teamNumber, teamMemberIds) => async (dispatch) => {
    var team = {
        teamNumber,
        teamMemberIds,
    };
    await AppData.addTeam(team).then((response) => {
        dispatch(addTeamCreator(response.data, teamNumber, teamMemberIds));
    });
};

const addTeamCreator = (id, teamNumber, teamMemberIds) => ({
    id,
    teamNumber,
    teamMemberIds,
    type: actionTypes.ADD_TEAM,
});
