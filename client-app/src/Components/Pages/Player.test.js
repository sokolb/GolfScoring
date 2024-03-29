import { shallow } from "enzyme";
import { Player } from "../Pages/Player";

var props;

describe("Player Tests", () => {
    beforeEach(() => {
        props = {
            player: {
                id: "1111",
                GHIN: 1234,
                firstName: "Test name",
                lastName: "Test last name",
                teePreference: "White",
                handicap: 11.2,
                frontNine: 5,
                backNine: 6,
            },
            showDeleteButton: true,
            removePlayer: jest.fn(),
        };
    });

    it("Renders correct components", () => {
        const wrapper = shallow(<Player {...props} />);

        const firstName = wrapper.find({ name: "firstName" });
        const lastName = wrapper.find({ name: "lastName" });
        const GHIN = wrapper.find({ name: "GHIN" });
        const handicapIndex = wrapper.find({ name: "handicapIndex" });
        const teePreference = wrapper.find({ name: "teePreference" });
        const frontNine = wrapper.find({ name: "frontNine" });
        const backNine = wrapper.find({ name: "backNine" });
        const deleteButton = wrapper.find({ name: "delete" });

        expect(firstName.length).toEqual(1);
        expect(lastName.length).toEqual(1);
        expect(GHIN.length).toEqual(1);
        expect(handicapIndex.length).toEqual(1);
        expect(teePreference.length).toEqual(1);
        expect(frontNine.length).toEqual(1);
        expect(backNine.length).toEqual(1);
        expect(deleteButton.length).toEqual(1);
    });

    it("Renders values from props", () => {
        const wrapper = shallow(<Player {...props} />);

        const firstName = wrapper.find({ name: "firstName" });
        const lastName = wrapper.find({ name: "lastName" });
        const GHIN = wrapper.find({ name: "GHIN" });
        const handicapIndex = wrapper.find({ name: "handicapIndex" });
        const teePreference = wrapper.find({ name: "teePreference" });
        const frontNine = wrapper.find({ name: "frontNine" });
        const backNine = wrapper.find({ name: "backNine" });

        expect(firstName.text()).toEqual(props.player.firstName);
        expect(lastName.text()).toEqual(props.player.lastName);
        expect(GHIN.text()).toEqual(props.player.GHIN.toString());
        expect(handicapIndex.text()).toEqual(props.player.handicap.toString());
        expect(teePreference.text()).toEqual(props.player.teePreference.toString());
        expect(frontNine.text()).toEqual(props.player.frontNine.toString());
        expect(backNine.text()).toEqual(props.player.backNine.toString());
    });

    it("Calls removePlayer with correct id value", () => {
        const wrapper = shallow(<Player {...props} />);

        const deleteButton = wrapper.find({ name: "delete" });
        deleteButton.simulate("click");

        expect(props.removePlayer).toHaveBeenCalledWith(props.player.id);
    });

    it("Hides delete button when showDeleteButton is false", () => {
        props.showDeleteButton = false;
        const wrapper = shallow(<Player {...props} />);

        var btnDelete = wrapper.find({ name: "delete" });

        expect(btnDelete.length).toEqual(0);
    });
});
