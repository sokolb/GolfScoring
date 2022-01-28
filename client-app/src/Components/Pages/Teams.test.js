import { shallow } from "enzyme";
import { Teams } from "./Teams";
import Team from "./Team";

var props;

var team1 = {
    id: 1,
    teamNumber: 1,
    teamMemberIds: [1, 2],
};

var team2 = {
    id: 2,
    teamNumber: 2,
    teamMemberIds: [3, 4],
};

var team3 = {
    id: 3,
    teamNumber: 3,
    teamMemberIds: [1, 4],
};

describe("Teams Tests", () => {
    beforeEach(() => {
        props = {
            golf: {
                userToken: "abc123",
                teams: [
                    {
                        teamNumber: 1,
                        teamMemberIds: [1, 2],
                    },
                    {
                        teamNumber: 2,
                        teamMemberIds: [3, 4],
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
                ],
            },
            addTeam: jest.fn(),
            getTeams: jest.fn(),
        };
    });

    it("Calls GetTeams when rendered", () => {
        const wrapper = shallow(<Teams {...props} />);

        expect(props.getTeams).toHaveBeenCalled();
    });

    it("Renders correct number of teams", () => {
        const wrapper = shallow(<Teams {...props} />);

        const allTeams = wrapper.find(Team);

        expect(allTeams.length).toEqual(2);
    });

    describe("Player Selection Box", () => {
        it("Renders select box", () => {
            const wrapper = shallow(<Teams {...props} />);

            const playerSelectionBox = wrapper.find({ name: "playersSelectionBox" });

            expect(playerSelectionBox.length).toEqual(1);
            expect(playerSelectionBox.props().multiple).toBe(true);
        });

        it("Selection box is populated with players on page load", () => {
            props.golf.teams = [];
            const wrapper = shallow(<Teams {...props} />);

            const playerSelectionBox = wrapper.find({ name: "playersSelectionBox" });

            expect(playerSelectionBox.props().children.length).toEqual(3);

            expect(playerSelectionBox.props().children[0].key).toEqual("1");
            expect(playerSelectionBox.props().children[0].props.children).toEqual("Brian Sokoloski");

            expect(playerSelectionBox.props().children[1].key).toEqual("2");
            expect(playerSelectionBox.props().children[1].props.children).toEqual("Bob Smith");

            expect(playerSelectionBox.props().children[2].key).toEqual("3");
            expect(playerSelectionBox.props().children[2].props.children).toEqual("Mary Johnson");
        });

        it("Selection box only renders players that are not on a team", () => {
            props.golf.teams = [
                {
                    teamNumber: 1,
                    teamMemberIds: [1, 2],
                },
            ];
            const wrapper = shallow(<Teams {...props} />);

            const playerSelectionBox = wrapper.find({ name: "playersSelectionBox" });

            expect(playerSelectionBox.props().children.length).toEqual(1);
            expect(playerSelectionBox.props().children[0].props.children).toEqual("Mary Johnson");
        });
    });

    it("Submit buttons calls addTeam with correct parameters", () => {
        props.golf.teams = [];
        var teamNumber = 1;
        var teamMemberIds = [props.golf.players[0].id, props.golf.players[2].id];

        const wrapper = shallow(<Teams {...props} />);

        const playerSelectionBox = wrapper.find({
            name: "playersSelectionBox",
        });
        playerSelectionBox.simulate("change", createEvent(teamMemberIds));

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addTeam).toHaveBeenCalledWith(teamNumber, teamMemberIds);
    });

    test.each([
        [["3b1823f4-b36c-4288-1111-ed0b00bc6653", "0c6b559a-ae1b-44d1-2222-d7f3f8b9e44a"], false],
        [[], true],
        [["3b1823f4-b36c-4288-1111-ed0b00bc6653"], true],
    ])("Submit button disabled/enabled correctly with params: selectedTeamMemberIds %s", (teamMemberIds, disabled) => {
        const wrapper = shallow(<Teams {...props} />);

        const playerSelectionBox = wrapper.find({
            name: "playersSelectionBox",
        });
        playerSelectionBox.simulate("change", createEvent(teamMemberIds));

        const submitButton = wrapper.find({ name: "submit" });
        expect(submitButton.props().disabled).toEqual(disabled);
    });

    test.each([
        [[team1, team2], 3],
        [[team1, team3], 2],
        [[team1, team2, team3], 4],
        [[], 1],
    ])("teamNumber should be set to lowest ingeger not used for %o %s", (teams, teamNumber) => {
        props.golf.teams = teams;
        var teamMemberIds = [6, 7];

        const wrapper = shallow(<Teams {...props} />);

        const playerSelectionBox = wrapper.find({
            name: "playersSelectionBox",
        });
        playerSelectionBox.simulate("change", createEvent(teamMemberIds));

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addTeam).toHaveBeenCalledWith(teamNumber, teamMemberIds);
    });

    function createEvent(value) {
        var values = [];
        for (var v in value) {
            values.push({ value: value[v] });
        }

        return {
            target: {
                selectedOptions: values,
            },
        };
    }
});
