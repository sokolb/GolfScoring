import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Player } from "./Player";

var props;

describe("Player Tests", () => {
    beforeEach(() => {
        props = {
            player: {
                id: "1111",
                GHIN: 1234,
                firstName: "Test name",
                lastName: "Test last name",
                teePreference: "White",
                handicap: 11.2,
                frontNine: 5,
                backNine: 6,
            },
            showDeleteButton: true,
            removePlayer: vi.fn(),
        };
    });

    it("Renders correct components", () => {
        const { container } = render(
            <table>
                <tbody>
                    <Player {...props} />
                </tbody>
            </table>
        );

        const firstName = container.querySelector('[name="firstName"]');
        const lastName = container.querySelector('[name="lastName"]');
        const GHIN = container.querySelector('[name="GHIN"]');
        const handicapIndex = container.querySelector('[name="handicapIndex"]');
        const teePreference = container.querySelector('[name="teePreference"]');
        const frontNine = container.querySelector('[name="frontNine"]');
        const backNine = container.querySelector('[name="backNine"]');
        const deleteButton = container.querySelector('[name="delete"]');

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(GHIN).toBeInTheDocument();
        expect(handicapIndex).toBeInTheDocument();
        expect(teePreference).toBeInTheDocument();
        expect(frontNine).toBeInTheDocument();
        expect(backNine).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    it("Renders values from props", () => {
        const { container } = render(
            <table>
                <tbody>
                    <Player {...props} />
                </tbody>
            </table>
        );

        const firstName = container.querySelector('[name="firstName"]');
        const lastName = container.querySelector('[name="lastName"]');
        const GHIN = container.querySelector('[name="GHIN"]');
        const handicapIndex = container.querySelector('[name="handicapIndex"]');
        const teePreference = container.querySelector('[name="teePreference"]');
        const frontNine = container.querySelector('[name="frontNine"]');
        const backNine = container.querySelector('[name="backNine"]');

        expect(firstName).toHaveTextContent(props.player.firstName);
        expect(lastName).toHaveTextContent(props.player.lastName);
        expect(GHIN).toHaveTextContent(props.player.GHIN.toString());
        expect(handicapIndex).toHaveTextContent(props.player.handicap.toString());
        expect(teePreference).toHaveTextContent(props.player.teePreference);
        expect(frontNine).toHaveTextContent(props.player.frontNine.toString());
        expect(backNine).toHaveTextContent(props.player.backNine.toString());
    });

    it("Calls removePlayer with correct id value", async () => {
        const user = userEvent.setup();
        const { container } = render(
            <table>
                <tbody>
                    <Player {...props} />
                </tbody>
            </table>
        );

        const deleteButton = container.querySelector('[name="delete"]');
        await user.click(deleteButton);

        expect(props.removePlayer).toHaveBeenCalledWith(props.player.id);
    });

    it("Hides delete button when showDeleteButton is false", () => {
        props.showDeleteButton = false;
        const { container } = render(
            <table>
                <tbody>
                    <Player {...props} />
                </tbody>
            </table>
        );

        const btnDelete = container.querySelector('[name="delete"]');

        expect(btnDelete).not.toBeInTheDocument();
    });
});
