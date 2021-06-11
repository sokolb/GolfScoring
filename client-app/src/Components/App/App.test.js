import { shallow } from "enzyme";
import Login from "../Login/Login";
import NavBar from "../NavBar/Navbar";
import App from "./App";

var props;

describe("App tests", () => {
    beforeEach(() => {
        props = {
            loggedInUser: "brian.sokoloski@gmail.com",
        };
    });

    it("renders correct components when no one is logged in", () => {
        props.loggedInUser = null;
        const wrapper = shallow(<App {...props} />);

        const loginComponent = wrapper.find(Login);
        expect(loginComponent.length).toEqual(1);
        const navBar = wrapper.find(NavBar);
        expect(navBar.length).toEqual(0);
        const loggedinUser = wrapper.find({ name: "loggedInUser" });
        expect(loggedinUser.length).toEqual(0);
    });

    it("renders correct components when user is logged in", () => {
        const wrapper = shallow(<App {...props} />);

        const loginComponent = wrapper.find(Login);
        expect(loginComponent.length).toEqual(0);
        const navBar = wrapper.find(NavBar);
        expect(navBar.length).toEqual(1);
        const loggedinUser = wrapper.find({ name: "loggedInUser" });
        expect(loggedinUser.length).toEqual(1);
    });

    it("display logged in user", () => {
        const wrapper = shallow(<App {...props} />);

        const loggedinUser = wrapper.find({ name: "loggedInUser" });
        expect(loggedinUser.text()).toEqual("Logged in user: " + props.loggedInUser);
    });
});
