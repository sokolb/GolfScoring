import { shallow } from "enzyme";
import { Login } from "./Login";

var props;

describe("Login Tests", () => {
    beforeEach(() => {
        props = {
            golf: {},
            logInUser: jest.fn(),
        };
    });

    it("renders correct components", () => {
        const wrapper = shallow(<Login />);

        const userName = wrapper.find({ name: "userName" });
        expect(userName.length).toEqual(1);
        const password = wrapper.find({ name: "password" });
        expect(password.length).toEqual(1);
        const logInButton = wrapper.find({ name: "btnSubmit" });
        expect(logInButton.length).toEqual(1);
    });

    it("submit button calls setLoggedInUser action", () => {
        var userName = "b@b.com";
        var pwd = "abc123";
        const wrapper = shallow(<Login {...props} />);

        const userNameTextBox = wrapper.find({ name: "userName" });

        userNameTextBox.simulate("change", createEvent(userName));

        const pwdTextBox = wrapper.find({ name: "password" });
        pwdTextBox.simulate("change", createEvent(pwd));

        const logInButton = wrapper.find({ name: "btnSubmit" });
        logInButton.simulate("click");

        expect(props.logInUser).toHaveBeenCalledWith(userName, pwd);
    });

    function createEvent(value) {
        return {
            target: { value },
        };
    }
});
