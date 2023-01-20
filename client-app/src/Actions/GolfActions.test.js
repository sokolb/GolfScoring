import GhinDataService from "../DataServices/GhinDataService.js";
import AppData from "../DataServices/AppData.js";
import * as actionTypes from "./ActionTypes.js";
import { addPlayer, getPlayers, getTeams, logInUser, setCurrentPage, setLoggedInUser, removePlayer, removeTeam, addTeam } from "./GolfActions.js";

jest.mock("../DataServices/GhinDataService");
jest.mock("../DataServices/AppData");

describe("Actions tests", () => {
    it("setCurrentPage dispatches SET_CURRENT_PAGE", () => {
        const dispatch = jest.fn();
        var pageName = "Players";

        setCurrentPage(pageName)(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
            pageName: pageName,
            type: actionTypes.SET_CURRENT_PAGE,
        });
    });

    describe("Users", () => {
        it("logInUser calls get user token from API", async () => {
            const dispatch = jest.fn();
            var user = "brian.sokoloski3@gmail.com";
            var pwd = "@bc!23";
            GhinDataService.getUserToken.mockReturnValue(Promise.resolve({ data: {} }));

            await logInUser(user, pwd)(dispatch);

            expect(GhinDataService.getUserToken).toHaveBeenCalledWith(user, pwd);
        });

        it("logInUser dispatches setLoggedInUser on success from API call", async () => {
            const dispatch = jest.fn();
            var user = "brian.sokoloski3@gmail.com";
            var pwd = "@bc!23";
            var responseData = {
                data: {
                    golfer_user: {
                        golfer_user_token: "asdfasdf32r23rar",
                    },
                },
            };
            GhinDataService.getUserToken.mockReturnValue(Promise.resolve(responseData));

            await logInUser(user, pwd)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                user,
                userToken: responseData.data.golfer_user.golfer_user_token,
                type: actionTypes.SET_LOGGED_IN_USER,
            });
        });

        it("logInUser does not dispatch setLoggedInUser on failure from API call", async () => {
            const dispatch = jest.fn();
            var user = "brian.sokoloski3@gmail.com";
            var pwd = "@bc!23";

            GhinDataService.getUserToken.mockReturnValue(Promise.reject("Failure!"));

            await logInUser(user, pwd)(dispatch);

            expect(dispatch).not.toHaveBeenCalled();
        });

        it("setLoggedInUser dispatches SET_LOGGED_IN_USER", () => {
            const dispatch = jest.fn();
            var user = "brian.sokoloski3@gmail.com";
            var userToken = "asdfjiofaweoijwef234";

            setLoggedInUser(user, userToken)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                user,
                userToken,
                type: actionTypes.SET_LOGGED_IN_USER,
            });
        });
    });

    describe("Players", () => {
        var handicap = 42;
        var responseData = {
            data: {
                tee_sets: [
                    {
                        tee_set_id: 434364,
                        name: "Blue",
                        gender: "M",
                        ratings: [
                            {
                                tee_set_side: "All 18",
                                course_handicap: 11,
                            },
                            {
                                tee_set_side: "B9",
                                course_handicap: 6,
                            },
                            {
                                tee_set_side: "F9",
                                course_handicap: 5,
                            },
                        ],
                    },
                    {
                        tee_set_id: 434365,
                        name: "White",
                        gender: "M",
                        ratings: [
                            {
                                tee_set_side: "All 18",
                                course_handicap: 10,
                            },
                            {
                                tee_set_side: "B9",
                                course_handicap: 6,
                            },
                            {
                                tee_set_side: "F9",
                                course_handicap: 4,
                            },
                        ],
                    },
                ],
            },
        };

        it("addPlayer calls getUserHandicap", async () => {
            const dispatch = jest.fn();
            var firstName = "Brian";
            var lastName = "Smith";
            var GHIN = "1234132";
            var teePreference = "White";
            var user_token = "asfdsadfasdfdsaasdf";

            GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseData));
            AppData.addPlayer.mockReturnValue(Promise.resolve(""));

            await addPlayer(firstName, lastName, GHIN, teePreference, user_token)(dispatch);

            expect(GhinDataService.getUserHandicap).toHaveBeenCalledWith(GHIN, user_token);
        });

        it("addPlayer calls addPlayer API", async () => {
            const dispatch = jest.fn();
            var firstName = "Brian";
            var lastName = "Smith";
            var GHIN = "1234132";
            var user_token = "asfdsadfasdfdsaasdf";
            var teePreference = "White";

            var player = {
                GHIN,
                firstName,
                lastName,
                handicap: responseData.data.tee_sets[1].ratings[0].course_handicap,
                teePreference,
                frontNine: responseData.data.tee_sets[1].ratings[2].course_handicap,
                backNine: responseData.data.tee_sets[1].ratings[1].course_handicap,
            };

            GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseData));
            AppData.addPlayer.mockReturnValue(Promise.resolve(""));

            await addPlayer(firstName, lastName, GHIN, teePreference, user_token)(dispatch);

            expect(AppData.addPlayer).toHaveBeenCalledWith(player);
        });

        it("addPlayer dispatches ADD_PLAYER", async () => {
            const dispatch = jest.fn();
            var id = "3";
            var firstName = "Brian";
            var lastName = "Smith";
            var GHIN = "1234132";
            var teePreference = "White";
            var user_token = "asfdsadfasdfdsaasdf";

            GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseData));

            var responseFromApi = {
                data: id,
            };
            AppData.addPlayer.mockReturnValue(Promise.resolve(responseFromApi));

            await addPlayer(firstName, lastName, GHIN, teePreference, user_token)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                id,
                firstName,
                lastName,
                GHIN,
                handicap: responseData.data.tee_sets[1].ratings[0].course_handicap,
                teePreference,
                frontNine: responseData.data.tee_sets[1].ratings[2].course_handicap,
                backNine: responseData.data.tee_sets[1].ratings[1].course_handicap,
                type: actionTypes.ADD_PLAYER,
            });
        });

        it("removePlayer calls deletePlayer API", async () => {
            const dispatch = jest.fn();
            var playerId = "2244";
            AppData.deletePlayer.mockReturnValue(Promise.resolve(""));

            await removePlayer(playerId)(dispatch);

            expect(AppData.deletePlayer).toHaveBeenCalledWith(playerId);
        });

        it("removePlayer dispatches REMOVE_PLAYER", async () => {
            const dispatch = jest.fn();
            let id = "12345";
            AppData.deletePlayer.mockReturnValue(Promise.resolve(""));

            await removePlayer(id)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                id: id,
                type: actionTypes.REMOVE_PLAYER,
            });
        });

        it("removePlayer does not dispatch REMOVE_PLAYER when deletePlayer fails", async () => {
            const dispatch = jest.fn();
            let id = "12345";
            AppData.deletePlayer.mockReturnValue(Promise.reject(""));

            await removePlayer(id)(dispatch);

            expect(dispatch).not.toHaveBeenCalled();
        });

        it("addPlayer dispatches SET_ERROR_MESSAGE when API call call fails", async () => {
            const dispatch = jest.fn();
            var firstName = "Brian";
            var lastName = "Smith";
            var GHIN = "1234132";
            var user_token = "asfdsadfasdfdsaasdf";

            var errorMessage = "Player not found error";
            var responseData = {
                response: {
                    data: {
                        errors: {
                            golfer_id: [errorMessage],
                        },
                    },
                },
            };

            GhinDataService.getUserHandicap.mockReturnValue(Promise.reject(responseData));

            await addPlayer(firstName, lastName, GHIN, user_token)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                errorMessage,
                type: actionTypes.SET_ERROR_MESSAGE,
            });
        });

        it("getPlayers calls getPlayers endpoint", async () => {
            const dispatch = jest.fn();
            var fileName = "test.json";
            AppData.getPlayers.mockReturnValue(Promise.resolve({ data: {} }));

            await getPlayers(fileName)(dispatch);

            expect(AppData.getPlayers).toHaveBeenCalledWith(fileName);
        });

        it("getPlayers dispatches SET_PLAYERS on successful API call", async () => {
            const dispatch = jest.fn();
            var fileName = "test.json";

            var responseData = [
                {
                    GHIN: 324524,
                    firstName: "bob",
                    lastName: "smth",
                    handicap: 12,
                },
                {
                    GHIN: 42342,
                    firstName: "Jane",
                    lastName: "Doe",
                    handicap: 26.9,
                },
            ];

            AppData.getPlayers.mockReturnValue(Promise.resolve({ data: responseData }));

            await getPlayers(fileName)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                players: responseData,
                type: actionTypes.SET_PLAYERS,
            });
        });
    });

    describe("Teams", () => {
        it("getTeams dispatches SET_TEAMS on successfull API call", async () => {
            const dispatch = jest.fn();
            var filename = "testTeams.json";

            var responseData = [
                {
                    teamNumber: 324524,
                    teamMemberIds: ["3b1823f4-b36c-4288-a827-ed0b00bc1122", "0c6b559a-ae1b-44d1-9c8b-d7f3f8b9e1133"],
                },
                {
                    teamNumber: 42342,
                    teamMemberIds: ["3b1823f4-b36c-4288-a827-ed0b00bc1144", "0c6b559a-ae1b-44d1-9c8b-d7f3f8b9e1155"],
                },
            ];

            AppData.getTeams.mockReturnValue(Promise.resolve({ data: responseData }));

            await getTeams(filename)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                teams: responseData,
                type: actionTypes.SET_TEAMS,
            });
        });

        it("addTeam dispatches ADD_TEAM", async () => {
            const dispatch = jest.fn();
            var id = 4;
            var teamMemberIds = ["abc123", "xyz321"];
            var teamNumber = 3;

            var responseFromApi = {
                data: id,
            };
            AppData.addTeam.mockReturnValue(Promise.resolve(responseFromApi));

            await addTeam(teamNumber, teamMemberIds)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                id,
                teamNumber,
                teamMemberIds,
                type: actionTypes.ADD_TEAM,
            });
        });

        it("removeTeam dispatches REMOVE_TEAM", async () => {
            const dispatch = jest.fn();
            let id = "12345abcdefg";

            AppData.deleteTeam.mockReturnValue(Promise.resolve(""));

            await removeTeam(id)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                id: id,
                type: actionTypes.REMOVE_TEAM,
            });
        });

        it("removeTeam calls deleteTeam API", async () => {
            const dispatch = jest.fn();
            var teamId = 3;
            AppData.deleteTeam.mockReturnValue(Promise.resolve(""));

            await removeTeam(teamId)(dispatch);

            expect(AppData.deleteTeam).toHaveBeenCalledWith(teamId);
        });

        it("remoteTeam does not dispatch REMOVE_TEAM when deleteTeam fails", async () => {
            const dispatch = jest.fn();
            let id = 66;
            AppData.deleteTeam.mockReturnValue(Promise.reject(""));

            await removeTeam(id)(dispatch);

            expect(dispatch).not.toHaveBeenCalled();
        });
    });
});
