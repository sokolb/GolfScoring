import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Division } from "./Division";

var props;

describe("Division Tests", () => {
    beforeEach(() => {
        props = {
            division: {
                id: 1,
                name: "mens div 1",
            },
            removeDivision: vi.fn(),
        };
    });

    it("Renders correct components", () => {
        const { container } = render(<Division {...props} />);

        const divisionName = container.querySelector('[name="divisionName"]');

        expect(divisionName).toBeInTheDocument();
    });

    it("Division name renders with correct value", () => {
        const { container } = render(<Division {...props} />);

        const divisionName = container.querySelector('[name="divisionName"]');
        expect(divisionName.textContent).toEqual(props.division.name.toString());
    });

    it("Calls removeDivision with correct id value", async () => {
        const user = userEvent.setup();
        const { container } = render(<Division {...props} />);

        const deleteButton = container.querySelector('[name="delete"]');
        await user.click(deleteButton);

        expect(props.removeDivision).toHaveBeenCalledWith(props.division.id);
    });
});
