import { shallow } from "enzyme";
import { Matches } from "./Matches";
import Scorecard from "./Scorecard";

var props;

describe("Matches tests", () => {
    beforeEach(() => {
        props = {
            golf: {
                userToken: "abc123",
                teams: [
                    {
                        teamNumber: 1,
                        teamMemberIds: [1, 2],
                        divisionId: 1,
                    },
                    {
                        teamNumber: 2,
                        teamMemberIds: [3, 4],
                        divisionId: 2,
                    },
                ],
                players: [
                    {
                        id: 1,
                        GHIN: 1234,
                        firstName: "Brian",
                        lastName: "Sokoloski",
                        handicap: 11,
                    },
                    {
                        id: 2,
                        GHIN: 4321,
                        firstName: "Bob",
                        lastName: "Smith",
                        handicap: 12,
                    },
                    {
                        id: 3,
                        GHIN: 5567,
                        firstName: "Mary",
                        lastName: "Johnson",
                        handicap: 12,
                    },
                    {
                        id: 4,
                        GHIN: 5568,
                        firstName: "Jane",
                        lastName: "Doe",
                        handicap: 17,
                    },
                ],
                divisions: [
                    { id: 1, name: "mens div 1" },
                    { id: 2, name: "mens div 2" },
                ],
            },
            getTeams: jest.fn(),
            getPlayers: jest.fn(),
        };
    });

    it("Renders add new player boxes", () => {
        const wrapper = shallow(<Matches {...props} />);

        var team1 = wrapper.find({ name: "team1" });
        var team2 = wrapper.find({ name: "team2" });
        var frontBackNine = wrapper.find({ name: "frontBackNine" });
        var createScoreCard = wrapper.find({ name: "createScoreCard" });

        expect(team1.length).toEqual(1);
        expect(team2.length).toEqual(1);
        expect(frontBackNine.length).toEqual(1);
        expect(createScoreCard.length).toEqual(1);
    });

    it("populate teams and players on page load", () => {
        const wrapper = shallow(<Matches {...props} />);

        expect(props.getTeams).toHaveBeenCalled();
        expect(props.getPlayers).toHaveBeenCalled();
    });

    it("renders teams correctly in each team list", () => {
        const wrapper = shallow(<Matches {...props} />);

        var team1 = wrapper.find({ name: "team1" });
        expect(team1.props().children.length).toEqual(3);
        expect(team1.props().children[0].props.children).toEqual("Select a team");
        expect(team1.props().children[0].props.value).toEqual(-1);
        expect(team1.props().children[1].props.children).toEqual("mens div 1: Brian Sokoloski | Bob Smith");
        expect(team1.props().children[1].props.value).toEqual(1);
        expect(team1.props().children[2].props.children).toEqual("mens div 2: Mary Johnson | Jane Doe");
        expect(team1.props().children[2].props.value).toEqual(2);

        var team2 = wrapper.find({ name: "team2" });
        expect(team2.props().children.length).toEqual(3);
        expect(team2.props().children[0].props.children).toEqual("Select a team");
        expect(team2.props().children[0].props.value).toEqual(-1);
        expect(team2.props().children[1].props.children).toEqual("mens div 1: Brian Sokoloski | Bob Smith");
        expect(team2.props().children[1].props.value).toEqual(1);
        expect(team2.props().children[2].props.children).toEqual("mens div 2: Mary Johnson | Jane Doe");
        expect(team2.props().children[2].props.value).toEqual(2);
    });

    test.each([
        [-1, 1, "Please select 2 teams"],
        [1, -1, "Please select 2 teams"],
        [1, 2, ""],
    ])("Submit button validates selected players, team1 %s, team2 %s, errorMessage %s", (team1, team2, errorMessage) => {
        const wrapper = shallow(<Matches {...props} />);

        var team1SelectBox = wrapper.find({ name: "team1" });
        team1SelectBox.simulate("change", { target: { value: team1 } });
        var team2SelectBox = wrapper.find({ name: "team2" });
        team2SelectBox.simulate("change", { target: { value: team2 } });

        var createScoreCardButton = wrapper.find({ name: "createScoreCard" });
        createScoreCardButton.simulate("click");

        var errorMessageLabel = wrapper.find({ name: "errorMessage" });

        expect(errorMessageLabel.prop("children")).toEqual(errorMessage);
    });

    it("error message is shown when same team selected", () => {
        const wrapper = shallow(<Matches {...props} />);

        var team1SelectBox = wrapper.find({ name: "team1" });
        team1SelectBox.simulate("change", { target: { value: 1 } });
        var team2SelectBox = wrapper.find({ name: "team2" });
        team2SelectBox.simulate("change", { target: { value: 1 } });

        var createScoreCardButton = wrapper.find({ name: "createScoreCard" });
        createScoreCardButton.simulate("click");

        var errorMessageLabel = wrapper.find({ name: "errorMessage" });

        expect(errorMessageLabel.prop("children")).toEqual("Please select 2 different teams");
    });

    test.each([
        ["team1", 1],
        ["team2", 1],
        ["frontBackNine", "frontNine"],
    ])("Changing element: %s clears out errorMessage for changeValue: %s", (elementName, changeValue) => {
        const wrapper = shallow(<Matches {...props} />);

        var createScoreCardButton = wrapper.find({ name: "createScoreCard" });
        createScoreCardButton.simulate("click"); //This sets an errorMessage
        var errorMessageLabel = wrapper.find({ name: "errorMessage" });

        expect(errorMessageLabel.prop("children").length).not.toEqual(0);

        var targetElement = wrapper.find({ name: elementName });
        targetElement.simulate("change", { target: { value: changeValue } });

        errorMessageLabel = wrapper.find({ name: "errorMessage" });
        expect(errorMessageLabel.prop("children").length).toEqual(0);
    });

    it("Scorecard is rendered with correct props on button click", () => {
        const wrapper = shallow(<Matches {...props} />);

        var team1SelectBox = wrapper.find({ name: "team1" });
        team1SelectBox.simulate("change", { target: { value: 1 } });
        var team2SelectBox = wrapper.find({ name: "team2" });
        team2SelectBox.simulate("change", { target: { value: 2 } });

        var createScoreCardButton = wrapper.find({ name: "createScoreCard" });
        createScoreCardButton.simulate("click");

        var scorecard = wrapper.find(Scorecard);
        expect(scorecard.props().frontBackNine).toEqual("frontNine");
        expect(scorecard.props().team1Id).toEqual(1);
        expect(scorecard.props().team2Id).toEqual(2);
    });
});
