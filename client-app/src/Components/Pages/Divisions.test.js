import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { Divisions } from "./Divisions";
import { Division } from "./Division";

// Mock the Division component to avoid Redux store issues
vi.mock("./Division", () => ({
    default: ({ division }) => (
        <tr data-testid={`division-${division.id}`}>
            <td>{division.name}</td>
        </tr>
    ),
}));

var props;

var division1 = {
    id: 1,
    name: "mens Div",
};

var division2 = {
    id: 2,
    name: "womens div",
};

describe("Divisions Tests", () => {
    beforeEach(() => {
        props = {
            golf: {
                userToken: "abc123",
                divisions: [division1, division2],
                loggedInUser: "stacy@hotmail.com",
            },
            addDivision: vi.fn(),
            getDivisions: vi.fn(),
        };
    });

    it("Renders correct components", () => {
        const { container } = render(<Divisions {...props} />);

        const nameTextBox = container.querySelector('[name="name"]');
        const submitButton = container.querySelector('[name="submit"]');
        const divisionsTable = container.querySelector('[name="divisions"]');

        expect(nameTextBox).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(divisionsTable).toBeInTheDocument();
    });

    it("Calls GetDivisions when rendered", () => {
        render(<Divisions {...props} />);

        expect(props.getDivisions).toHaveBeenCalled();
    });

    it("Renders correct number of divisions", () => {
        const { getAllByTestId } = render(<Divisions {...props} />);

        const allDivisions = getAllByTestId(/division-/);

        expect(allDivisions.length).toEqual(2);
    });

    it("Submit buttons calls addDivision with correct parameters", async () => {
        const user = userEvent.setup();
        props.golf.divisions = [];
        var name = "test div name here";

        const { container } = render(<Divisions {...props} />);

        const nameTextBox = container.querySelector('[name="name"]');
        await user.type(nameTextBox, name);

        const submitButton = container.querySelector('[name="submit"]');
        await user.click(submitButton);

        expect(props.addDivision).toHaveBeenCalledWith(name);
    });

    test.each([
        ["Division Name here", false],
        ["", true],
    ])("Submit button disabled/enabled correctly with params: name %s", async (name, disabled) => {
        const user = userEvent.setup();
        const { container } = render(<Divisions {...props} />);

        const nameTextBox = container.querySelector('[name="name"]');
        if (name) {
            await user.type(nameTextBox, name);
        }

        const submitButton = container.querySelector('[name="submit"]');
        expect(submitButton.disabled).toEqual(disabled);
    });
});
