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

var divisions = [
    { id: 1, name: "mens div 1" },
    { id: 2, name: "mens div 2" },
];

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
                divisions: divisions,
                loggedInUser: "stacy@hotmail.com",
            },
            addTeam: jest.fn(),
            getTeams: jest.fn(),
            getPlayers: jest.fn(),
        };
    });

    it("Calls GetTeams and GetPlayers when rendered", () => {
        const wrapper = shallow(<Teams {...props} />);

        expect(props.getTeams).toHaveBeenCalled();
        expect(props.getPlayers).toHaveBeenCalled();
    });

    it("Renders divisions drop down correctly", () => {
        const wrapper = shallow(<Teams {...props} />);

        var divisions = wrapper.find({ name: "divisions" });

        expect(divisions.length).toEqual(1);
        expect(divisions.props().children.length).toEqual(3);
        expect(divisions.props().children[0].props.value).toEqual("-1");
        expect(divisions.props().children[0].props.children).toEqual("Temporary Team");
        expect(divisions.props().children[1].props.value).toEqual(props.golf.divisions[0].id);
        expect(divisions.props().children[1].props.children).toEqual(props.golf.divisions[0].name);
        expect(divisions.props().children[2].props.value).toEqual(props.golf.divisions[1].id);
        expect(divisions.props().children[2].props.children).toEqual(props.golf.divisions[1].name);
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

            expect(playerSelectionBox.props().children[0].key).toEqual("2");
            expect(playerSelectionBox.props().children[0].props.children).toEqual("Bob Smith");

            expect(playerSelectionBox.props().children[1].key).toEqual("1");
            expect(playerSelectionBox.props().children[1].props.children).toEqual("Brian Sokoloski");

            expect(playerSelectionBox.props().children[2].key).toEqual("3");
            expect(playerSelectionBox.props().children[2].props.children).toEqual("Mary Johnson");
        });
    });

    it("Submit buttons calls addTeam with correct parameters", () => {
        props.golf.teams = [];
        var teamNumber = 1;
        var teamMemberIds = [props.golf.players[0].id, props.golf.players[2].id];
        var divisionId = 4;

        const wrapper = shallow(<Teams {...props} />);

        const playerSelectionBox = wrapper.find({
            name: "playersSelectionBox",
        });
        playerSelectionBox.simulate("change", createEvent(teamMemberIds));

        const divisions = wrapper.find({ name: "divisions" });
        divisions.simulate("change", { target: { value: divisionId } });

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addTeam).toHaveBeenCalledWith(teamNumber, teamMemberIds, divisionId);
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
        var divisionId = 2;

        const wrapper = shallow(<Teams {...props} />);

        const playerSelectionBox = wrapper.find({
            name: "playersSelectionBox",
        });
        playerSelectionBox.simulate("change", createEvent(teamMemberIds));

        const divisions = wrapper.find({ name: "divisions" });
        divisions.simulate("change", { target: { value: divisionId } });

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addTeam).toHaveBeenCalledWith(teamNumber, teamMemberIds, divisionId);
    });

    it("Hides add new player boxes when user is not logged in", () => {
        props.golf.loggedInUser = undefined;
        const wrapper = shallow(<Teams {...props} />);

        var addTeam = wrapper.find({ name: "addTeam" });

        expect(addTeam.length).toEqual(0);
    });

    test.each([
        ["bobby.t@yahoo.com", true],
        [undefined, false],
    ])("Renders teams with correct delete button on user logged in: %s", (user, showDeleteButton) => {
        props.golf.loggedInUser = user;
        const wrapper = shallow(<Teams {...props} />);

        const allTeams = wrapper.find(Team);

        allTeams.forEach((team) => {
            expect(team.prop("showDeleteButton")).toEqual(showDeleteButton);
        });
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
