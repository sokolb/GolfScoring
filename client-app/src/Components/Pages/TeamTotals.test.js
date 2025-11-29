import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import TeamTotals from "./TeamTotals";

var props;

describe("TeamTotals tests", () => {
    beforeEach(() => {
        props = {
            player1: {
                id: 1,
                GHIN: 1234,
                firstName: "Brian",
                lastName: "Sokoloski",
                handicap: 18,
                frontNine: 9,
                backNine: 9,
                teePreference: "White",
            },
            player2: {
                id: 2,
                GHIN: 4321,
                firstName: "Bob",
                lastName: "Smith",
                handicap: 1,
                frontNine: 0,
                backNine: 1,
                teePreference: "Blue",
            },
        };
    });

    it("renders team totals with player names", () => {
        const { container } = render(<TeamTotals {...props} />);

        const totalTeamName = container.querySelector('[name="totalTeamName"]');

        const player1NameCombined = props.player1.firstName + " " + props.player1.lastName;
        const player2NameCombined = props.player2.firstName + " " + props.player2.lastName;

        expect(totalTeamName.textContent).toEqual("Team Points: " + player1NameCombined + "/" + player2NameCombined);
    });
});
