import initialState from "./initialState";
import * as actionTypes from "../Actions/ActionTypes";
import reducer from "./golfReducer.js";

var targetState;

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
    var firstName = "Brian";
    var lastName = "Johnson";
    var GHIN = "111123";
    var handicap = "18.2";

    var player = {
      firstName,
      lastName,
      GHIN,
      handicap,
    };

    targetState.players[0] = player;

    expect(
      reducer(initialState, {
        type: actionTypes.ADD_PLAYER,
        firstName,
        lastName,
        GHIN,
        handicap,
      })
    ).toEqual(targetState);
  });

  it("ADD_PLAYER should clear out any previous error message", () => {
    initialState.errorMessage = "Previous error message";

    var firstName = "Brian";
    var lastName = "Johnson";
    var GHIN = "111123";
    var handicap = "18.2";

    var player = {
      firstName,
      lastName,
      GHIN,
      handicap,
    };

    targetState.players[0] = player;
    targetState.errorMessage = "";

    expect(
      reducer(initialState, {
        type: actionTypes.ADD_PLAYER,
        firstName,
        lastName,
        GHIN,
        handicap,
      }).errorMessage
    ).toEqual("");
  });

  it("should match the state when SET_PLAYERS is dispatched", () => {
    var players = [
      { GHIN: 324524, firstName: "bob", lastName: "smith", handicap: 12 },
      { GHIN: 42342, firstName: "Jane", lastName: "Doe", handicap: 6.9 },
    ];
    targetState.players = players;

    expect(
      reducer(initialState, { type: actionTypes.SET_PLAYERS, players: players })
    ).toEqual(targetState);
  });

  it("shoudl match the state when SET_ERROR_MESSAGE is dispatched", () => {
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
