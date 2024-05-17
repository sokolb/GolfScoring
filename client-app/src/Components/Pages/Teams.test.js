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
                        divisionId: 1,
                    },
                    {
                        teamNumber: 2,
                        teamMemberIds: [3, 4],
                        divisionId: 2,
                    },
                    {
                        teamNumber: 3,
                        teamMemberIds: [1, 4],
                        divisionId: -1,
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

        expect(allTeams.length).toEqual(3);
    });

    describe("Player Selection Box", () => {
        it("Renders select box", () => {
            const wrapper = shallow(<Teams {...props} />);

            const playerSelectionBox1 = wrapper.find({ name: "playersSelectionBox1" });
            const playerSelectionBox2 = wrapper.find({ name: "playersSelectionBox2" });

            expect(playerSelectionBox1.length).toEqual(1);
            expect(playerSelectionBox2.length).toEqual(1);
        });

        test.each([["playersSelectionBox1"], ["playersSelectionBox2"]])("Selection box %s is populated with players on page load", (playBoxName) => {
            props.golf.teams = [];
            const wrapper = shallow(<Teams {...props} />);

            const playerSelectionBox = wrapper.find({ name: playBoxName });

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
        var teamMemberId1 = props.golf.players[0].id;
        var teamMemberId2 = props.golf.players[2].id;
        var teamMembers = [
            { playerId: teamMemberId1, APlayer: true },
            { playerId: teamMemberId2, APlayer: false },
        ];
        var divisionId = 4;
        var forceAB = false;

        const wrapper = shallow(<Teams {...props} />);

        const playerSelectionBox1 = wrapper.find({
            name: "playersSelectionBox1",
        });
        playerSelectionBox1.simulate("change", createEvent(teamMemberId1));
        const playerSelectionBox2 = wrapper.find({
            name: "playersSelectionBox2",
        });
        playerSelectionBox2.simulate("change", createEvent(teamMemberId2));

        const divisions = wrapper.find({ name: "divisions" });
        divisions.simulate("change", { target: { value: divisionId } });

        // const btnForceAB = wrapper.find({ name: "btnForceAB" });
        // divisions.simulate("change", { target: { value: forceAB } });

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addTeam).toHaveBeenCalledWith(teamNumber, teamMembers, divisionId, forceAB);
    });

    test.each([
        [1, 2, false],
        [-1, -1, true],
        [2, -1, true],
    ])("Submit button disabled/enabled correctly with params: selectedTeamMemberIds %s", (teamMemberId1, teamMemberId2, disabled) => {
        const wrapper = shallow(<Teams {...props} />);

        const playerSelectionBox1 = wrapper.find({
            name: "playersSelectionBox1",
        });
        playerSelectionBox1.simulate("change", createEvent(teamMemberId1));
        const playerSelectionBox2 = wrapper.find({
            name: "playersSelectionBox2",
        });
        playerSelectionBox2.simulate("change", createEvent(teamMemberId2));

        const submitButton = wrapper.find({ name: "submit" });
        expect(submitButton.props().disabled).toEqual(disabled);
    });

    it("Submit button disabled when same player selected", () => {
        const wrapper = shallow(<Teams {...props} />);

        const playerSelectionBox1 = wrapper.find({
            name: "playersSelectionBox1",
        });
        playerSelectionBox1.simulate("change", createEvent(1));
        const playerSelectionBox2 = wrapper.find({
            name: "playersSelectionBox2",
        });
        playerSelectionBox2.simulate("change", createEvent(1));

        const submitButton = wrapper.find({ name: "submit" });
        expect(submitButton.props().disabled).toEqual(true);
    });

    test.each([
        [[team1, team2], 3],
        [[team1, team3], 2],
        [[team1, team2, team3], 4],
        [[], 1],
    ])("teamNumber should be set to lowest ingeger not used for %o %s", (teams, teamNumber) => {
        props.golf.teams = teams;
        var teamMemberId1 = 6;
        var teamMemberId2 = 7;
        var teamMembers = [
            { playerId: teamMemberId1, APlayer: true },
            { playerId: teamMemberId2, APlayer: false },
        ];
        var divisionId = 2;
        var forceAB = false;

        const wrapper = shallow(<Teams {...props} />);

        const playerSelectionBox1 = wrapper.find({
            name: "playersSelectionBox1",
        });
        playerSelectionBox1.simulate("change", createEvent(teamMemberId1));
        const playerSelectionBox2 = wrapper.find({
            name: "playersSelectionBox2",
        });
        playerSelectionBox2.simulate("change", createEvent(teamMemberId2));

        const divisions = wrapper.find({ name: "divisions" });
        divisions.simulate("change", { target: { value: divisionId } });

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addTeam).toHaveBeenCalledWith(teamNumber, teamMembers, divisionId, forceAB);
    });

    it("Renders showDelete buttom when user is logged in", () => {
        props.golf.loggedInUser = "bobby.t@yahoo.com";
        const wrapper = shallow(<Teams {...props} />);

        const allTeams = wrapper.find(Team);

        allTeams.forEach((team) => {
            expect(team.prop("showDeleteButton")).toEqual(true);
        });
    });

    it("Renders showDelete buttom only for temp team when user is not logged in", () => {
        props.golf.loggedInUser = undefined;
        const wrapper = shallow(<Teams {...props} />);

        const allTeams = wrapper.find(Team);

        allTeams.forEach((team) => {
            var showDeleteButton = team.prop("team").divisionId === -1;
            expect(team.prop("showDeleteButton")).toEqual(showDeleteButton);
        });
    });

    test.each([
        ["logged.in.bobby@gmail.com", divisions.length + 1],
        [undefined, 1],
    ])("Show temp team in division drop down only for non logged in users %s", (loggedInUser, divisionCount) => {
        props.golf.loggedInUser = loggedInUser;

        const wrapper = shallow(<Teams {...props} />);

        var divisions = wrapper.find({ name: "divisions" });

        expect(divisions.props().children.length).toEqual(divisionCount);
    });

    function createEvent(value) {
        var values = [];
        values.push({ value: value });

        return {
            target: {
                selectedOptions: values,
            },
        };
    }
});
