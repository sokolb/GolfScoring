import { shallow } from "enzyme";
import { Team } from "../Pages/Team";

var props;

describe("Team Tests", () => {
    beforeEach(() => {
        props = {
            team: {
                teamNumber: 1,
                teamMemberIds: ["3b1823f4-b36c-4288-1111-ed0b00bc6653", "0c6b559a-ae1b-44d1-2222-d7f3f8b9e44a"],
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
                ,
                {
                    id: "0c6b559a-ae1b-44d1-2222-d7f3f8b1111",
                    GHIN: 5567,
                    firstName: "Mary",
                    lastName: "Johnson",
                    handicap: 12,
                },
            ],
            removeTeam: jest.fn(),
        };
    });

    it("Renders correct components", () => {
        const wrapper = shallow(<Team {...props} />);

        const teamNumber = wrapper.find({ name: "teamNumber" });
        const teamMembers = wrapper.find({ name: "teamMembers" });
        const deleteButton = wrapper.find({ name: "delete" });

        expect(teamNumber.length).toEqual(1);
        expect(teamMembers.length).toEqual(1);
        expect(deleteButton.length).toEqual(1);
    });

    describe("Renders values from props", () => {
        var wrapper;
        beforeEach(() => {
            wrapper = shallow(<Team {...props} />);
        });

        it("Team number renders with correct value", () => {
            const teamNumber = wrapper.find({ name: "teamNumber" });
            expect(teamNumber.text()).toEqual(props.team.teamNumber.toString());
        });
        it("Team members rendered correctly", () => {
            const teamMembers = wrapper.find({ name: "teamMembers" });
            expect(teamMembers.text()).toEqual("Brian Sokoloski | Bob Smith");
        });
    });

    it("Calls removeTeam with correct id value", () => {
        const wrapper = shallow(<Team {...props} />);

        const deleteButton = wrapper.find({ name: "delete" });
        deleteButton.simulate("click");

        expect(props.removeTeam).toHaveBeenCalledWith(props.team.id);
    });
});
