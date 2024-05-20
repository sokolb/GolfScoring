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

export const addOrUpdatePlayer = (id, firstName, lastName, GHIN, teePreference, updateGHIN, user_token) => async (dispatch) => {
    var handicapIndex = "-1";
    var frontNine = "-1";
    var backNine = "-1";
    await GhinDataService.getUserHandicap(GHIN, user_token)
        .then(async (response) => {
            handicapIndex = response.data.golfers[0].handicap_index;
        })
        .catch((error) => {
            console.log(error);
        });

    await GhinDataService.getUserCourseHandicap(GHIN, user_token)
        .then(async (response) => {
            var teeSetIndex = response.data.tee_sets.findIndex(function (item, i) {
                return item.name === teePreference;
            });

            // var courseHandicapIndex = response.data.tee_sets[teeSetIndex].ratings.findIndex(function (item, i) {
            //     return item.tee_set_side === "All 18";
            // });
            // handicapIndex = response.data.tee_sets[teeSetIndex].ratings[courseHandicapIndex].course_handicap;

            var frontNineIndex = response.data.tee_sets[teeSetIndex].ratings.findIndex(function (item, i) {
                return item.tee_set_side === "F9";
            });
            frontNine = response.data.tee_sets[teeSetIndex].ratings[frontNineIndex].course_handicap;

            var backNineIndex = response.data.tee_sets[teeSetIndex].ratings.findIndex(function (item, i) {
                return item.tee_set_side === "B9";
            });
            backNine = response.data.tee_sets[teeSetIndex].ratings[backNineIndex].course_handicap;
        })
        .catch((error) => {
            dispatch(setErrorMessageCreator(error.response.data.errors.golfer_id[0]));
        });

    if (handicapIndex !== "-1" && frontNine !== "-1" && backNine !== "-1") {
        var player = {
            id,
            GHIN,
            firstName,
            lastName,
            handicap: handicapIndex,
            teePreference,
            frontNine,
            backNine,
            autoUpdateGHIN: updateGHIN,
        };
        if (id === -1) {
            await AppData.addPlayer(player).then((response) => {
                dispatch(addPlayerCreator(response.data, firstName, lastName, GHIN, handicapIndex, teePreference, frontNine, backNine, updateGHIN));
            });
        } else {
            await AppData.updatePlayer(player).then((response) => {
                dispatch(updatePlayerCreator(id, firstName, lastName, GHIN, handicapIndex, teePreference, frontNine, backNine, updateGHIN));
            });
        }
    }
};

export const addOrUpdatePlayerNoAutoGhinUpdate = (id, firstName, lastName, GHIN, teePreference, updateGHIN, handicapIndex, frontNine, backNine) => async (dispatch) => {
    var player = {
        id,
        GHIN,
        firstName,
        lastName,
        handicap: handicapIndex,
        teePreference,
        frontNine,
        backNine,
        autoUpdateGHIN: updateGHIN,
    };
    if (id === -1) {
        await AppData.addPlayer(player).then((response) => {
            dispatch(addPlayerCreator(response.data, firstName, lastName, GHIN, handicapIndex, teePreference, frontNine, backNine, updateGHIN));
        });
    } else {
        await AppData.updatePlayer(player).then((response) => {
            dispatch(updatePlayerCreator(id, firstName, lastName, GHIN, handicapIndex, teePreference, frontNine, backNine, updateGHIN));
        });
    }
};

const addPlayerCreator = (id, firstName, lastName, GHIN, handicap, teePreference, frontNine, backNine, autoUpdateGHIN) => ({
    id,
    firstName,
    lastName,
    GHIN,
    handicap,
    teePreference,
    frontNine,
    backNine,
    autoUpdateGHIN,
    type: actionTypes.ADD_PLAYER,
});

const updatePlayerCreator = (id, firstName, lastName, GHIN, handicap, teePreference, frontNine, backNine, autoUpdateGHIN) => ({
    id,
    firstName,
    lastName,
    GHIN,
    handicap,
    teePreference,
    frontNine,
    backNine,
    autoUpdateGHIN,
    type: actionTypes.UPDATE_PLAYER,
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

export const addTeam = (teamNumber, teamMembers, divisionId, forceAB) => async (dispatch) => {
    var team = {
        teamNumber,
        teamMembers,
        divisionId,
        forceAB,
    };
    await AppData.addTeam(team).then((response) => {
        dispatch(addTeamCreator(response.data, teamNumber, teamMembers, divisionId, forceAB));
    });
};

const addTeamCreator = (id, teamNumber, teamMembers, divisionId, forceAB) => ({
    id,
    teamNumber,
    teamMembers,
    divisionId,
    forceAB,
    type: actionTypes.ADD_TEAM,
});

export const getCourses = (fileName) => async (dispatch) => {
    await AppData.getCourses(fileName)
        .then((response) => {
            dispatch(setCoursesCreator(response.data));
        })
        .catch((error) => {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
                console.log(error.response);
            }
        });
};

const setCoursesCreator = (courses) => ({
    courses,
    type: actionTypes.SET_COURSES,
});

export const getDivisions = (fileName) => async (dispatch) => {
    await AppData.getDivisions(fileName)
        .then((response) => {
            dispatch(setDivisionsCreator(response.data));
        })
        .catch((error) => {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
                console.log(error.response);
            }
        });
};

const setDivisionsCreator = (divisions) => ({
    divisions,
    type: actionTypes.SET_DIVISOINS,
});

export const addDivision = (name) => async (dispatch) => {
    var division = {
        name,
    };
    await AppData.addDivision(division).then((response) => {
        dispatch(addDivisionCreator(response.data, name));
    });
};

const addDivisionCreator = (id, name) => ({
    id,
    name,
    type: actionTypes.ADD_DIVISION,
});

export const removeDivision = (id) => async (dispatch) => {
    await AppData.deleteDivision(id)
        .then((response) => {
            dispatch(removeDivisionCreator(id));
        })
        .catch((error) => {
            console.log(error.response);
        });
};

const removeDivisionCreator = (id) => ({
    id,
    type: actionTypes.REMOVE_DIVISION,
});
