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

    it("Renders values from props", () => {
        const wrapper = shallow(<Team {...props} />);

        const teamNumber = wrapper.find({ name: "teamNumber" });
        const teamMembers = wrapper.find({ name: "teamMembers" });

        expect(teamNumber.text()).toEqual(props.team.teamNumber.toString());
        expect(teamMembers.text()).toEqual(props.team.teamMemberIds[0] + " | " + props.team.teamMemberIds[1]);
    });

    it("Calls removeTeam with correct id value", () => {
        const wrapper = shallow(<Team {...props} />);

        const deleteButton = wrapper.find({ name: "delete" });
        deleteButton.simulate("click");

        expect(props.removeTeam).toHaveBeenCalledWith(props.team.id);
    });
});
