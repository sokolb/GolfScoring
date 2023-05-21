import GhinDataService from "../DataServices/GhinDataService.js";
import AppData from "../DataServices/AppData.js";
import * as actionTypes from "./ActionTypes.js";
import { addOrUpdatePlayer, getPlayers, getTeams, logInUser, setCurrentPage, setLoggedInUser, removePlayer, removeTeam, addTeam, getCourses } from "./GolfActions.js";

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
        var responseDataCourseHandicap = {
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

        var responseDataUserHandicapIndex = {
            data: {
                golfers: [
                    {
                        first_name: "Brian",
                        last_name: "Sokoloski",
                        gender: "M",
                        email: "b*****@g*****.com",
                        phone_number: "",
                        suffix: null,
                        prefix: null,
                        middle_name: "",
                        status: "Active",
                        ghin: "5884935",
                        handicap_index: "10.1",
                        association_id: 45,
                        association_name: "Minnesota Golf Association",
                        club_name: "Rose Lake Golf Club",
                        club_id: 20160,
                        state: "MN",
                        country: "United States",
                        low_hi: "10.1",
                        soft_cap: "false",
                        hard_cap: "false",
                        entitlement: false,
                        club_affiliation_id: 3986026,
                        is_home_club: true,
                        rev_date: "2023-05-11",
                        hi_value: 10.1,
                        hi_display: "10.1",
                        message_club_authorized: null,
                        low_hi_value: 10.1,
                        low_hi_display: "10.1",
                        low_hi_date: "2023-05-11",
                        has_digital_profile: true,
                    },
                ],
            },
        };

        it("addOrUpdatePlayer calls getUserHandicap and getUserCourseHandicap", async () => {
            const dispatch = jest.fn();
            var firstName = "Brian";
            var lastName = "Smith";
            var GHIN = "1234132";
            var teePreference = "White";
            var user_token = "asfdsadfasdfdsaasdf";
            var updateGHIN = true;

            GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseDataUserHandicapIndex));
            GhinDataService.getUserCourseHandicap.mockReturnValue(Promise.resolve(responseDataCourseHandicap));
            AppData.addPlayer.mockReturnValue(Promise.resolve(""));

            await addOrUpdatePlayer(-1, firstName, lastName, GHIN, teePreference, updateGHIN, user_token)(dispatch);

            expect(GhinDataService.getUserHandicap).toHaveBeenCalledWith(GHIN, user_token);
            expect(GhinDataService.getUserCourseHandicap).toHaveBeenCalledWith(GHIN, user_token);
        });

        it("addOrUpdatePlayer calls addPlayer API for new player", async () => {
            const dispatch = jest.fn();
            var firstName = "Brian";
            var lastName = "Smith";
            var GHIN = "1234132";
            var user_token = "asfdsadfasdfdsaasdf";
            var teePreference = "White";
            var updateGHIN = true;

            var player = {
                id: -1,
                GHIN,
                firstName,
                lastName,
                handicap: responseDataUserHandicapIndex.data.golfers[0].handicap_index,
                teePreference,
                frontNine: responseDataCourseHandicap.data.tee_sets[1].ratings[2].course_handicap,
                backNine: responseDataCourseHandicap.data.tee_sets[1].ratings[1].course_handicap,
                autoUpdateGHIN: updateGHIN,
            };

            GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseDataUserHandicapIndex));
            GhinDataService.getUserCourseHandicap.mockReturnValue(Promise.resolve(responseDataCourseHandicap));
            AppData.addPlayer.mockReturnValue(Promise.resolve(""));

            await addOrUpdatePlayer(-1, firstName, lastName, GHIN, teePreference, updateGHIN, user_token)(dispatch);

            expect(AppData.addPlayer).toHaveBeenCalledWith(player);
        });

        it("addOrUpdatePlayer dispatches ADD_PLAYER for new player", async () => {
            const dispatch = jest.fn();
            var id = "3";
            var firstName = "Brian";
            var lastName = "Smith";
            var GHIN = "1234132";
            var teePreference = "White";
            var user_token = "asfdsadfasdfdsaasdf";
            var updateGHIN = true;

            GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseDataUserHandicapIndex));
            GhinDataService.getUserCourseHandicap.mockReturnValue(Promise.resolve(responseDataCourseHandicap));

            var responseFromApi = {
                data: id,
            };
            AppData.addPlayer.mockReturnValue(Promise.resolve(responseFromApi));

            await addOrUpdatePlayer(-1, firstName, lastName, GHIN, teePreference, updateGHIN, user_token)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                id,
                firstName,
                lastName,
                GHIN,
                handicap: responseDataUserHandicapIndex.data.golfers[0].handicap_index,
                teePreference,
                frontNine: responseDataCourseHandicap.data.tee_sets[1].ratings[2].course_handicap,
                backNine: responseDataCourseHandicap.data.tee_sets[1].ratings[1].course_handicap,
                autoUpdateGHIN: updateGHIN,
                type: actionTypes.ADD_PLAYER,
            });
        });

        it("addOrUpdatePlayer calls updatePlayer API for existing player", async () => {
            const dispatch = jest.fn();
            var playerId = 13;
            var firstName = "Brian";
            var lastName = "Smith";
            var GHIN = "1234132";
            var user_token = "asfdsadfasdfdsaasdf";
            var teePreference = "White";
            var updateGHIN = true;

            var player = {
                id: playerId,
                GHIN,
                firstName,
                lastName,
                handicap: responseDataUserHandicapIndex.data.golfers[0].handicap_index,
                teePreference,
                frontNine: responseDataCourseHandicap.data.tee_sets[1].ratings[2].course_handicap,
                backNine: responseDataCourseHandicap.data.tee_sets[1].ratings[1].course_handicap,
                autoUpdateGHIN: updateGHIN,
            };

            GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseDataUserHandicapIndex));
            GhinDataService.getUserCourseHandicap.mockReturnValue(Promise.resolve(responseDataCourseHandicap));
            AppData.updatePlayer.mockReturnValue(Promise.resolve(""));

            await addOrUpdatePlayer(playerId, firstName, lastName, GHIN, teePreference, updateGHIN, user_token)(dispatch);

            expect(AppData.updatePlayer).toHaveBeenCalledWith(player);
        });

        it("addOrUpdatePlayer dispatches UPDATE_PLAYER for existing player", async () => {
            const dispatch = jest.fn();
            var id = "3";
            var playerId = 42;
            var firstName = "Brian";
            var lastName = "Smith";
            var GHIN = "1234132";
            var teePreference = "White";
            var user_token = "asfdsadfasdfdsaasdf";
            var updateGHIN = true;

            GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseDataUserHandicapIndex));
            GhinDataService.getUserCourseHandicap.mockReturnValue(Promise.resolve(responseDataCourseHandicap));

            var responseFromApi = {
                data: id,
            };
            AppData.updatePlayer.mockReturnValue(Promise.resolve(responseFromApi));

            await addOrUpdatePlayer(playerId, firstName, lastName, GHIN, teePreference, updateGHIN, user_token)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                id: playerId,
                firstName,
                lastName,
                GHIN,
                handicap: responseDataUserHandicapIndex.data.golfers[0].handicap_index,
                teePreference,
                frontNine: responseDataCourseHandicap.data.tee_sets[1].ratings[2].course_handicap,
                backNine: responseDataCourseHandicap.data.tee_sets[1].ratings[1].course_handicap,
                autoUpdateGHIN: updateGHIN,
                type: actionTypes.UPDATE_PLAYER,
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
            var updateGHIN = true;

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

            GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseDataUserHandicapIndex));
            GhinDataService.getUserCourseHandicap.mockReturnValue(Promise.reject(responseData));

            await addOrUpdatePlayer(firstName, lastName, GHIN, updateGHIN, user_token)(dispatch);

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

    describe("Courses", () => {
        it("getCourses dispatches SET_COURSES on successfull API call", async () => {
            const dispatch = jest.fn();
            var filename = "test.json";

            var responseData = [
                {
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
                },
                {
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
                },
            ];

            AppData.getCourses.mockReturnValue(Promise.resolve({ data: responseData }));

            await getCourses(filename)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                courses: responseData,
                type: actionTypes.SET_COURSES,
            });
        });
    });
});
