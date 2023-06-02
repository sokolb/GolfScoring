import { shallow } from "enzyme";
import { Division } from "./Division";

var props;

describe("Division Tests", () => {
    beforeEach(() => {
        props = {
            division: {
                name: "mens div 1",
            },
            removeDivision: jest.fn(),
        };
    });

    it("Renders correct components", () => {
        const wrapper = shallow(<Division {...props} />);

        const divisionName = wrapper.find({ name: "divisionName" });

        expect(divisionName.length).toEqual(1);
    });

    it("Division name renders with correct value", () => {
        const wrapper = shallow(<Division {...props} />);

        const divisionName = wrapper.find({ name: "divisionName" });
        expect(divisionName.text()).toEqual(props.division.name.toString());
    });

    it("Calls removeDivision with correct id value", () => {
        const wrapper = shallow(<Division {...props} />);

        const deleteButton = wrapper.find({ name: "delete" });
        deleteButton.simulate("click");

        expect(props.removeDivision).toHaveBeenCalledWith(props.division.id);
    });
});
