import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { Matches } from "./Matches";
import Scorecard from "./Scorecard";

// Mock the Scorecard component to avoid complex rendering
vi.mock("./Scorecard", () => ({
    default: ({ frontBackNine, team1Id, team2Id, division }) => (
        <div data-testid="scorecard">
            <div data-testid="scorecard-frontBackNine">{frontBackNine}</div>
            <div data-testid="scorecard-team1Id">{team1Id}</div>
            <div data-testid="scorecard-team2Id">{team2Id}</div>
            <div data-testid="scorecard-division">{division}</div>
        </div>
    ),
}));

var props;
var user_token = "abcxyz";

describe("Matches tests", () => {
    beforeEach(() => {
        process.env.REACT_APP_USERNAME = "b@b.com";
        process.env.REACT_APP_PASSWORD = "abc123";

        props = {
            golf: {
                userToken: "abc123",
                teams: [
                    {
                        teamNumber: 1,
                        teamMembers: [
                            { playerId: 1, APlayer: true },
                            { playerId: 2, APlayer: false },
                        ],
                        divisionId: 1,
                    },
                    {
                        teamNumber: 2,
                        teamMembers: [
                            { playerId: 3, APlayer: true },
                            { playerId: 4, APlayer: false },
                        ],
                        divisionId: 1,
                    },
                ],
                players: [
                    {
                        id: 1,
                        GHIN: 1234,
                        firstName: "Brian",
                        lastName: "Sokoloski",
                        handicap: 11,
                        teePreference: "White",
                        autoUpdateGHIN: true,
                    },
                    {
                        id: 2,
                        GHIN: 4321,
                        firstName: "Bob",
                        lastName: "Smith",
                        handicap: 12,
                        teePreference: "Blue",
                        autoUpdateGHIN: true,
                    },
                    {
                        id: 3,
                        GHIN: 5567,
                        firstName: "Mary",
                        lastName: "Johnson",
                        handicap: 12,
                        teePreference: "Red",
                        autoUpdateGHIN: true,
                    },
                    {
                        id: 4,
                        GHIN: 5568,
                        firstName: "Jane",
                        lastName: "Doe",
                        handicap: 17,
                        teePreference: "Gold",
                        autoUpdateGHIN: false,
                    },
                ],
                divisions: [
                    { id: 1, name: "mens div 1" },
                    { id: 2, name: "mens div 2" },
                ],
            },
            getTeams: vi.fn(),
            getPlayers: vi.fn(),
            logInUser: vi.fn(),
            addOrUpdatePlayer: vi.fn(),
        };
    });

    afterEach(() => {
        delete process.env.REACT_APP_USERNAME;
        delete process.env.REACT_APP_PASSWORD;
        vi.clearAllMocks();
    });

    it("Renders add new player boxes", () => {
        const { container } = render(<Matches {...props} />);

        const team1 = container.querySelector('[name="team1"]');
        const team2 = container.querySelector('[name="team2"]');
        const frontBackNine = container.querySelector('[name="frontBackNine"]');
        const createScoreCard = container.querySelector('[name="createScoreCard"]');

        expect(team1).toBeInTheDocument();
        expect(team2).toBeInTheDocument();
        expect(frontBackNine).toBeInTheDocument();
        expect(createScoreCard).toBeInTheDocument();
    });

    it("Gets user token on page load", () => {
        render(<Matches {...props} />);

        expect(props.logInUser).toHaveBeenCalledWith(process.env.REACT_APP_USERNAME, process.env.REACT_APP_PASSWORD);
    });

    it("populate teams and players on page load", () => {
        render(<Matches {...props} />);

        expect(props.getTeams).toHaveBeenCalled();
        expect(props.getPlayers).toHaveBeenCalled();
    });

    it("renders teams correctly in each team list", () => {
        const { container } = render(<Matches {...props} />);

        const team1 = container.querySelector('[name="team1"]');
        expect(team1.children.length).toEqual(3);
        expect(team1.children[0].textContent).toEqual("Select a team");
        expect(team1.children[0].value).toEqual("-1");
        expect(team1.children[1].textContent).toEqual("mens div 1: Brian Sokoloski | Bob Smith");
        expect(team1.children[1].value).toEqual("1");
        expect(team1.children[2].textContent).toEqual("mens div 1: Mary Johnson | Jane Doe");
        expect(team1.children[2].value).toEqual("2");

        const team2 = container.querySelector('[name="team2"]');
        expect(team2.children.length).toEqual(3);
        expect(team2.children[0].textContent).toEqual("Select a team");
        expect(team2.children[0].value).toEqual("-1");
        expect(team2.children[1].textContent).toEqual("mens div 1: Brian Sokoloski | Bob Smith");
        expect(team2.children[1].value).toEqual("1");
        expect(team2.children[2].textContent).toEqual("mens div 1: Mary Johnson | Jane Doe");
        expect(team2.children[2].value).toEqual("2");
    });

    test.each([
        [-1, 1, "Please select 2 teams"],
        [1, -1, "Please select 2 teams"],
        [1, 2, ""],
    ])("Submit button validates selected players, team1 %s, team2 %s, errorMessage %s", async (team1, team2, errorMessage) => {
        const user = userEvent.setup();
        const { container } = render(<Matches {...props} />);

        const team1SelectBox = container.querySelector('[name="team1"]');
        await user.selectOptions(team1SelectBox, team1.toString());
        const team2SelectBox = container.querySelector('[name="team2"]');
        await user.selectOptions(team2SelectBox, team2.toString());

        const createScoreCardButton = container.querySelector('[name="createScoreCard"]');
        await user.click(createScoreCardButton);

        const errorMessageLabel = container.querySelector('[name="errorMessage"]');

        expect(errorMessageLabel.textContent).toEqual(errorMessage);
    });

    it("error message is shown when same team selected", async () => {
        const user = userEvent.setup();
        const { container } = render(<Matches {...props} />);

        const team1SelectBox = container.querySelector('[name="team1"]');
        await user.selectOptions(team1SelectBox, "1");
        const team2SelectBox = container.querySelector('[name="team2"]');
        await user.selectOptions(team2SelectBox, "1");

        const createScoreCardButton = container.querySelector('[name="createScoreCard"]');
        await user.click(createScoreCardButton);

        const errorMessageLabel = container.querySelector('[name="errorMessage"]');

        expect(errorMessageLabel.textContent).toEqual("Please select 2 different teams");
    });

    test.each([
        ["team1", "1"],
        ["team2", "1"],
        ["frontBackNine", "frontNine"],
    ])("Changing element: %s clears out errorMessage for changeValue: %s", async (elementName, changeValue) => {
        const user = userEvent.setup();
        const { container } = render(<Matches {...props} />);

        const createScoreCardButton = container.querySelector('[name="createScoreCard"]');
        await user.click(createScoreCardButton); //This sets an errorMessage
        let errorMessageLabel = container.querySelector('[name="errorMessage"]');

        expect(errorMessageLabel.textContent.length).not.toEqual(0);

        const targetElement = container.querySelector(`[name="${elementName}"]`);
        await user.selectOptions(targetElement, changeValue);

        errorMessageLabel = container.querySelector('[name="errorMessage"]');
        expect(errorMessageLabel.textContent.length).toEqual(0);
    });

    it("Scorecard is rendered with correct props on button click", async () => {
        const user = userEvent.setup();
        const { container } = render(<Matches {...props} />);

        const team1SelectBox = container.querySelector('[name="team1"]');
        await user.selectOptions(team1SelectBox, "1");
        const team2SelectBox = container.querySelector('[name="team2"]');
        await user.selectOptions(team2SelectBox, "2");

        const createScoreCardButton = container.querySelector('[name="createScoreCard"]');
        await user.click(createScoreCardButton);

        const scorecard = screen.getByTestId("scorecard");
        expect(screen.getByTestId("scorecard-frontBackNine").textContent).toEqual("frontNine");
        expect(screen.getByTestId("scorecard-team1Id").textContent).toEqual("1");
        expect(screen.getByTestId("scorecard-team2Id").textContent).toEqual("2");
    });

    test.each([
        [1, 1, "mens div 1"],
        [1, 2, "mens div 1 | mens div 2"],
        [-1, 1, "mens div 1"],
        [1, 1, "mens div 1"],
        [-1, -1, ""],
    ])("Scorecard is rendered with correct division prop on button click", async (team1Div, team2Div, divisionText) => {
        const user = userEvent.setup();
        props.golf.teams[0].divisionId = team1Div;
        props.golf.teams[1].divisionId = team2Div;
        const { container } = render(<Matches {...props} />);

        const team1SelectBox = container.querySelector('[name="team1"]');
        await user.selectOptions(team1SelectBox, "1");
        const team2SelectBox = container.querySelector('[name="team2"]');
        await user.selectOptions(team2SelectBox, "2");

        const createScoreCardButton = container.querySelector('[name="createScoreCard"]');
        await user.click(createScoreCardButton);

        const scorecard = screen.getByTestId("scorecard");
        expect(screen.getByTestId("scorecard-division").textContent).toEqual(divisionText);
    });

    it("addOrUpdatePlayer is called when team is selected", async () => {
        const user = userEvent.setup();
        const { container } = render(<Matches {...props} />);

        const team1SelectBox = container.querySelector('[name="team1"]');
        await user.selectOptions(team1SelectBox, "1");
        const team2SelectBox = container.querySelector('[name="team2"]');
        await user.selectOptions(team2SelectBox, "2");

        const team1PlayerA = props.golf.players[0];
        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(team1PlayerA.id, team1PlayerA.firstName, team1PlayerA.lastName, team1PlayerA.GHIN, team1PlayerA.teePreference, team1PlayerA.autoUpdateGHIN, props.golf.userToken);
        const team1PlayerB = props.golf.players[1];
        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(team1PlayerB.id, team1PlayerB.firstName, team1PlayerB.lastName, team1PlayerB.GHIN, team1PlayerB.teePreference, team1PlayerB.autoUpdateGHIN, props.golf.userToken);
        const team2PlayerA = props.golf.players[2];
        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(team2PlayerA.id, team2PlayerA.firstName, team2PlayerA.lastName, team2PlayerA.GHIN, team2PlayerA.teePreference, team2PlayerA.autoUpdateGHIN, props.golf.userToken);
        const team2PlayerB = props.golf.players[3];
        expect(props.addOrUpdatePlayer).not.toHaveBeenCalledWith(team2PlayerB.id, team2PlayerB.firstName, team2PlayerB.lastName, team2PlayerB.GHIN, team2PlayerB.teePreference, team2PlayerB.autoUpdateGHIN, props.golf.userToken);
    });
});
