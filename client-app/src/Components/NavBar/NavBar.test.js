import { shallow } from "enzyme";
import { NavBar } from "./Navbar";

var props;

describe("NavBar Tests", () => {
    beforeEach(() => {
        props = {
            golf: { loggedInUser: "test@test.com" },
            setCurrentPage: jest.fn(),
            setLoggedInUser: jest.fn(),
        };
    });

    it("Renders correct buttons for logged in user", () => {
        props.golf.loggedInUser = "test@test.com";
        const wrapper = shallow(<NavBar {...props} />);

        const btnLogin = wrapper.find({ name: "btnLogin" });
        expect(btnLogin.length).toBe(1);
        expect(btnLogin.text()).toEqual("Logout");

        const btnPlayer = wrapper.find({ name: "btnPlayers" });
        expect(btnPlayer.length).toBe(1);
        expect(btnPlayer.text()).toEqual("Players");

        const btnTeams = wrapper.find({ name: "btnTeams" });
        expect(btnTeams.length).toBe(1);
        expect(btnTeams.text()).toEqual("Teams");

        const btnDivisions = wrapper.find({ name: "btnDivisions" });
        expect(btnDivisions.length).toBe(1);
        expect(btnDivisions.text()).toEqual("Divisions");

        const btnMatches = wrapper.find({ name: "btnMatches" });
        expect(btnMatches.length).toBe(1);
        expect(btnMatches.text()).toEqual("Matches");
    });

    it("Renders correct buttons for NO logged in user", () => {
        props.golf.loggedInUser = undefined;
        const wrapper = shallow(<NavBar {...props} />);

        const btnLogin = wrapper.find({ name: "btnLogin" });
        expect(btnLogin.length).toBe(1);
        expect(btnLogin.text()).toEqual("Login");

        const btnPlayer = wrapper.find({ name: "btnPlayers" });
        expect(btnPlayer.length).toBe(1);
        expect(btnPlayer.text()).toEqual("Players");

        const btnTeams = wrapper.find({ name: "btnTeams" });
        expect(btnTeams.length).toBe(0);

        const btnDivisions = wrapper.find({ name: "btnDivisions" });
        expect(btnDivisions.length).toBe(0);

        const btnMatches = wrapper.find({ name: "btnMatches" });
        expect(btnMatches.length).toBe(1);
        expect(btnMatches.text()).toEqual("Matches");
    });

    test.each([
        ["btnPlayers", "Players", "brian@test.com"],
        ["btnTeams", "Teams", "brian@test.com"],
        ["btnDivisions", "Divisions", "brian@test.com"],
        ["btnMatches", "Matches", "brian@test.com"],
        ["btnLogin", "Login", undefined],
    ])("Button %s calls setCurrentPage with correct pageName %s", (buttonName, pageName, loggedInUser) => {
        props.golf.loggedInUser = loggedInUser;
        const wrapper = shallow(<NavBar {...props} />);
        const button = wrapper.find({ name: buttonName });

        button.simulate("click");

        expect(props.setCurrentPage).toHaveBeenCalledWith(pageName);
    });

    it("Show Logout button when user is logged in", () => {
        props.golf.loggedInUser = "bob.smith@gmail.com";
        const wrapper = shallow(<NavBar {...props} />);

        const btnLogin = wrapper.find({ name: "btnLogin" });

        expect(btnLogin.text()).toEqual("Logout");
    });

    it("Logout clicked will clear logged in user and user token", () => {
        props.golf.loggedInUser = "bob.smith@gmail.com";
        const wrapper = shallow(<NavBar {...props} />);

        const btnLogin = wrapper.find({ name: "btnLogin" });
        btnLogin.simulate("click");

        expect(props.setLoggedInUser).toHaveBeenCalledWith(undefined, undefined);
    });
});
