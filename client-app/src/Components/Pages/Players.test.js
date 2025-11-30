import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { Players } from "./Players";

// Mock the Player component since it's Redux-connected
vi.mock("./Player", () => ({
    default: ({ player, showDeleteButton }) => (
        <tr data-testid="player-row">
            <td>{player.firstName}</td>
            <td>{player.lastName}</td>
            <td>{player.GHIN}</td>
            <td>{player.handicap}</td>
            <td>{player.teePreference}</td>
            <td>{player.frontNine}</td>
            <td>{player.backNine}</td>
            <td>{showDeleteButton && <button name="delete">Delete</button>}</td>
        </tr>
    ),
}));

var props;

describe("Players Tests", () => {
    beforeEach(() => {
        props = {
            golf: {
                loggedInUser: "bob.jones@abc.com",
                userToken: "abc123",
                players: [
                    { id: 3, GHIN: "11221", firstName: "Bob", lastName: "Smith", handicap: 2, teePreference: "White", autoUpdateGHIN: true },
                    {
                        id: 17,
                        GHIN: "243332",
                        firstName: "Sally",
                        lastName: "Jones",
                        handicap: 3,
                        teePreference: "Red",
                        autoUpdateGHIN: true,
                    },
                ],
            },
            addOrUpdatePlayer: vi.fn(),
            addOrUpdatePlayerNoAutoGhinUpdate: vi.fn(),
            getPlayers: vi.fn(),
        };
    });

    it("Renders player boxes", () => {
        const { container } = render(<Players {...props} />);

        const ddlPlayers = container.querySelector('[name="players"]');
        const firstName = container.querySelector('[name="firstName"]');
        const lastName = container.querySelector('[name="lastName"]');
        const GHIN = container.querySelector('[name="GHIN"]');
        const submit = container.querySelector('[name="submit"]');
        const refreshAllHandicaps = container.querySelector('[name="refreshAllHandicaps"]');
        const autoUpdateGHIN = container.querySelector('[name="autoUpdateGHIN"]');

        expect(ddlPlayers).toBeInTheDocument();
        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(GHIN).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
        expect(refreshAllHandicaps).toBeInTheDocument();
        expect(autoUpdateGHIN).toBeInTheDocument();
    });

    it("Players drop down is populated on load", () => {
        const { container } = render(<Players {...props} />);

        const ddlPlayers = container.querySelector('[name="players"]');
        const options = ddlPlayers.querySelectorAll("option");

        expect(options.length).toEqual(3);
        expect(options[0].textContent).toEqual("Add new player");
        expect(options[0].value).toEqual("-1");
        expect(options[1].textContent).toEqual(props.golf.players[0].firstName + " " + props.golf.players[0].lastName);
        expect(options[1].value).toEqual(props.golf.players[0].id.toString());
        expect(options[2].textContent).toEqual(props.golf.players[1].firstName + " " + props.golf.players[1].lastName);
        expect(options[2].value).toEqual(props.golf.players[1].id.toString());
    });

    it("Hides add new player boxes when user is not logged in", () => {
        props.golf.loggedInUser = undefined;
        const { container } = render(<Players {...props} />);

        const addPlayer = container.querySelector('[name="addPlayer"]');

        expect(addPlayer).not.toBeInTheDocument();
    });

    it("Submit click calls addOrUpdatePlayer with autoUpdate", async () => {
        const user = userEvent.setup();
        const firstName = "brian";
        const lastName = "Johnson";
        const GHIN = "110492312";
        const teePreference = "Gold";
        const autoUpdate = true;

        const { container } = render(<Players {...props} />);

        const firstNameTextBox = container.querySelector('[name="firstName"]');
        await user.clear(firstNameTextBox);
        await user.type(firstNameTextBox, firstName);

        const lastNameTextBox = container.querySelector('[name="lastName"]');
        await user.clear(lastNameTextBox);
        await user.type(lastNameTextBox, lastName);

        const GHINtextBox = container.querySelector('[name="GHIN"]');
        await user.clear(GHINtextBox);
        await user.type(GHINtextBox, GHIN);

        const teePreferenceSelectionBox = container.querySelector('[name="teePreferenceSelectionBox"]');
        await user.selectOptions(teePreferenceSelectionBox, teePreference);

        const autoUpdateGhin = container.querySelector('[name="autoUpdateGHIN"]');
        expect(autoUpdateGhin.checked).toBe(true); // Should already be checked by default

        const submitButton = container.querySelector('[name="submit"]');
        await user.click(submitButton);

        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(-1, firstName, lastName, GHIN, teePreference, autoUpdate, props.golf.userToken);
    });

    it("Submit click calls addOrUpdatePlayer without autoUpdate", async () => {
        const user = userEvent.setup();
        const firstName = "brian";
        const lastName = "Johnson";
        const GHIN = "110492312";
        const teePreference = "Gold";
        const autoUpdate = false;
        const handicap = "19";
        const frontNine = "10";
        const backNine = "9";

        const { container } = render(<Players {...props} />);

        const autoUpdateGhin = container.querySelector('[name="autoUpdateGHIN"]');
        await user.click(autoUpdateGhin);

        const firstNameTextBox = container.querySelector('[name="firstName"]');
        await user.clear(firstNameTextBox);
        await user.type(firstNameTextBox, firstName);

        const lastNameTextBox = container.querySelector('[name="lastName"]');
        await user.clear(lastNameTextBox);
        await user.type(lastNameTextBox, lastName);

        const GHINtextBox = container.querySelector('[name="GHIN"]');
        await user.clear(GHINtextBox);
        await user.type(GHINtextBox, GHIN);

        const teePreferenceSelectionBox = container.querySelector('[name="teePreferenceSelectionBox"]');
        await user.selectOptions(teePreferenceSelectionBox, teePreference);

        const handicapTextBox = container.querySelector('[name="handicap"]');
        await user.clear(handicapTextBox);
        await user.type(handicapTextBox, handicap);

        const frontNineTextBox = container.querySelector('[name="frontNine"]');
        await user.clear(frontNineTextBox);
        await user.type(frontNineTextBox, frontNine);

        const backNineTextBox = container.querySelector('[name="backNine"]');
        await user.clear(backNineTextBox);
        await user.type(backNineTextBox, backNine);

        const submitButton = container.querySelector('[name="submit"]');
        await user.click(submitButton);

        expect(props.addOrUpdatePlayerNoAutoGhinUpdate).toHaveBeenCalledWith(-1, firstName, lastName, GHIN, teePreference, autoUpdate, handicap, frontNine, backNine);
    });

    it("refreshAllHandicaps click calls addOrUpdatePlayer per player", async () => {
        const user = userEvent.setup();
        const player1 = props.golf.players[0];
        const player2 = props.golf.players[1];
        const { container } = render(<Players {...props} />);

        const refreshAllHandicaps = container.querySelector('[name="refreshAllHandicaps"]');
        await user.click(refreshAllHandicaps);

        expect(props.addOrUpdatePlayer).toHaveBeenCalledTimes(2);
        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(player1.id, player1.firstName, player1.lastName, player1.GHIN, player1.teePreference, true, props.golf.userToken);
        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(player2.id, player2.firstName, player2.lastName, player2.GHIN, player2.teePreference, true, props.golf.userToken);
    });

    it("refreshAllHandicaps click calls addOrUpdatePlayer for players with autoUpdate on", async () => {
        const user = userEvent.setup();
        const player1 = props.golf.players[0];
        player1.autoUpdateGHIN = false;
        const player2 = props.golf.players[1];
        const { container } = render(<Players {...props} />);

        const refreshAllHandicaps = container.querySelector('[name="refreshAllHandicaps"]');
        await user.click(refreshAllHandicaps);

        expect(props.addOrUpdatePlayer).toHaveBeenCalledTimes(1);
        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(player2.id, player2.firstName, player2.lastName, player2.GHIN, player2.teePreference, true, props.golf.userToken);
    });

    it("Calls GetPlayers on when rendered", () => {
        render(<Players {...props} />);

        expect(props.getPlayers).toHaveBeenCalled();
    });

    it("Renders correct number of players", () => {
        const { container } = render(<Players {...props} />);

        // Count the number of rows in the player table (excluding header row)
        const table = container.querySelector("table");
        const rows = table.querySelectorAll("tbody tr, tr");
        // Filter out the header row by checking if it contains <th> elements
        const dataRows = Array.from(rows).filter((row) => !row.querySelector("th"));

        expect(dataRows.length).toEqual(2);
    });

    test.each([
        ["bobby.t@yahoo.com", true],
        [undefined, false],
    ])("Renders players with correct delete button on user logged in: %s", (user, showDeleteButton) => {
        props.golf.loggedInUser = user;
        const { container } = render(<Players {...props} />);

        // Find all delete buttons in the table
        const table = container.querySelector("table");
        const deleteButtons = table.querySelectorAll('[name="delete"]');

        if (showDeleteButton) {
            expect(deleteButtons.length).toEqual(2); // Should have delete buttons for both players
        } else {
            expect(deleteButtons.length).toEqual(0); // Should have no delete buttons
        }
    });

    it("Renders error message when it is present", () => {
        props.golf.errorMessage = "Player not found";
        const { container } = render(<Players {...props} />);

        const errorLabel = container.querySelector('[name="lblError"]');

        expect(errorLabel).toBeInTheDocument();
    });

    it("Does not render error message when it is empty", () => {
        props.golf.errorMessage = "";
        const { container } = render(<Players {...props} />);

        const errorLabel = container.querySelector('[name="lblError"]');

        expect(errorLabel).not.toBeInTheDocument();
    });

    test.each([
        ["Brian", "Sokoloski", "12345", false],
        ["Brian", "Sokoloski", "", true],
        ["Brian", "", "12346", true],
        ["", "Sokoloski", "12347", true],
    ])("Submit button disabled/enabled correctly with params: firstName %s lastName %s GHIN %s", async (firstName, lastName, GHIN, disabled) => {
        const user = userEvent.setup();
        const { container } = render(<Players {...props} />);

        const firstNameTextBox = container.querySelector('[name="firstName"]');
        await user.clear(firstNameTextBox);
        if (firstName) await user.type(firstNameTextBox, firstName);

        const lastNameTextBox = container.querySelector('[name="lastName"]');
        await user.clear(lastNameTextBox);
        if (lastName) await user.type(lastNameTextBox, lastName);

        const ghinTextBox = container.querySelector('[name="GHIN"]');
        await user.clear(ghinTextBox);
        if (GHIN) await user.type(ghinTextBox, GHIN);

        const submitButton = container.querySelector('[name="submit"]');

        expect(submitButton.disabled).toEqual(disabled);
    });

    describe("Tee Preference Selection Box", () => {
        it("Renders select box", () => {
            const { container } = render(<Players {...props} />);

            const teePreferenceSelectionBox = container.querySelector('[name="teePreferenceSelectionBox"]');

            expect(teePreferenceSelectionBox).toBeInTheDocument();
        });

        it("Selection box is populated with tees on page load", () => {
            props.golf.teams = [];
            const { container } = render(<Players {...props} />);

            const teePreferenceSelectionBox = container.querySelector('[name="teePreferenceSelectionBox"]');
            const options = teePreferenceSelectionBox.querySelectorAll("option");

            expect(options.length).toEqual(4);

            expect(options[0].value).toEqual("Blue");
            expect(options[0].textContent).toEqual("Blue");

            expect(options[1].value).toEqual("White");
            expect(options[1].textContent).toEqual("White");

            expect(options[2].value).toEqual("Gold");
            expect(options[2].textContent).toEqual("Gold");

            expect(options[3].value).toEqual("Red");
            expect(options[3].textContent).toEqual("Red");
        });
    });

    describe("Player Dropdown Reset", () => {
        it("Resets dropdown to 'Add new player' after updating a player", async () => {
            const user = userEvent.setup();
            const { container } = render(<Players {...props} />);

            // Select a player from the dropdown
            const playersDropdown = container.querySelector('[name="players"]');
            const player = props.golf.players[0];
            await user.selectOptions(playersDropdown, player.id.toString());

            // Verify the dropdown shows the selected player
            expect(playersDropdown.value).toEqual(player.id.toString());

            // Verify form is populated with player data
            const firstNameTextBox = container.querySelector('[name="firstName"]');
            expect(firstNameTextBox.value).toEqual(player.firstName);

            // Make a change to the first name
            await user.clear(firstNameTextBox);
            await user.type(firstNameTextBox, "UpdatedName");

            // Submit the update
            const submitButton = container.querySelector('[name="submit"]');
            await user.click(submitButton);

            // Verify the dropdown has reset to "Add new player" (-1)
            expect(playersDropdown.value).toEqual("-1");

            // Verify form fields are cleared
            expect(firstNameTextBox.value).toEqual("");
            const lastNameTextBox = container.querySelector('[name="lastName"]');
            expect(lastNameTextBox.value).toEqual("");
            const ghinTextBox = container.querySelector('[name="GHIN"]');
            expect(ghinTextBox.value).toEqual("");
        });

        it("Resets dropdown to 'Add new player' after adding a new player", async () => {
            const user = userEvent.setup();
            const firstName = "NewPlayer";
            const lastName = "TestName";
            const GHIN = "999999";

            const { container } = render(<Players {...props} />);

            // Verify dropdown starts at "Add new player"
            const playersDropdown = container.querySelector('[name="players"]');
            expect(playersDropdown.value).toEqual("-1");

            // Fill in new player details
            const firstNameTextBox = container.querySelector('[name="firstName"]');
            await user.type(firstNameTextBox, firstName);

            const lastNameTextBox = container.querySelector('[name="lastName"]');
            await user.type(lastNameTextBox, lastName);

            const ghinTextBox = container.querySelector('[name="GHIN"]');
            await user.type(ghinTextBox, GHIN);

            // Submit the new player
            const submitButton = container.querySelector('[name="submit"]');
            await user.click(submitButton);

            // Verify the dropdown remains at "Add new player" (-1)
            expect(playersDropdown.value).toEqual("-1");

            // Verify form fields are cleared
            expect(firstNameTextBox.value).toEqual("");
            expect(lastNameTextBox.value).toEqual("");
            expect(ghinTextBox.value).toEqual("");
        });
    });
});
