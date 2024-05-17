import { shallow } from "enzyme";
import { Team } from "../Pages/Team";

var props;

describe("Team Tests", () => {
    beforeEach(() => {
        props = {
            team: {
                teamNumber: 1,
                teamMembers: [
                    { playerId: "3b1823f4-b36c-4288-1111-ed0b00bc6653", APlayer: true },
                    { playerId: "0c6b559a-ae1b-44d1-2222-d7f3f8b9e44a", APlayer: false },
                ],
                divisionId: 3,
            },
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
            divisions: [
                {
                    id: 3,
                    name: "div 3 test",
                },
            ],
            showDeleteButton: true,
            removeTeam: jest.fn(),
            getDivisions: jest.fn(),
        };
    });

    it("Calls GetTeams and GetPlayers when rendered", () => {
        const wrapper = shallow(<Team {...props} />);

        expect(props.getDivisions).toHaveBeenCalled();
    });

    it("Renders correct components", () => {
        const wrapper = shallow(<Team {...props} />);

        const division = wrapper.find({ name: "division" });
        const teamMembers = wrapper.find({ name: "teamMembers" });
        const deleteButton = wrapper.find({ name: "delete" });

        expect(division.length).toEqual(1);
        expect(teamMembers.length).toEqual(1);
        expect(deleteButton.length).toEqual(1);
    });

    it("Division renders with correct value", () => {
        var wrapper = shallow(<Team {...props} />);

        const division = wrapper.find({ name: "division" });
        expect(division.text()).toEqual(props.divisions.find((d) => d.id === props.team.divisionId).name);
    });

    it("Temp Division renders with correct value", () => {
        props.team.divisionId = -1;
        var wrapper = shallow(<Team {...props} />);

        const division = wrapper.find({ name: "division" });
        expect(division.text()).toEqual("Temporary Team");
    });

    it("Team members rendered correctly", () => {
        var wrapper = shallow(<Team {...props} />);

        const teamMembers = wrapper.find({ name: "teamMembers" });
        expect(teamMembers.text()).toEqual("Brian Sokoloski | Bob Smith");
    });

    it("Calls removeTeam with correct id value", () => {
        const wrapper = shallow(<Team {...props} />);

        const deleteButton = wrapper.find({ name: "delete" });
        deleteButton.simulate("click");

        expect(props.removeTeam).toHaveBeenCalledWith(props.team.id);
    });

    it("Hides delete button when showDeleteButton is false", () => {
        props.showDeleteButton = false;
        const wrapper = shallow(<Team {...props} />);

        var btnDelete = wrapper.find({ name: "delete" });

        expect(btnDelete.length).toEqual(0);
    });
});
