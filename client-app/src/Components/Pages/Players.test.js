import { shallow } from "enzyme";
import { Players } from "../Pages/Players";

var props;

describe("Players Tests", () => {
    beforeEach(() => {
        props = {
            golf: { userToken: "abc123" },
            addPlayer: jest.fn(),
            getPlayers: jest.fn(),
        };
    });

    it("Renders add new player boxes", () => {
        const wrapper = shallow(<Players {...props} />);

        var firstName = wrapper.find({ name: "firstName" });
        var lastName = wrapper.find({ name: "lastName" });
        var GHIN = wrapper.find({ name: "GHIN" });
        var submit = wrapper.find({ name: "submit" });

        expect(firstName.length).toEqual(1);
        expect(lastName.length).toEqual(1);
        expect(GHIN.length).toEqual(1);
        expect(submit.length).toEqual(1);
    });

    it("Submit click calls addPlayer", () => {
        var firstName = "brian";
        var lastName = "Johnson";
        var GHIN = "110492312";

        const wrapper = shallow(<Players {...props} />);

        const firstNameTextBox = wrapper.find({ name: "firstName" });
        firstNameTextBox.simulate("change", createEvent(firstName));
        const lastNameTextBox = wrapper.find({ name: "lastName" });
        lastNameTextBox.simulate("change", createEvent(lastName));
        const GHINtextBox = wrapper.find({ name: "GHIN" });
        GHINtextBox.simulate("change", createEvent(GHIN));

        const submitButton = wrapper.find({ name: "submit" });
        submitButton.simulate("click");

        expect(props.addPlayer).toHaveBeenCalledWith(firstName, lastName, GHIN, props.golf.userToken);
    });

    function createEvent(value) {
        return {
            target: { value },
        };
    }

    it("Calls GetPlayers on when rendered", () => {
        const wrapper = shallow(<Players {...props} />);

        expect(props.getPlayers).toHaveBeenCalled();
    });
});
