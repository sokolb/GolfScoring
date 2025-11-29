import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Team } from "../Pages/Team";

var props;

describe("Team Tests", () => {
    beforeEach(() => {
        props = {
            team: {
                teamNumber: 1,
                teamMembers: [
                    { playerId: "3b1823f4-b36c-4288-1111-ed0b00bc6653", APlayer: true },
                    { playerId: "0c6b559a-ae1b-44d1-2222-d7f3f8b9e44a", APlayer: false },
                ],
                divisionId: 3,
            },
            players: [
                {
                    id: "3b1823f4-b36c-4288-1111-ed0b00bc6653",
                    GHIN: 1234,
                    firstName: "Brian",
                    lastName: "Sokoloski",
                    handicap: 11,
                },
                {
                    id: "0c6b559a-ae1b-44d1-2222-d7f3f8b9e44a",
                    GHIN: 4321,
                    firstName: "Bob",
                    lastName: "Smith",
                    handicap: 12,
                },
                {
                    id: "0c6b559a-ae1b-44d1-2222-d7f3f8b1111",
                    GHIN: 5567,
                    firstName: "Mary",
                    lastName: "Johnson",
                    handicap: 12,
                },
            ],
            divisions: [
                {
                    id: 3,
                    name: "div 3 test",
                },
            ],
            showDeleteButton: true,
            removeTeam: vi.fn(),
            getDivisions: vi.fn(),
        };
    });

    it("Calls GetTeams and GetPlayers when rendered", () => {
        render(<Team {...props} />);

        expect(props.getDivisions).toHaveBeenCalled();
    });

    it("Renders correct components", () => {
        const { container } = render(<Team {...props} />);

        const division = container.querySelector('[name="division"]');
        const teamMembers = container.querySelector('[name="teamMembers"]');
        const deleteButton = container.querySelector('[name="delete"]');

        expect(division).toBeInTheDocument();
        expect(teamMembers).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    it("Division renders with correct value", () => {
        const { container } = render(<Team {...props} />);

        const division = container.querySelector('[name="division"]');
        expect(division.textContent).toEqual(props.divisions.find((d) => d.id === props.team.divisionId).name);
    });

    it("Temp Division renders with correct value", () => {
        props.team.divisionId = -1;
        const { container } = render(<Team {...props} />);

        const division = container.querySelector('[name="division"]');
        expect(division.textContent).toEqual("Temporary Team");
    });

    it("Team members rendered correctly", () => {
        const { container } = render(<Team {...props} />);

        const teamMembers = container.querySelector('[name="teamMembers"]');
        expect(teamMembers.textContent).toEqual("Brian Sokoloski | Bob Smith");
    });

    it("Calls removeTeam with correct id value", async () => {
        const user = userEvent.setup();
        const { container } = render(<Team {...props} />);

        const deleteButton = container.querySelector('[name="delete"]');
        await user.click(deleteButton);

        expect(props.removeTeam).toHaveBeenCalledWith(props.team.id);
    });

    it("Hides delete button when showDeleteButton is false", () => {
        props.showDeleteButton = false;
        const { container } = render(<Team {...props} />);

        const btnDelete = container.querySelector('[name="delete"]');

        expect(btnDelete).not.toBeInTheDocument();
    });
});
