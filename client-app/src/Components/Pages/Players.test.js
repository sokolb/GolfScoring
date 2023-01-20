import { shallow } from "enzyme";
import { Players } from "../Pages/Players";
import Player from "./Player";

var props;

describe("Players Tests", () => {
    beforeEach(() => {
        props = {
            golf: {
                userToken: "abc123",
                players: [
                    { GHIN: "11221", firstName: "Bob", lastName: "Smith", handicap: 2 },
                    {
                        GHIN: "243332",
                        firstName: "Sally",
                        lastName: "Jones",
                        handicap: 3,
                    },
                ],
            },
            addPlayer: jest.fn(),
            getPlayers: jest.fn(),
        };
    });

    it("Renders add new player boxes", () => {
        const wrapper = shallow(<Players {...props} />);

        var firstName = wrapper.find({ name: "firstName" });
        var lastName = wrapper.find({ name: "lastName" });
        var GHIN = wrapper.find({ name: "GHIN" });
        var submit = wrapper.find({ name: "submit" });

        expect(firstName.length).toEqual(1);
        expect(lastName.length).toEqual(1);
        expect(GHIN.length).toEqual(1);
        expect(submit.length).toEqual(1);
    });

    it("Submit click calls addPlayer", () => {
        var firstName = "brian";
        var lastName = "Johnson";
        var GHIN = "110492312";
        var teePreference = "Gold";

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

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addPlayer).toHaveBeenCalledWith(firstName, lastName, GHIN, teePreference, props.golf.userToken);
    });

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

    it("Submit button is disabled when player with GHIN already exists", () => {
        const wrapper = shallow(<Players {...props} />);

        const firstNameTextBox = wrapper.find({ name: "firstName" });
        firstNameTextBox.simulate("change", { target: { value: "Brian" } });
        const lastNameTextBox = wrapper.find({ name: "lastName" });
        lastNameTextBox.simulate("change", { target: { value: "Sok" } });
        const ghinTextBox = wrapper.find({ name: "GHIN" });
        ghinTextBox.simulate("change", {
            target: { value: props.golf.players[0].GHIN },
        });
        const submitButton = wrapper.find({ name: "submit" });

        expect(submitButton.props().disabled).toEqual(true);
    });

    describe("Player Selection Box", () => {
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
