import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Login } from "./Login";

var props;

describe("Login Tests", () => {
    beforeEach(() => {
        props = {
            golf: {},
            logInUser: vi.fn(),
        };
    });

    it("renders correct components", () => {
        const { container } = render(<Login {...props} />);

        const userName = container.querySelector('[name="userName"]');
        expect(userName).toBeInTheDocument();
        const password = container.querySelector('[name="password"]');
        expect(password).toBeInTheDocument();
        const logInButton = container.querySelector('[name="btnSubmit"]');
        expect(logInButton).toBeInTheDocument();
    });

    it("submit button calls setLoggedInUser action", async () => {
        const user = userEvent.setup();
        var userName = "b@b.com";
        var pwd = "abc123";
        const { container } = render(<Login {...props} />);

        const userNameTextBox = container.querySelector('[name="userName"]');
        await user.type(userNameTextBox, userName);

        const pwdTextBox = container.querySelector('[name="password"]');
        await user.type(pwdTextBox, pwd);

        const logInButton = container.querySelector('[name="btnSubmit"]');
        await user.click(logInButton);

        expect(props.logInUser).toHaveBeenCalledWith(userName, pwd);
    });
});
