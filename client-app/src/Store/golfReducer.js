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
        case actionTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageName,
            };
        case actionTypes.ADD_PLAYER:
            // Fixed: Use immutable array spread instead of push
            return {
                ...state,
                players: [
                    ...state.players,
                    {
                        id: action.id,
                        firstName: action.firstName,
                        lastName: action.lastName,
                        GHIN: action.GHIN,
                        handicap: action.handicap,
                        teePreference: action.teePreference,
                        frontNine: action.frontNine,
                        backNine: action.backNine,
                        autoUpdateGHIN: action.autoUpdateGHIN,
                    },
                ],
                errorMessage: "",
            };
        case actionTypes.UPDATE_PLAYER:
            const existingPlayer = {
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                GHIN: action.GHIN,
                handicap: action.handicap,
                teePreference: action.teePreference,
                frontNine: action.frontNine,
                backNine: action.backNine,
                autoUpdateGHIN: action.autoUpdateGHIN,
            };
            const index = state.players.findIndex((p) => p.id === existingPlayer.id);

            // Fixed: Create new array with updated player
            const updatedPlayers = [...state.players];
            updatedPlayers[index] = existingPlayer;

            return {
                ...state,
                players: updatedPlayers,
                errorMessage: "",
            };
        case actionTypes.REMOVE_PLAYER:
            // Already immutable - filter creates new array
            return {
                ...state,
                players: state.players.filter((player) => player.id !== action.id),
            };
        case actionTypes.SET_PLAYERS:
            return {
                ...state,
                players: action.players,
            };
        case actionTypes.SET_TEAMS:
            return {
                ...state,
                teams: action.teams,
            };
        case actionTypes.REMOVE_TEAM:
            // Already immutable - filter creates new array
            return {
                ...state,
                teams: state.teams.filter((team) => team.id !== action.id),
            };
        case actionTypes.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        case actionTypes.ADD_TEAM:
            // Fixed: Use immutable array spread instead of push
            return {
                ...state,
                teams: [
                    ...state.teams,
                    {
                        id: action.id,
                        teamNumber: action.teamNumber,
                        teamMembers: action.teamMembers,
                        divisionId: action.divisionId,
                        forceAB: action.forceAB,
                    },
                ],
            };
        case actionTypes.SET_COURSES:
            return {
                ...state,
                courses: action.courses,
            };
        case actionTypes.SET_DIVISOINS:
            return {
                ...state,
                divisions: action.divisions,
            };
        case actionTypes.REMOVE_DIVISION:
            // Already immutable - filter creates new array
            return {
                ...state,
                divisions: state.divisions.filter((d) => d.id !== action.id),
            };
        case actionTypes.ADD_DIVISION:
            // Fixed: Use immutable array spread instead of push
            return {
                ...state,
                divisions: [
                    ...state.divisions,
                    {
                        id: action.id,
                        name: action.name,
                    },
                ],
            };
        default:
            return state;
    }
};
