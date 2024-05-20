import { shallow } from "enzyme";
import { Players } from "../Pages/Players";
import Player from "./Player";
import { act } from "@testing-library/react";

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
            addOrUpdatePlayer: jest.fn(),
            addOrUpdatePlayerNoAutoGhinUpdate: jest.fn(),
            getPlayers: jest.fn(),
        };
    });

    it("Renders player boxes", () => {
        const wrapper = shallow(<Players {...props} />);

        var ddlPlayers = wrapper.find({ name: "players" });
        var firstName = wrapper.find({ name: "firstName" });
        var lastName = wrapper.find({ name: "lastName" });
        var GHIN = wrapper.find({ name: "GHIN" });
        var submit = wrapper.find({ name: "submit" });
        var refreshAllHandicaps = wrapper.find({ name: "refreshAllHandicaps" });
        var autoUpdateGHIN = wrapper.find({ name: "autoUpdateGHIN" });

        expect(ddlPlayers.length).toEqual(1);
        expect(firstName.length).toEqual(1);
        expect(lastName.length).toEqual(1);
        expect(GHIN.length).toEqual(1);
        expect(submit.length).toEqual(1);
        expect(refreshAllHandicaps.length).toEqual(1);
        expect(autoUpdateGHIN.length).toEqual(1);
    });

    it("Players drop down is populated on load", () => {
        const wrapper = shallow(<Players {...props} />);

        var ddlPlayers = wrapper.find({ name: "players" });
        expect(ddlPlayers.props().children.length).toEqual(3);
        expect(ddlPlayers.props().children[0].props.children).toEqual("Add new player");
        expect(ddlPlayers.props().children[0].props.value).toEqual(-1);
        expect(ddlPlayers.props().children[1].props.children).toEqual(props.golf.players[0].firstName + " " + props.golf.players[0].lastName);
        expect(ddlPlayers.props().children[1].props.value).toEqual(props.golf.players[0].id);
        expect(ddlPlayers.props().children[2].props.children).toEqual(props.golf.players[1].firstName + " " + props.golf.players[1].lastName);
        expect(ddlPlayers.props().children[2].props.value).toEqual(props.golf.players[1].id);
    });

    // it("Player data is populated when player is selected", () => {
    //     const wrapper = shallow(<Players {...props} />);

    //     var ddlPlayers = wrapper.find({ name: "players" });
    //     ddlPlayers.simulate("change", { target: { value: props.golf.players[0].id } });

    //     var firstName = wrapper.find({ name: "firstName" });
    //     expect(firstName.text()).toEqual(props.golf.players[0].firstName);
    // });

    it("Hides add new player boxes when user is not logged in", () => {
        props.golf.loggedInUser = undefined;
        const wrapper = shallow(<Players {...props} />);

        var addPlayer = wrapper.find({ name: "addPlayer" });

        expect(addPlayer.length).toEqual(0);
    });

    it("Submit click calls addOrUpdatePlayer with autoUpdate", () => {
        var firstName = "brian";
        var lastName = "Johnson";
        var GHIN = "110492312";
        var teePreference = "Gold";
        var autoUpdate = true;

        const wrapper = shallow(<Players {...props} />);

        const firstNameTextBox = wrapper.find({ name: "firstName" });
        firstNameTextBox.simulate("change", createEvent(firstName));
        const lastNameTextBox = wrapper.find({ name: "lastName" });
        lastNameTextBox.simulate("change", createEvent(lastName));
        const GHINtextBox = wrapper.find({ name: "GHIN" });
        GHINtextBox.simulate("change", createEvent(GHIN));

        const teePreferenceSelectionBox = wrapper.find({
            name: "teePreferenceSelectionBox",
        });
        teePreferenceSelectionBox.simulate("change", createEvent(teePreference));

        const autoUpdateGhin = wrapper.find({ name: "autoUpdateGHIN" });
        autoUpdateGhin.simulate("change", { target: { checked: autoUpdate } });

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(-1, firstName, lastName, GHIN, teePreference, autoUpdate, props.golf.userToken);
    });

    // it("Submit click calls addOrUpdatePlayer with update existing player", () => {
    //     var playerId = props.golf.players[0].id;
    //     var firstName = props.golf.players[0].firstName;
    //     var lastName = props.golf.players[0].lastName;
    //     var GHIN = props.golf.players[0].GHIN;
    //     var teePreference = props.golf.players[0].teePreference;
    //     var autoUpdate = props.golf.players[0].autoUpdate;

    //     const wrapper = shallow(<Players {...props} />);

    //     var ddlPlayers = wrapper.find({ name: "players" });
    //     ddlPlayers.simulate("change", { target: { value: props.golf.players[0].id } });

    //     expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(playerId, firstName, lastName, GHIN, teePreference, autoUpdate, props.golf.userToken);
    // });

    it("Submit click calls addOrUpdatePlayer without autoUpdate", () => {
        var firstName = "brian";
        var lastName = "Johnson";
        var GHIN = "110492312";
        var teePreference = "Gold";
        var autoUpdate = false;
        var handicap = 19;
        var frontNine = 10;
        var backNine = 9;

        const wrapper = shallow(<Players {...props} />);

        const autoUpdateGhin = wrapper.find({ name: "autoUpdateGHIN" });
        autoUpdateGhin.simulate("change", { target: { checked: autoUpdate } });

        const firstNameTextBox = wrapper.find({ name: "firstName" });
        firstNameTextBox.simulate("change", createEvent(firstName));
        const lastNameTextBox = wrapper.find({ name: "lastName" });
        lastNameTextBox.simulate("change", createEvent(lastName));
        const GHINtextBox = wrapper.find({ name: "GHIN" });
        GHINtextBox.simulate("change", createEvent(GHIN));

        const teePreferenceSelectionBox = wrapper.find({
            name: "teePreferenceSelectionBox",
        });
        teePreferenceSelectionBox.simulate("change", createEvent(teePreference));

        const handicapTextBox = wrapper.find({ name: "handicap" });
        handicapTextBox.simulate("change", createEvent(handicap));
        const frontNineTextBox = wrapper.find({ name: "frontNine" });
        frontNineTextBox.simulate("change", createEvent(frontNine));
        const backNineTextBox = wrapper.find({ name: "backNine" });
        backNineTextBox.simulate("change", createEvent(backNine));

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addOrUpdatePlayerNoAutoGhinUpdate).toHaveBeenCalledWith(-1, firstName, lastName, GHIN, teePreference, autoUpdate, handicap, frontNine, backNine);
    });

    it("refreshAllHandicaps click calls addOrUpdatePlayer per player", () => {
        var player1 = props.golf.players[0];
        var player2 = props.golf.players[1];
        const wrapper = shallow(<Players {...props} />);

        const refreshAllHandicaps = wrapper.find({ name: "refreshAllHandicaps" });
        refreshAllHandicaps.simulate("click");

        expect(props.addOrUpdatePlayer).toHaveBeenCalledTimes(2);
        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(player1.id, player1.firstName, player1.lastName, player1.GHIN, player1.teePreference, true, props.golf.userToken);
        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(player2.id, player2.firstName, player2.lastName, player2.GHIN, player2.teePreference, true, props.golf.userToken);
    });

    it("refreshAllHandicaps click calls addOrUpdatePlayer for players with autoUpdate on", () => {
        var player1 = props.golf.players[0];
        player1.autoUpdateGHIN = false;
        var player2 = props.golf.players[1];
        const wrapper = shallow(<Players {...props} />);

        const refreshAllHandicaps = wrapper.find({ name: "refreshAllHandicaps" });
        refreshAllHandicaps.simulate("click");

        expect(props.addOrUpdatePlayer).toHaveBeenCalledTimes(1);
        expect(props.addOrUpdatePlayer).toHaveBeenCalledWith(player2.id, player2.firstName, player2.lastName, player2.GHIN, player2.teePreference, true, props.golf.userToken);
    });

    // test.each([[true], [false]])("Correctly show handicap boxes when autoUpdateGHIN is %s", (autoUpdate) => {
    //     const wrapper = shallow(<Players {...props} />);

    //     const autoUpdateGhin = wrapper.find({ name: "autoUpdateGHIN" });
    //     autoUpdateGhin.simulate("change", { target: { checked: autoUpdate } });

    //     const handicapTextBox = wrapper.find({ name: "handicap" });
    //     const frontNineTextBox = wrapper.find({ name: "frontNine" });
    //     const backNineTextBox = wrapper.find({ name: "backNine" });

    //     expect(handicapTextBox.length).toEqual(autoUpdate ? 0 : 1);
    //     expect(frontNineTextBox.length).toEqual(autoUpdate ? 0 : 1);
    //     expect(backNineTextBox.length).toEqual(autoUpdate ? 0 : 1);
    // });

    function createEvent(value) {
        return {
            target: { value },
        };
    }

    it("Calls GetPlayers on when rendered", () => {
        const wrapper = shallow(<Players {...props} />);

        expect(props.getPlayers).toHaveBeenCalled();
    });

    it("Renders correct number of players", () => {
        const wrapper = shallow(<Players {...props} />);

        const allPlayers = wrapper.find(Player);

        expect(allPlayers.length).toEqual(2);
    });

    test.each([
        ["bobby.t@yahoo.com", true],
        [undefined, false],
    ])("Renders players with correct delete button on user logged in: %s", (user, showDeleteButton) => {
        props.golf.loggedInUser = user;
        const wrapper = shallow(<Players {...props} />);

        const allPlayers = wrapper.find(Player);

        allPlayers.forEach((player) => {
            expect(player.prop("showDeleteButton")).toEqual(showDeleteButton);
        });
    });

    it("Renders error message when it is present", () => {
        props.golf.errorMessage = "Player not found";
        const wrapper = shallow(<Players {...props} />);

        const errorLabel = wrapper.find({ name: "lblError" });

        expect(errorLabel.length).toEqual(1);
    });

    it("Does not render error message when it is empty", () => {
        props.golf.errorMessage = "";
        const wrapper = shallow(<Players {...props} />);

        const errorLabel = wrapper.find({ name: "lblError" });

        expect(errorLabel.length).toEqual(0);
    });

    test.each([
        ["Brian", "Sokoloski", "12345", false],
        ["Brian", "Sokoloski", "", true],
        ["Brian", "", "12346", true],
        ["", "Sokoloski", "12347", true],
    ])("Submit button disabled/enabled correctly with params: firstName %s lastName %s GHIN %i", (firstName, lastName, GHIN, disabled) => {
        const wrapper = shallow(<Players {...props} />);

        const firstNameTextBox = wrapper.find({ name: "firstName" });
        firstNameTextBox.simulate("change", { target: { value: firstName } });
        const lastNameTextBox = wrapper.find({ name: "lastName" });
        lastNameTextBox.simulate("change", { target: { value: lastName } });
        const ghinTextBox = wrapper.find({ name: "GHIN" });
        ghinTextBox.simulate("change", { target: { value: GHIN } });
        const submitButton = wrapper.find({ name: "submit" });

        expect(submitButton.props().disabled).toEqual(disabled);
    });

    describe("Tee Preference Selection Box", () => {
        it("Renders select box", () => {
            const wrapper = shallow(<Players {...props} />);

            const teePreferenceSelectionBox = wrapper.find({ name: "teePreferenceSelectionBox" });

            expect(teePreferenceSelectionBox.length).toEqual(1);
        });

        it("Selection box is populated with players on page load", () => {
            props.golf.teams = [];
            const wrapper = shallow(<Players {...props} />);

            const playerSelectionBox = wrapper.find({ name: "teePreferenceSelectionBox" });

            expect(playerSelectionBox.props().children.length).toEqual(4);

            expect(playerSelectionBox.props().children[0].key).toEqual("Blue");
            expect(playerSelectionBox.props().children[0].props.children).toEqual("Blue");

            expect(playerSelectionBox.props().children[1].key).toEqual("White");
            expect(playerSelectionBox.props().children[1].props.children).toEqual("White");

            expect(playerSelectionBox.props().children[2].key).toEqual("Gold");
            expect(playerSelectionBox.props().children[2].props.children).toEqual("Gold");

            expect(playerSelectionBox.props().children[3].key).toEqual("Red");
            expect(playerSelectionBox.props().children[3].props.children).toEqual("Red");
        });
    });
});
