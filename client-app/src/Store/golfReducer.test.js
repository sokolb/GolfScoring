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
        targetState.loggedInUser = user;

        expect(reducer(initialState, { type: actionTypes.SET_LOGGED_IN_USER, user: user })).toEqual(targetState);
    });
});
