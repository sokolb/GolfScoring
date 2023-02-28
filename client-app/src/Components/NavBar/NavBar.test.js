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

    it("Renders correct buttons", () => {
        const wrapper = shallow(<NavBar {...props} />);

        const btnPlayer = wrapper.find({ name: "btnPlayers" });
        expect(btnPlayer.length).toBe(1);
        expect(btnPlayer.text()).toEqual("Players");

        const btnTeams = wrapper.find({ name: "btnTeams" });
        expect(btnTeams.length).toBe(1);
        expect(btnTeams.text()).toEqual("Teams");

        const btnMatches = wrapper.find({ name: "btnMatches" });
        expect(btnMatches.length).toBe(1);
        expect(btnMatches.text()).toEqual("Matches");
    });

    test.each([
        ["btnPlayers", "Players"],
        ["btnTeams", "Teams"],
        ["btnMatches", "Matches"]
    ])("Button %s calls setCurrentPage with correct pageName %s", (buttonName, pageName) => {
        const wrapper = shallow(<NavBar {...props} />);
        const button = wrapper.find({ name: buttonName });

        button.simulate("click");

        expect(props.setCurrentPage).toHaveBeenCalledWith(pageName);
    });
});
