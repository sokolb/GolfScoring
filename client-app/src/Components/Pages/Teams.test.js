import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { Teams } from "./Teams";

// Mock the Team component since it's Redux-connected
vi.mock("./Team", () => ({
    default: ({ team, showDeleteButton }) => (
        <tr data-testid="team-row" data-team-id={team.id} data-division-id={team.divisionId} data-show-delete={showDeleteButton}>
            <td>Team {team.teamNumber}</td>
        </tr>
    ),
}));

var props;

var team1 = {
    id: 1,
    teamNumber: 1,
    teamMembers: [
        { playerId: 1, APlayer: true },
        { playerId: 2, APlayer: false },
    ],
};

var team2 = {
    id: 2,
    teamNumber: 2,
    teamMembers: [
        { playerId: 3, APlayer: true },
        { playerId: 4, APlayer: false },
    ],
};

var team3 = {
    id: 3,
    teamNumber: 3,
    teamMembers: [
        { playerId: 1, APlayer: true },
        { playerId: 4, APlayer: false },
    ],
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
                        id: 101,
                        teamNumber: 1,
                        teamMembers: [
                            { playerId: 1, APlayer: true },
                            { playerId: 2, APlayer: false },
                        ],
                        divisionId: 1,
                    },
                    {
                        id: 102,
                        teamNumber: 2,
                        teamMembers: [
                            { playerId: 3, APlayer: true },
                            { playerId: 4, APlayer: false },
                        ],
                        divisionId: 2,
                    },
                    {
                        id: 103,
                        teamNumber: 3,
                        teamMembers: [
                            { playerId: 1, APlayer: true },
                            { playerId: 4, APlayer: false },
                        ],
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
            addTeam: vi.fn(),
            getTeams: vi.fn(),
            getPlayers: vi.fn(),
            getDivisions: vi.fn(),
        };
    });

    it("Calls GetTeams, GetPlayers and GetDivisions when rendered", () => {
        render(<Teams {...props} />);

        expect(props.getTeams).toHaveBeenCalled();
        expect(props.getPlayers).toHaveBeenCalled();
        expect(props.getDivisions).toHaveBeenCalled();
    });

    it("Renders divisions drop down correctly", () => {
        const { container } = render(<Teams {...props} />);

        const divisions = container.querySelector('[name="divisions"]');
        const options = divisions.querySelectorAll("option");

        expect(divisions).toBeInTheDocument();
        expect(options.length).toEqual(3);
        expect(options[0].value).toEqual("-1");
        expect(options[0].textContent).toEqual("Temporary Team");
        expect(options[1].value).toEqual(props.golf.divisions[0].id.toString());
        expect(options[1].textContent).toEqual(props.golf.divisions[0].name);
        expect(options[2].value).toEqual(props.golf.divisions[1].id.toString());
        expect(options[2].textContent).toEqual(props.golf.divisions[1].name);
    });

    it("Renders correct number of teams", () => {
        const { container } = render(<Teams {...props} />);

        const allTeams = container.querySelectorAll('[data-testid="team-row"]');

        expect(allTeams.length).toEqual(3);
    });

    it("Renders table headers correctly", () => {
        const { container } = render(<Teams {...props} />);

        const table = container.querySelector("table");
        const headers = table.querySelectorAll("thead th, tbody > tr:first-child th");

        expect(headers.length).toEqual(4);
        expect(headers[0].textContent).toEqual("Team Number");
        expect(headers[1].textContent).toEqual("Division");
        expect(headers[2].textContent).toEqual("Team Members");
        expect(headers[3].textContent).toEqual("");
    });

    describe("Player Selection Box", () => {
        it("Renders select box", () => {
            const { container } = render(<Teams {...props} />);

            const playerSelectionBox1 = container.querySelector('[name="playersSelectionBox1"]');
            const playerSelectionBox2 = container.querySelector('[name="playersSelectionBox2"]');

            expect(playerSelectionBox1).toBeInTheDocument();
            expect(playerSelectionBox2).toBeInTheDocument();
        });

        test.each([["playersSelectionBox1"], ["playersSelectionBox2"]])("Selection box %s is populated with players on page load", (playBoxName) => {
            props.golf.teams = [];
            const { container } = render(<Teams {...props} />);

            const playerSelectionBox = container.querySelector(`[name="${playBoxName}"]`);
            const options = playerSelectionBox.querySelectorAll("option");

            expect(options.length).toEqual(3);

            expect(options[0].value).toEqual("2");
            expect(options[0].textContent).toEqual("Bob Smith");

            expect(options[1].value).toEqual("1");
            expect(options[1].textContent).toEqual("Brian Sokoloski");

            expect(options[2].value).toEqual("3");
            expect(options[2].textContent).toEqual("Mary Johnson");
        });
    });

    it("Submit buttons calls addTeam with correct parameters", async () => {
        const user = userEvent.setup();
        props.golf.teams = [];
        const teamNumber = 1;
        const teamMemberId1 = props.golf.players[0].id;
        const teamMemberId2 = props.golf.players[2].id;
        const teamMembers = [
            { playerId: teamMemberId1, APlayer: true },
            { playerId: teamMemberId2, APlayer: false },
        ];
        const divisionId = 1;
        const forceAB = false;

        const { container } = render(<Teams {...props} />);

        const playerSelectionBox1 = container.querySelector('[name="playersSelectionBox1"]');
        await user.selectOptions(playerSelectionBox1, [teamMemberId1.toString()]);

        const playerSelectionBox2 = container.querySelector('[name="playersSelectionBox2"]');
        await user.selectOptions(playerSelectionBox2, [teamMemberId2.toString()]);

        const divisionsSelect = container.querySelector('[name="divisions"]');
        await user.selectOptions(divisionsSelect, divisionId.toString());

        const submitButton = container.querySelector('[name="submit"]');
        await user.click(submitButton);

        expect(props.addTeam).toHaveBeenCalledWith(teamNumber, teamMembers, divisionId.toString(), forceAB);
    });

    test.each([[true], [false]])("Submit buttons calls addTeam with correct parameters for forceAB", async (forceAB) => {
        const user = userEvent.setup();
        props.golf.teams = [];
        const teamNumber = 1;
        const teamMemberId1 = props.golf.players[0].id;
        const teamMemberId2 = props.golf.players[2].id;
        const teamMembers = [
            { playerId: teamMemberId1, APlayer: true },
            { playerId: teamMemberId2, APlayer: false },
        ];
        const divisionId = 1;

        const { container } = render(<Teams {...props} />);

        const playerSelectionBox1 = container.querySelector('[name="playersSelectionBox1"]');
        await user.selectOptions(playerSelectionBox1, [teamMemberId1.toString()]);

        const playerSelectionBox2 = container.querySelector('[name="playersSelectionBox2"]');
        await user.selectOptions(playerSelectionBox2, [teamMemberId2.toString()]);

        const divisionsSelect = container.querySelector('[name="divisions"]');
        await user.selectOptions(divisionsSelect, divisionId.toString());

        const chkForceAB = container.querySelector('[name="chkForceAB"]');
        if (forceAB) {
            await user.click(chkForceAB);
        }

        const submitButton = container.querySelector('[name="submit"]');
        await user.click(submitButton);

        expect(props.addTeam).toHaveBeenCalledWith(teamNumber, teamMembers, divisionId.toString(), forceAB);
    });

    test.each([
        [1, 2, false],
        [-1, -1, true],
        [2, -1, true],
    ])("Submit button disabled/enabled correctly with params: selectedTeamMembers %s", async (teamMemberId1, teamMemberId2, disabled) => {
        const user = userEvent.setup();
        const { container } = render(<Teams {...props} />);

        if (teamMemberId1 !== -1) {
            const playerSelectionBox1 = container.querySelector('[name="playersSelectionBox1"]');
            await user.selectOptions(playerSelectionBox1, [teamMemberId1.toString()]);
        }

        if (teamMemberId2 !== -1) {
            const playerSelectionBox2 = container.querySelector('[name="playersSelectionBox2"]');
            await user.selectOptions(playerSelectionBox2, [teamMemberId2.toString()]);
        }

        const submitButton = container.querySelector('[name="submit"]');
        expect(submitButton.disabled).toEqual(disabled);
    });

    it("Submit button disabled when same player selected", async () => {
        const user = userEvent.setup();
        const { container } = render(<Teams {...props} />);

        const playerSelectionBox1 = container.querySelector('[name="playersSelectionBox1"]');
        await user.selectOptions(playerSelectionBox1, ["1"]);

        const playerSelectionBox2 = container.querySelector('[name="playersSelectionBox2"]');
        await user.selectOptions(playerSelectionBox2, ["1"]);

        const submitButton = container.querySelector('[name="submit"]');
        expect(submitButton.disabled).toEqual(true);
    });

    test.each([
        [[team1, team2], 3],
        [[team1, team3], 2],
        [[team1, team2, team3], 4],
        [[], 1],
    ])("teamNumber should be set to lowest ingeger not used for %o %s", async (teams, teamNumber) => {
        const user = userEvent.setup();
        props.golf.teams = teams;
        const teamMemberId1 = props.golf.players[0].id; // Use valid player ID
        const teamMemberId2 = props.golf.players[1].id; // Use valid player ID
        const teamMembers = [
            { playerId: teamMemberId1, APlayer: true },
            { playerId: teamMemberId2, APlayer: false },
        ];
        const divisionId = 2;
        const forceAB = false;

        const { container } = render(<Teams {...props} />);

        const playerSelectionBox1 = container.querySelector('[name="playersSelectionBox1"]');
        await user.selectOptions(playerSelectionBox1, [teamMemberId1.toString()]);

        const playerSelectionBox2 = container.querySelector('[name="playersSelectionBox2"]');
        await user.selectOptions(playerSelectionBox2, [teamMemberId2.toString()]);

        const divisionsSelect = container.querySelector('[name="divisions"]');
        await user.selectOptions(divisionsSelect, divisionId.toString());

        const submitButton = container.querySelector('[name="submit"]');
        await user.click(submitButton);

        expect(props.addTeam).toHaveBeenCalledWith(teamNumber, teamMembers, divisionId.toString(), forceAB);
    });

    it("Renders showDelete buttom when user is logged in", () => {
        props.golf.loggedInUser = "bobby.t@yahoo.com";
        const { container } = render(<Teams {...props} />);

        const allTeams = container.querySelectorAll('[data-testid="team-row"]');

        allTeams.forEach((team) => {
            expect(team.getAttribute("data-show-delete")).toEqual("true");
        });
    });

    it("Renders showDelete buttom only for temp team when user is not logged in", () => {
        props.golf.loggedInUser = undefined;
        const { container } = render(<Teams {...props} />);

        const allTeams = container.querySelectorAll('[data-testid="team-row"]');

        allTeams.forEach((team) => {
            const divisionId = parseInt(team.getAttribute("data-division-id"));
            const showDeleteButton = divisionId === -1;
            expect(team.getAttribute("data-show-delete")).toEqual(showDeleteButton.toString());
        });
    });

    test.each([
        ["logged.in.bobby@gmail.com", divisions.length + 1],
        [undefined, 1],
    ])("Show temp team in division drop down only for non logged in users %s", (loggedInUser, divisionCount) => {
        props.golf.loggedInUser = loggedInUser;

        const { container } = render(<Teams {...props} />);

        const divisionsSelect = container.querySelector('[name="divisions"]');
        const options = divisionsSelect.querySelectorAll("option");

        expect(options.length).toEqual(divisionCount);
    });

    test.each([
        ["logged.in.bobby@gmail.com", 1],
        [undefined, 0],
    ])("Show forceAB for logged in users %s", (loggedInUser, length) => {
        props.golf.loggedInUser = loggedInUser;

        const { container } = render(<Teams {...props} />);

        const chkForceAB = container.querySelectorAll('[name="chkForceAB"]');
        const lblForceAB = container.querySelectorAll('[name="lblForceAB"]');

        expect(chkForceAB.length).toEqual(length);
        expect(lblForceAB.length).toEqual(length);
    });
});
