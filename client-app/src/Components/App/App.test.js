import { shallow } from "enzyme";
import NavBar from "../NavBar/Navbar";
import App from "./App";

describe("App tests", () => {
    it("renders title", () => {
        const wrapper = shallow(<App />);
        const title = wrapper.find({ name: "title" });
        expect(title.length).toEqual(1);
        expect(title.text()).toEqual("Match Play");
    });

    it("renders nav bar", () => {
        const wrapper = shallow(<App />);
        const navBar = wrapper.find(NavBar);
        expect(navBar.length).toEqual(1);
    });
});
