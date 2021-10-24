import initialState from "./initialState";
import * as actionTypes from "../Actions/ActionTypes";
import reducer from "./golfReducer.js";

var targetState;

var player1 = {
  id: expect.any(String),
  firstName: "Brian",
  lastName: "Johnson",
  GHIN: "111123",
  handicap: "18.2",
};

var player2 = {
  id: expect.any(String),
  GHIN: 42342,
  firstName: "Jane",
  lastName: "Doe",
  handicap: 6.9,
};

describe("Golf Reducer tests", () => {
  beforeEach(() => {
    initialState.errorMessage = "";
    targetState = JSON.parse(JSON.stringify(initialState));
  });

  it("should match the state when SET_LOGGED_IN_USER is dispatched", () => {
    const user = "testUser1234";
    const userToken = "asdfsdaf23r2qawf";
    targetState.loggedInUser = user;
    targetState.userToken = userToken;

    expect(
      reducer(initialState, {
        type: actionTypes.SET_LOGGED_IN_USER,
        user,
        userToken,
      })
    ).toEqual(targetState);
  });

  it("should match the state when SET_CURRENT_PAGE is dispatched", () => {
    var pageName = "PageXYZ";
    targetState.currentPage = pageName;

    expect(
      reducer(initialState, { type: actionTypes.SET_CURRENT_PAGE, pageName })
    ).toEqual(targetState);
  });

  it("should match the state when ADD_PLAYER is dispatched", () => {
    targetState.players[0] = player1;

    expect(
      reducer(initialState, {
        type: actionTypes.ADD_PLAYER,
        firstName: player1.firstName,
        lastName: player1.lastName,
        GHIN: player1.GHIN,
        handicap: player1.handicap,
      })
    ).toEqual(targetState);
  });

  it("ADD_PLAYER should clear out any previous error message", () => {
    initialState.errorMessage = "Previous error message";

    targetState.players[0] = player1;
    targetState.errorMessage = "";

    expect(
      reducer(initialState, {
        type: actionTypes.ADD_PLAYER,
        firstName: player1.firstName,
        lastName: player1.lastName,
        GHIN: player1.GHIN,
        handicap: player1.handicap,
      }).errorMessage
    ).toEqual("");
  });

  it("should match state when REMOVE_PLAYER is dispatched", () => {
    player1.id = "4444";
    player2.id = "1234";
    initialState.players[0] = player1;
    initialState.players[1] = player2;

    targetState.players = [player1];

    expect(
      reducer(initialState, {
        type: actionTypes.REMOVE_PLAYER,
        id: "1234",
      })
    ).toEqual(targetState);
  });

  it("should match the state when SET_PLAYERS is dispatched", () => {
    var players = [player1, player2];
    targetState.players = players;

    expect(
      reducer(initialState, { type: actionTypes.SET_PLAYERS, players: players })
    ).toEqual(targetState);
  });

  it("should match the state when SET_ERROR_MESSAGE is dispatched", () => {
    var errorMessage = "play missing error message";
    targetState.errorMessage = errorMessage;

    expect(
      reducer(initialState, {
        type: actionTypes.SET_ERROR_MESSAGE,
        errorMessage: errorMessage,
      })
    ).toEqual(targetState);
  });
});
