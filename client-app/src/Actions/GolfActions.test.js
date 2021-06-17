import GhinDataService from "../Ghin/GhinDataService.js";
import * as actionTypes from "./ActionTypes.js";
import { addPlayer, logInUser, setCurrentPage, setLoggedInUser } from "./GolfActions.js";

jest.mock("../Ghin/GhinDataService");

describe("Actions tests", () => {
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

        expect(dispatch).toHaveBeenCalledWith({ user, userToken: responseData.data.golfer_user.golfer_user_token, type: actionTypes.SET_LOGGED_IN_USER });
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

        expect(dispatch).toHaveBeenCalledWith({ user, userToken, type: actionTypes.SET_LOGGED_IN_USER });
    });

    it("setCurrentPage dispatches SET_CURRENT_PAGE", () => {
        const dispatch = jest.fn();
        var pageName = "Players";

        setCurrentPage(pageName)(dispatch);

        expect(dispatch).toHaveBeenCalledWith({ pageName: pageName, type: actionTypes.SET_CURRENT_PAGE });
    });

    it("addPlayer calls getUserHandicap", async () => {
        const dispatch = jest.fn();
        var firstName = "Brian";
        var lastName = "Smith";
        var GHIN = "1234132";
        var handicap = "17.3";
        var user_token = "asfdsadfasdfdsaasdf";

        var responseData = {
            data: {
                golfer: {
                    handicap_index: handicap,
                },
            },
        };

        GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseData));

        await addPlayer(firstName, lastName, GHIN, user_token)(dispatch);

        expect(GhinDataService.getUserHandicap).toHaveBeenCalledWith(GHIN, user_token);
    });

    it("addPlayer dispatches ADD_PLAYER", async () => {
        const dispatch = jest.fn();
        var firstName = "Brian";
        var lastName = "Smith";
        var GHIN = "1234132";
        var handicap = "17.3";
        var user_token = "asfdsadfasdfdsaasdf";

        var responseData = {
            data: {
                golfer: {
                    handicap_index: handicap,
                },
            },
        };

        GhinDataService.getUserHandicap.mockReturnValue(Promise.resolve(responseData));

        await addPlayer(firstName, lastName, GHIN, user_token)(dispatch);

        expect(dispatch).toHaveBeenCalledWith({ firstName, lastName, GHIN, handicap, type: actionTypes.ADD_PLAYER });
    });
});
