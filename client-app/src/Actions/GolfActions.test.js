import * as actionTypes from "./ActionTypes.js";
import { setLoggedInUser } from "./GolfActions.js";

describe("Actions tests", () => {
    it("setLoggedInUser dispatches SET_LOGGED_IN_USER", () => {
        const dispatch = jest.fn();
        var user = "brian.sokoloski3@gmail.com";

        setLoggedInUser(user)(dispatch);

        expect(dispatch).toHaveBeenCalledWith({ user, type: actionTypes.SET_LOGGED_IN_USER });
    });
});
