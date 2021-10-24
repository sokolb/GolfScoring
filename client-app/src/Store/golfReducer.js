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
      var players = state.players;
      players.push({
        id: "1234",
        firstName: action.firstName,
        lastName: action.lastName,
        GHIN: action.GHIN,
        handicap: action.handicap,
      });
      return {
        ...state,
        players: players,
        errorMessage: "",
      };

    case actionTypes.REMOVE_PLAYER:
      var newPlayersArray = state.players.filter(
        (player) => player.id !== action.id
      );
      return { ...state, players: newPlayersArray };
    case actionTypes.SET_PLAYERS:
      return {
        ...state,
        players: action.players,
      };
    case actionTypes.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
