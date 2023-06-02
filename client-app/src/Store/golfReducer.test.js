import originalInitialState from "./InitialState";
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
    teePreference: "White",
    frontNine: 4,
    backNine: 6,
    autoUpdateGHIN: false,
};

var player2 = {
    GHIN: 42342,
    firstName: "Jane",
    lastName: "Doe",
    handicap: 6.9,
    teePreference: "Red",
    fronNine: 10,
    backNine: 12,
    autoUpdateGHIN: true,
};

var team1 = {
    teamNumber: 1,
    teamMemberIds: ["111123f4-b36c-4288-a827-ed0b00bc6653", "2212559a-ae1b-44d1-9c8b-d7f3f8b9e44a"],
};

var team2 = {
    teamNumber: 2,
    teamMemberIds: ["333323f4-b36c-4288-a827-ed0b00bc6653", "4444559a-ae1b-44d1-9c8b-d7f3f8b9e44a"],
};

var course1 = {
    holes: [
        {
            handicapIndex: 7,
            id: 1,
            number: 1,
        },
        {
            handicapIndex: 13,
            id: 2,
            number: 2,
        },
        {
            handicapIndex: 3,
            id: 3,
            number: 3,
        },
        {
            handicapIndex: 11,
            id: 4,
            number: 4,
        },
        {
            handicapIndex: 5,
            id: 5,
            number: 5,
        },
        {
            handicapIndex: 1,
            id: 6,
            number: 6,
        },
        {
            handicapIndex: 17,
            id: 7,
            number: 7,
        },
        {
            handicapIndex: 9,
            id: 8,
            number: 8,
        },
        {
            handicapIndex: 15,
            id: 9,
            number: 9,
        },
        {
            handicapIndex: 4,
            id: 10,
            number: 10,
        },
        {
            handicapIndex: 14,
            id: 11,
            number: 11,
        },
        {
            handicapIndex: 8,
            id: 12,
            number: 12,
        },
        {
            handicapIndex: 16,
            id: 13,
            number: 13,
        },
        {
            handicapIndex: 6,
            id: 14,
            number: 14,
        },
        {
            handicapIndex: 18,
            id: 15,
            number: 15,
        },
        {
            handicapIndex: 12,
            id: 16,
            number: 16,
        },
        {
            handicapIndex: 10,
            id: 17,
            number: 17,
        },
        {
            handicapIndex: 2,
            id: 18,
            number: 18,
        },
    ],
    id: 1,
    name: "RoseLake",
    tee: "White",
};

var course2 = {
    holes: [
        {
            handicapIndex: 7,
            id: 19,
            number: 1,
        },
        {
            handicapIndex: 13,
            id: 20,
            number: 2,
        },
        {
            handicapIndex: 3,
            id: 21,
            number: 3,
        },
        {
            handicapIndex: 11,
            id: 22,
            number: 4,
        },
        {
            handicapIndex: 5,
            id: 23,
            number: 5,
        },
        {
            handicapIndex: 1,
            id: 24,
            number: 6,
        },
        {
            handicapIndex: 17,
            id: 25,
            number: 7,
        },
        {
            handicapIndex: 9,
            id: 26,
            number: 8,
        },
        {
            handicapIndex: 15,
            id: 27,
            number: 9,
        },
        {
            handicapIndex: 4,
            id: 28,
            number: 10,
        },
        {
            handicapIndex: 14,
            id: 29,
            number: 11,
        },
        {
            handicapIndex: 8,
            id: 30,
            number: 12,
        },
        {
            handicapIndex: 16,
            id: 31,
            number: 13,
        },
        {
            handicapIndex: 6,
            id: 32,
            number: 14,
        },
        {
            handicapIndex: 18,
            id: 33,
            number: 15,
        },
        {
            handicapIndex: 12,
            id: 34,
            number: 16,
        },
        {
            handicapIndex: 10,
            id: 35,
            number: 17,
        },
        {
            handicapIndex: 2,
            id: 36,
            number: 18,
        },
    ],
    id: 2,
    name: "RoseLake",
    tee: "Blue",
};

var division1 = {
    name: "mens Division 1",
};

