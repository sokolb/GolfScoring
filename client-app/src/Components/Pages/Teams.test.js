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
                        teamMemberIds: ["3b1823f4-1111-4288-a827-ed0b00bc6653", "0c6b559a-2222-44d1-9c8b-d7f3f8b9e44a"],
                    },
                    {
                        teamNumber: 2,
                        teamMemberIds: ["3b1823f4-3333-4288-a827-ed0b00bc6653", "0c6b559a-4444-44d1-9c8b-d7f3f8b9e44a"],
                    },
                ],
            },
            // addPlayer: jest.fn(),
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
});
