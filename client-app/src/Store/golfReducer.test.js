import originalInitialState from "./initialState";
import * as actionTypes from "../Actions/ActionTypes";
import reducer from "./golfReducer.js";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid");

var targetState;
var initialState;

var player1 = {
  firstName: "Brian",
  lastName: "Johnson",
  GHIN: "111123",
  handicap: "18.2",
};

var player2 = {
  GHIN: 42342,
  firstName: "Jane",
  lastName: "Doe",
  handicap: 6.9,
};

var team1 = {
  teamNumber: 1,
  teamMemberIds: [
    "111123f4-b36c-4288-a827-ed0b00bc6653",
    "2212559a-ae1b-44d1-9c8b-d7f3f8b9e44a",
  ],
};

var team2 = {
  teamNumber: 2,
  teamMemberIds: [
    "333323f4-b36c-4288-a827-ed0b00bc6653",
    "4444559a-ae1b-44d1-9c8b-d7f3f8b9e44a",
  ],
};

describe("Golf Reducer tests", () => {
  beforeEach(() => {
    initialState = JSON.parse(JSON.stringify(originalInitialState));
    targetState = JSON.parse(JSON.stringify(originalInitialState));
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

  describe("Player", () => {
    it("should match the state when ADD_PLAYER is dispatched", () => {
      const uuid = "3b1823f4-b36c-4288-a827-0000000000";
      uuidv4.mockReturnValue(uuid);
      player1.id = uuid;
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
        reducer(initialState, {
          type: actionTypes.SET_PLAYERS,
          players: players,
        })
      ).toEqual(targetState);
    });
  });

  describe("Team", () => {
    it("should match the state when SET_TEAMS is dispatched", () => {
      var teams = [team1, team2];
      targetState.teams = teams;

      expect(
        reducer(initialState, { type: actionTypes.SET_TEAMS, teams: teams })
      ).toEqual(targetState);
    });

    it("should match state when REMOVE_TEAM is dispatched", () => {
      var id1 = "66666";
      var id2 = "asdfs12323";
      team1.id = id1;
      team2.id = id2;
      initialState.teams[0] = team1;
      initialState.teams[1] = team2;

      targetState.teams = [team1];

      expect(
        reducer(initialState, {
          type: actionTypes.REMOVE_TEAM,
          id: id2,
        })
      ).toEqual(targetState);
    });

    it("should match the state when ADD_TEAM is dispatched", () => {
      const uuid = "111823f4-b36c-4288-a827-0000000000";
      uuidv4.mockReturnValue(uuid);
      var teamNumber = 5;
      var teamMemberIds = ["abc567", "pp001"];

      targetState.teams[0] = {
        id: uuid,
        teamNumber,
        teamMemberIds: teamMemberIds,
      };

      expect(
        reducer(initialState, {
          type: actionTypes.ADD_TEAM,
          teamNumber: teamNumber,
          teamMemberIds: teamMemberIds,
        })
      ).toEqual(targetState);
    });
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
