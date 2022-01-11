import { shallow } from "enzyme";
import { Teams } from "./Teams";
import Team from "./Team";

var props;

describe("Teams Tests", () => {
    beforeEach(() => {
        props = {
            golf: {
                userToken: "abc123",
                teams: [
                    {
                        teamNumber: 1,
                        teamMemberIds: ["3b1823f4-b36c-4288-1111-ed0b00bc6653", "0c6b559a-ae1b-44d1-2222-d7f3f8b9e44a"],
                    },
                    {
                        teamNumber: 2,
                        teamMemberIds: ["3b1823f4-3333-4288-a827-ed0b00bc1111", "0c6b559a-4444-44d1-9c8b-d7f3f8b92222"],
                    },
                ],
                players: [
                    {
                        id: "3b1823f4-b36c-4288-1111-ed0b00bc6653",
                        GHIN: 1234,
                        firstName: "Brian",
                        lastName: "Sokoloski",
                        handicap: 11,
                    },
                    {
                        id: "0c6b559a-ae1b-44d1-2222-d7f3f8b9e44a",
                        GHIN: 4321,
                        firstName: "Bob",
                        lastName: "Smith",
                        handicap: 12,
                    },
                    {
                        id: "0c6b559a-ae1b-44d1-2222-d7f3f8b1111",
                        GHIN: 5567,
                        firstName: "Mary",
                        lastName: "Johnson",
                        handicap: 12,
                    },
                ],
            },
            // addTeam: jest.fn(),
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

            expect(playerSelectionBox.props().children[0].key).toEqual("3b1823f4-b36c-4288-1111-ed0b00bc6653");
            expect(playerSelectionBox.props().children[0].props.children).toEqual("Brian Sokoloski");

            expect(playerSelectionBox.props().children[1].key).toEqual("0c6b559a-ae1b-44d1-2222-d7f3f8b9e44a");
            expect(playerSelectionBox.props().children[1].props.children).toEqual("Bob Smith");

            expect(playerSelectionBox.props().children[2].key).toEqual("0c6b559a-ae1b-44d1-2222-d7f3f8b1111");
            expect(playerSelectionBox.props().children[2].props.children).toEqual("Mary Johnson");
        });

        it("Selection box only renders players that are not on a team", () => {
            props.golf.teams = [
                {
                    teamNumber: 1,
                    teamMemberIds: ["3b1823f4-b36c-4288-1111-ed0b00bc6653", "0c6b559a-ae1b-44d1-2222-d7f3f8b9e44a"],
                },
            ];
            const wrapper = shallow(<Teams {...props} />);

            const playerSelectionBox = wrapper.find({ name: "playersSelectionBox" });

            expect(playerSelectionBox.props().children.length).toEqual(1);
            expect(playerSelectionBox.props().children[0].props.children).toEqual("Mary Johnson");
        });
    });
});
