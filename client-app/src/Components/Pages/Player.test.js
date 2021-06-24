import { shallow } from "enzyme";
import { Player } from "../Pages/Player";

var props;

describe("Player Tests", () => {
    beforeEach(() => {
        props = {
            player: {
                GHIN: 1234,
                firstName: "Test name",
                lastName: "Test last name",
                handicap: 11,
            },
        };
    });

    it("Renders correct components", () => {
        const wrapper = shallow(<Player {...props} />);

        const firstName = wrapper.find({ name: "firstName" });
        const lastName = wrapper.find({ name: "lastName" });
        const GHIN = wrapper.find({ name: "GHIN" });
        const handicap = wrapper.find({ name: "handicap" });

        expect(firstName.length).toEqual(1);
        expect(lastName.length).toEqual(1);
        expect(GHIN.length).toEqual(1);
        expect(handicap.length).toEqual(1);
    });

    it("Renders values from props", () => {
        const wrapper = shallow(<Player {...props} />);

        const firstName = wrapper.find({ name: "firstName" });
        const lastName = wrapper.find({ name: "lastName" });
        const GHIN = wrapper.find({ name: "GHIN" });
        const handicap = wrapper.find({ name: "handicap" });

        expect(firstName.text()).toEqual(props.player.firstName);
        expect(lastName.text()).toEqual(props.player.lastName);
        expect(GHIN.text()).toEqual(props.player.GHIN.toString());
        expect(handicap.text()).toEqual(props.player.handicap.toString());
    });
});
