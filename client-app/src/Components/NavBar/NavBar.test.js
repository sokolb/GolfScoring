import { shallow } from "enzyme";
import { NavBar } from "./Navbar";

var props;

describe("NavBar Tests", () => {
    beforeEach(() => {
        props = {
            golf: {},
            setCurrentPage: jest.fn(),
        };
    });

    it("Renders Players button", () => {
        const wrapper = shallow(<NavBar {...props} />);
        const btnPlayer = wrapper.find({ name: "btnPlayers" });
        expect(btnPlayer.length).toBe(1);
        expect(btnPlayer.text()).toEqual("Players");
    });

    it("Players button click calls setCurrentPage", () => {
        var pageName = "Players";

        const wrapper = shallow(<NavBar {...props} />);
        const btnPlayer = wrapper.find({ name: "btnPlayers" });

        btnPlayer.simulate("click");

        expect(props.setCurrentPage).toHaveBeenCalledWith(pageName);
    });
});
