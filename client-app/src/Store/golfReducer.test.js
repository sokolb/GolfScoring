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
    teamMemberIds: ["111123f4-b36c-4288-a827-ed0b00bc6653", "2212559a-ae1b-44d1-9c8b-d7f3f8b9e44a"],
};

var team2 = {
    teamNumber: 2,
    teamMemberIds: ["333323f4-b36c-4288-a827-ed0b00bc6653", "4444559a-ae1b-44d1-9c8b-d7f3f8b9e44a"],
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

        expect(reducer(initialState, { type: actionTypes.SET_CURRENT_PAGE, pageName })).toEqual(targetState);
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

            expect(reducer(initialState, { type: actionTypes.SET_TEAMS, teams: teams })).toEqual(targetState);
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
            var teamMemberIds = ["abc567", "pp001"];

            targetState.teams[0] = {
                id: uuid,
                teamNumber: 1,
                teamMemberIds: teamMemberIds,
            };

            expect(
                reducer(initialState, {
                    type: actionTypes.ADD_TEAM,
                    teamMemberIds: teamMemberIds,
                })
            ).toEqual(targetState);
        });

        it("team ID should be set to lowest ingeger not used", () => {
            const uuid1 = "111823f4-b36c-4288-a827-0000001111";
            uuidv4.mockReturnValue(uuid1);
            var team1MemberIds = ["abc111", "pp111"];
            var state = reducer(initialState, {
                type: actionTypes.ADD_TEAM,
                teamMemberIds: team1MemberIds,
            });

            const uuid2 = "111823f4-b36c-4288-a827-0000002222";
            uuidv4.mockReturnValue(uuid2);
            var team2MemberIds = ["abc222", "pp222"];
            state = reducer(state, {
                type: actionTypes.ADD_TEAM,
                teamMemberIds: team2MemberIds,
            });

            const uuid3 = "111823f4-b36c-4288-a827-0000003333";
            uuidv4.mockReturnValue(uuid3);
            var team3MemberIds = ["abc333", "pp333"];
            state = reducer(state, {
                type: actionTypes.ADD_TEAM,
                teamMemberIds: team3MemberIds,
            });

            //remove team 2
            state = reducer(state, {
                type: actionTypes.REMOVE_TEAM,
                id: uuid2,
            });

            var team1 = {
                id: uuid1,
                teamNumber: 1,
                teamMemberIds: team1MemberIds,
            };
            var team2 = {
                id: uuid2,
                teamNumber: 2,
                teamMemberIds: team2MemberIds,
            };
            var team3 = {
                id: uuid3,
                teamNumber: 3,
                teamMemberIds: team3MemberIds,
            };

            targetState.teams[0] = team1;
            targetState.teams[1] = team3;
            targetState.teams[2] = team2;

            uuidv4.mockReturnValue(uuid2);
            state = reducer(state, {
                type: actionTypes.ADD_TEAM,
                teamMemberIds: team2MemberIds,
            });

            expect(state).toEqual(targetState);
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
