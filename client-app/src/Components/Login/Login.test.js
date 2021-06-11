import { shallow } from "enzyme";
import { Login } from "./Login";

describe("Login Tests", () => {
    it("renders correct components", () => {
        const wrapper = shallow(<Login />);

        const userName = wrapper.find({ name: "userName" });
        expect(userName.length).toEqual(1);
        const password = wrapper.find({ name: "password" });
        expect(password.length).toEqual(1);
        const logInButton = wrapper.find({ name: "btnSubmit" });
        expect(logInButton.length).toEqual(1);
    });
});