var division2 = {
    name: "mens Division 2",
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

    describe("Player", () => {
        it("should match the state when ADD_PLAYER is dispatched", () => {
            var id = "4";
            player1.id = id;
            targetState.players[0] = player1;

            expect(
                reducer(initialState, {
                    type: actionTypes.ADD_PLAYER,
                    id: id,
                    firstName: player1.firstName,
                    lastName: player1.lastName,
                    GHIN: player1.GHIN,
                    handicap: player1.handicap,
                    teePreference: player1.teePreference,
                    frontNine: player1.frontNine,
                    backNine: player1.backNine,
                    autoUpdateGHIN: player1.autoUpdateGHIN,
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

        it("should match the state when UPDATE_PLAYER is dispatched", () => {
            var id = "4";
            player1.id = id;

            //Add Player
            reducer(initialState, {
                type: actionTypes.ADD_PLAYER,
                id: id,
                firstName: player1.firstName,
                lastName: player1.lastName,
                GHIN: player1.GHIN,
                handicap: player1.handicap,
                teePreference: player1.teePreference,
                frontNine: player1.frontNine,
                backNine: player1.backNine,
                autoUpdateGHIN: player1.autoUpdateGHIN,
            });

            //Update Player
            var newHandicap = 22;
            player1.handicap = newHandicap;
            targetState.players[0] = player1;
            expect(
                reducer(initialState, {
                    type: actionTypes.UPDATE_PLAYER,
                    id: id,
                    firstName: player1.firstName,
                    lastName: player1.lastName,
                    GHIN: player1.GHIN,
                    handicap: newHandicap,
                    teePreference: player1.teePreference,
                    frontNine: player1.frontNine,
                    backNine: player1.backNine,
                    autoUpdateGHIN: player1.autoUpdateGHIN,
                })
            ).toEqual(targetState);
        });

        it("UPDATE_PLAYER should clear out any previous error message", () => {
            initialState.errorMessage = "Previous error message";

            var playerId = 2;
            targetState.players[0] = player1;
            targetState.errorMessage = "";

            //Add Player
            reducer(initialState, {
                type: actionTypes.ADD_PLAYER,
                id: playerId,
                firstName: player1.firstName,
                lastName: player1.lastName,
                GHIN: player1.GHIN,
                handicap: player1.handicap,
                teePreference: player1.teePreference,
                frontNine: player1.frontNine,
                backNine: player1.backNine,
            });

            expect(
                reducer(initialState, {
                    type: actionTypes.UPDATE_PLAYER,
                    id: playerId,
                    firstName: player1.firstName,
                    lastName: player1.lastName,
                    GHIN: player1.GHIN,
                    handicap: player1.handicap,
                    teePreference: player1.teePreference,
                    frontNine: player1.frontNine,
                    backNine: player1.backNine,
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
            var id = 5;
            var teamMemberIds = ["abc567", "pp001"];
            var teamNumber = 7;

            targetState.teams[0] = {
                id,
                teamNumber,
                teamMemberIds,
            };

            expect(
                reducer(initialState, {
                    type: actionTypes.ADD_TEAM,
                    id,
                    teamNumber,
                    teamMemberIds,
                })
            ).toEqual(targetState);
        });
    });

    describe("Courses", () => {
        it("should match the state when SET_COURSES is dispatched", () => {
            var courses = [course1, course2];
            targetState.courses = courses;

            expect(reducer(initialState, { type: actionTypes.SET_COURSES, courses: courses })).toEqual(targetState);
        });
    });

    describe("Division", () => {
        it("should match the state when SET_DIVISION is dispatched", () => {
            var divisions = [division1, division2];
            targetState.divisions = divisions;

            expect(reducer(initialState, { type: actionTypes.SET_DIVISOINS, divisions: divisions })).toEqual(targetState);
        });

        it("should match state when REMOVE_DIVSION is dispatched", () => {
            var id1 = "66666";
            var id2 = "asdfs12323";
            division1.id = id1;
            division2.id = id2;
            initialState.divisions[0] = division1;
            initialState.divisions[1] = division2;

            targetState.divisions = [division1];

            expect(
                reducer(initialState, {
                    type: actionTypes.REMOVE_DIVISION,
                    id: id2,
                })
            ).toEqual(targetState);
        });

        it("should match the state when ADD_DIVISION is dispatched", () => {
            var id = 5;
            var name = "Womens Div";

            targetState.divisions[0] = {
                id,
                name,
            };

            expect(
                reducer(initialState, {
                    type: actionTypes.ADD_DIVISION,
                    id,
                    name,
                })
            ).toEqual(targetState);
        });
    });
});
