import { shallow } from "enzyme";
import NavBar from "./Navbar";

describe("NavBar Tests", () => {
    it("Renders Players button", () => {
        const wrapper = shallow(<NavBar />);
        const btnPlayer = wrapper.find({ name: "btnPlayers" });
        expect(btnPlayer.length).toBe(1);
    });
});
