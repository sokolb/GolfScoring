import { shallow } from "enzyme";
import Login from "../Login/Login";
import NavBar from "../NavBar/Navbar";
import Matches from "../Pages/Matches";
import Players from "../Pages/Players";
import Teams from "../Pages/Teams";
import { App } from "./App";
import Divisions from "../Pages/Divisions";

var props;

describe("App tests", () => {
    beforeEach(() => {
        props = {
            golf: {
                loggedInUser: "brian.sokoloski@gmail.com",
                currentPage: "Matches",
            },
        };
    });

    it("renders correct components", () => {
        const wrapper = shallow(<App {...props} />);

        const navBar = wrapper.find(NavBar);
        expect(navBar.length).toEqual(1);
        const loggedinUser = wrapper.find({ name: "loggedInUser" });
        expect(loggedinUser.length).toEqual(1);
    });

    it("display logged in user", () => {
        const wrapper = shallow(<App {...props} />);

        const loggedinUser = wrapper.find({ name: "loggedInUser" });
        expect(loggedinUser.text()).toEqual("Logged in user: " + props.golf.loggedInUser);
    });

    test.each([
        ["Players", Players],
        ["Teams", Teams],
        ["Matches", Matches],
        ["Login", Login],
        ["Divisions", Divisions]
    ])("Displays %s component when store is set to that page", (pageName, pageObject) => {
        props.golf.currentPage = pageName;
        const wrapper = shallow(<App {...props} />);

        const playersComponent = wrapper.find(pageObject);

        expect(playersComponent.length).toEqual(1);
    });
});
