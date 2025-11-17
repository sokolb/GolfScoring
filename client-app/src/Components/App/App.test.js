import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, test } from "vitest";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { App } from "./App";

var props;
var mockStore;

// Mock reducer that returns full state
const mockReducer = (state = {}) => state;

describe("App tests", () => {
    beforeEach(() => {
        const initialState = {
            golf: {
                loggedInUser: "brian.sokoloski@gmail.com",
                currentPage: "Matches",
                players: [],
                teams: [],
                courses: [],
                divisions: [],
            },
        };

        props = {
            golf: initialState.golf,
        };

        // Create a mock Redux store with thunk middleware
        mockStore = createStore(mockReducer, initialState, applyMiddleware(thunk));
    });

    it("renders correct components", () => {
        render(
            <Provider store={mockStore}>
                <App {...props} />
            </Provider>
        );

        // Check that NavBar is rendered (look for navigation buttons)
        expect(screen.getByRole("button", { name: /players/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /teams/i })).toBeInTheDocument();

        // Check that logged in user is displayed
        expect(screen.getByText(/Logged in user:/i)).toBeInTheDocument();
    });

    it("display logged in user", () => {
        render(
            <Provider store={mockStore}>
                <App {...props} />
            </Provider>
        );

        expect(screen.getByText("Logged in user: " + props.golf.loggedInUser)).toBeInTheDocument();
    });

    test.each([
        ["Players", "Player List"],
        ["Teams", "Add Team"],
        ["Matches", "Create Match"],
        ["Login", "Login:"],
        ["Divisions", "Add Division"],
    ])("Displays %s component when store is set to that page", (pageName, pageHeading) => {
        const testState = {
            golf: {
                loggedInUser: "brian.sokoloski@gmail.com",
                currentPage: pageName,
                players: [],
                teams: [],
                courses: [],
                divisions: [],
            },
        };

        const testStore = createStore(mockReducer, testState, applyMiddleware(thunk));

        render(
            <Provider store={testStore}>
                <App {...testState} />
            </Provider>
        );

        // Check that the page component is rendered by looking for page-specific heading
        expect(screen.getByRole("heading", { name: pageHeading })).toBeInTheDocument();
    });
});
