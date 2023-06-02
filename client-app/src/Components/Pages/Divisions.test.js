import { shallow } from "enzyme";
import { Divisions } from "./Divisions";
import Division from "./Division";

var props;

var division1 = {
    id: 1,
    name: "mens Div",
};

var division2 = {
    id: 2,
    name: "womens div",
};

describe("Divisions Tests", () => {
    beforeEach(() => {
        props = {
            golf: {
                userToken: "abc123",
                divisions: [division1, division2],
                loggedInUser: "stacy@hotmail.com",
            },
            addDivision: jest.fn(),
            getDivisions: jest.fn(),
        };
    });

    it("Renders correct components", () => {
        const wrapper = shallow(<Divisions {...props} />);

        const nameTextBox = wrapper.find({ name: "name" });
        const submitButton = wrapper.find({ name: "submit" });
        const divisionsTable = wrapper.find({ name: "divisions" });

        expect(nameTextBox.length).toEqual(1);
        expect(submitButton.length).toEqual(1);
        expect(divisionsTable.length).toEqual(1);
    });

    it("Calls GetDivisions when rendered", () => {
        const wrapper = shallow(<Divisions {...props} />);

        expect(props.getDivisions).toHaveBeenCalled();
    });

    it("Renders correct number of divisions", () => {
        const wrapper = shallow(<Divisions {...props} />);

        const allDivisions = wrapper.find(Division);

        expect(allDivisions.length).toEqual(2);
    });

    it("Submit buttons calls addDivision with correct parameters", () => {
        props.golf.divisions = [];
        var name = "test div name here";

        const wrapper = shallow(<Divisions {...props} />);

        const nameTextBox = wrapper.find({ name: "name" });
        nameTextBox.simulate("change", createEvent(name));

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addDivision).toHaveBeenCalledWith(name);
    });

    test.each([
        [["Division Name here"], false],
        ["", true],
    ])("Submit button disabled/enabled correctly with params: name %s", (name, disabled) => {
        const wrapper = shallow(<Divisions {...props} />);

        const nameTextBox = wrapper.find({ name: "name" });
        nameTextBox.simulate("change", createEvent(name));

        const submitButton = wrapper.find({ name: "submit" });
        expect(submitButton.props().disabled).toEqual(disabled);
    });

    function createEvent(value) {
        return {
            target: { value },
        };
    }
});
