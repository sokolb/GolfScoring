import { describe, it, expect, beforeEach, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavBar } from "./Navbar";

vi.mock("../../../package.json", () => ({
    default: { version: "2.1.0" },
    version: "2.1.0",
}));

var props;

describe("NavBar Tests", () => {
    beforeEach(() => {
        props = {
            golf: { loggedInUser: "test@test.com" },
            setCurrentPage: vi.fn(),
            setLoggedInUser: vi.fn(),
        };
    });

    it("Renders correct buttons for logged in user", () => {
        props.golf.loggedInUser = "test@test.com";
        render(<NavBar {...props} />);

        expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /players/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /teams/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /divisions/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /matches/i })).toBeInTheDocument();
    });

    it("Renders correct buttons for NO logged in user", () => {
        props.golf.loggedInUser = undefined;
        render(<NavBar {...props} />);

        expect(screen.getByRole("button", { name: /^login$/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /players/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /teams/i })).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /divisions/i })).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: /matches/i })).toBeInTheDocument();
    });

    test.each([
        ["Players", "Players", "brian@test.com"],
        ["Teams", "Teams", "brian@test.com"],
        ["Divisions", "Divisions", "brian@test.com"],
        ["Matches", "Matches", "brian@test.com"],
        ["Login", "Login", undefined],
    ])("Button %s calls setCurrentPage with correct pageName %s", async (buttonText, pageName, loggedInUser) => {
        props.golf.loggedInUser = loggedInUser;
        const user = userEvent.setup();
        render(<NavBar {...props} />);

        const button = screen.getByRole("button", { name: new RegExp(buttonText, "i") });
        await user.click(button);

        expect(props.setCurrentPage).toHaveBeenCalledWith(pageName);
    });

    it("Show Logout button when user is logged in", () => {
        props.golf.loggedInUser = "bob.smith@gmail.com";
        render(<NavBar {...props} />);

        expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    });

    it("Logout clicked will clear logged in user and user token", async () => {
        props.golf.loggedInUser = "bob.smith@gmail.com";
        const user = userEvent.setup();
        render(<NavBar {...props} />);

        const btnLogin = screen.getByRole("button", { name: /logout/i });
        await user.click(btnLogin);

        expect(props.setLoggedInUser).toHaveBeenCalledWith(undefined, undefined);
    });

    it("displays the correct version", () => {
        render(<NavBar {...props} />);

        expect(screen.getByText("v2.1.0")).toBeInTheDocument();
    });
});
