import initialState from "./initialState";
import * as actionTypes from "../Actions/ActionTypes";
import reducer from "./golfReducer.js";

var targetState;

describe("Golf Reducer tests", () => {
    beforeEach(() => {
        targetState = JSON.parse(JSON.stringify(initialState));
    });

    it("should match the state when SET_LOGGED_IN_USER is dispatched", () => {
        const user = "testUser1234";
        const userToken = "asdfsdaf23r2qawf";
        targetState.loggedInUser = user;
        targetState.userToken = userToken;

        expect(reducer(initialState, { type: actionTypes.SET_LOGGED_IN_USER, user, userToken })).toEqual(targetState);
    });

    it("should match the state when SET_CURRENT_PAGE is dispatched", () => {
        var pageName = "PageXYZ";
        targetState.currentPage = pageName;

        expect(reducer(initialState, { type: actionTypes.SET_CURRENT_PAGE, pageName })).toEqual(targetState);
    });
});
