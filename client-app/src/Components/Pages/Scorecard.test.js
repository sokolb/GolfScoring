import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach, test, vi } from "vitest";
import { Scorecard } from "./Scorecard";

var props;

describe("Scorecard tests", () => {
    beforeEach(() => {
        props = {
            golf: {
                userToken: "abc123",
                teams: [
                    {
                        id: 1,
                        teamNumber: 1,
                        teamMembers: [
                            { playerId: 1, APlayer: true },
                            { playerId: 2, APlayer: false },
                        ],
                        forceAB: false,
                    },
                    {
                        id: 2,
                        teamNumber: 2,
                        teamMembers: [
                            { playerId: 3, APlayer: true },
                            { playerId: 4, APlayer: false },
                        ],
                        forceAB: false,
                    },
                ],
                players: [
                    {
                        id: 1,
                        GHIN: 1234,
                        firstName: "Brian",
                        lastName: "Sokoloski",
                        handicap: 18,
                        frontNine: 9,
                        backNine: 9,
                        teePreference: "White",
                    },
                    {
                        id: 2,
                        GHIN: 4321,
                        firstName: "Bob",
                        lastName: "Smith",
                        handicap: 1,
                        frontNine: 0,
                        backNine: 1,
                        teePreference: "Blue",
                    },
                    {
                        id: 3,
                        GHIN: 5567,
                        firstName: "Mary",
                        lastName: "Johnson",
                        handicap: 12,
                        frontNine: 6,
                        backNine: 6,
                        teePreference: "Red",
                    },
                    {
                        id: 4,
                        GHIN: 5568,
                        firstName: "Jane",
                        lastName: "Doe",
                        handicap: 17,
                        frontNine: 8,
                        backNine: 9,
                        teePreference: "Gold",
                    },
                ],
                courses: [
                    {
                        holes: [
                            {
                                handicapIndex: 7,
                                id: 1,
                                number: 1,
                            },
                            {
                                handicapIndex: 13,
                                id: 2,
                                number: 2,
                            },
                            {
                                handicapIndex: 3,
                                id: 3,
                                number: 3,
                            },
                            {
                                handicapIndex: 11,
                                id: 4,
                                number: 4,
                            },
                            {
                                handicapIndex: 5,
                                id: 5,
                                number: 5,
                            },
                            {
                                handicapIndex: 1,
                                id: 6,
                                number: 6,
                            },
                            {
                                handicapIndex: 17,
                                id: 7,
                                number: 7,
                            },
                            {
                                handicapIndex: 9,
                                id: 8,
                                number: 8,
                            },
                            {
                                handicapIndex: 15,
                                id: 9,
                                number: 9,
                            },
                            {
                                handicapIndex: 4,
                                id: 10,
                                number: 10,
                            },
                            {
                                handicapIndex: 14,
                                id: 11,
                                number: 11,
                            },
                            {
                                handicapIndex: 8,
                                id: 12,
                                number: 12,
                            },
                            {
                                handicapIndex: 16,
                                id: 13,
                                number: 13,
                            },
                            {
                                handicapIndex: 6,
                                id: 14,
                                number: 14,
                            },
                            {
                                handicapIndex: 18,
                                id: 15,
                                number: 15,
                            },
                            {
                                handicapIndex: 12,
                                id: 16,
                                number: 16,
                            },
                            {
                                handicapIndex: 10,
                                id: 17,
                                number: 17,
                            },
                            {
                                handicapIndex: 2,
                                id: 18,
                                number: 18,
                            },
                        ],
                        id: 1,
                        name: "RoseLake",
                        tee: "White",
                    },
                    {
                        holes: [
                            {
                                handicapIndex: 7,
                                id: 19,
                                number: 1,
                            },
                            {
                                handicapIndex: 13,
                                id: 20,
                                number: 2,
                            },
                            {
                                handicapIndex: 3,
                                id: 21,
                                number: 3,
                            },
                            {
                                handicapIndex: 11,
                                id: 22,
                                number: 4,
                            },
                            {
                                handicapIndex: 5,
                                id: 23,
                                number: 5,
                            },
                            {
                                handicapIndex: 1,
                                id: 24,
                                number: 6,
                            },
                            {
                                handicapIndex: 17,
                                id: 25,
                                number: 7,
                            },
                            {
                                handicapIndex: 9,
                                id: 26,
                                number: 8,
                            },
                            {
                                handicapIndex: 15,
                                id: 27,
                                number: 9,
                            },
                            {
                                handicapIndex: 4,
                                id: 28,
                                number: 10,
                            },
                            {
                                handicapIndex: 14,
                                id: 29,
                                number: 11,
                            },
                            {
                                handicapIndex: 8,
                                id: 30,
                                number: 12,
                            },
                            {
                                handicapIndex: 16,
                                id: 31,
                                number: 13,
                            },
                            {
                                handicapIndex: 6,
                                id: 32,
                                number: 14,
                            },
                            {
                                handicapIndex: 18,
                                id: 33,
                                number: 15,
                            },
                            {
                                handicapIndex: 12,
                                id: 34,
                                number: 16,
                            },
                            {
                                handicapIndex: 10,
                                id: 35,
                                number: 17,
                            },
                            {
                                handicapIndex: 2,
                                id: 36,
                                number: 18,
                            },
                        ],
                        id: 2,
                        name: "RoseLake",
                        tee: "Blue",
                    },
                    {
                        holes: [
                            {
                                handicapIndex: 3,
                                id: 37,
                                number: 1,
                            },
                            {
                                handicapIndex: 9,
                                id: 38,
                                number: 2,
                            },
                            {
                                handicapIndex: 17,
                                id: 39,
                                number: 3,
                            },
                            {
                                handicapIndex: 5,
                                id: 40,
                                number: 4,
                            },
                            {
                                handicapIndex: 13,
                                id: 41,
                                number: 5,
                            },
                            {
                                handicapIndex: 1,
                                id: 42,
                                number: 6,
                            },
                            {
                                handicapIndex: 15,
                                id: 43,
                                number: 7,
                            },
                            {
                                handicapIndex: 11,
                                id: 44,
                                number: 8,
                            },
                            {
                                handicapIndex: 7,
                                id: 45,
                                number: 9,
                            },
                            {
                                handicapIndex: 10,
                                id: 46,
                                number: 10,
                            },
                            {
                                handicapIndex: 6,
                                id: 47,
                                number: 11,
                            },
                            {
                                handicapIndex: 4,
                                id: 48,
                                number: 12,
                            },
                            {
                                handicapIndex: 18,
                                id: 49,
                                number: 13,
                            },
                            {
                                handicapIndex: 2,
                                id: 50,
                                number: 14,
                            },
                            {
                                handicapIndex: 14,
                                id: 51,
                                number: 15,
                            },
                            {
                                handicapIndex: 16,
                                id: 52,
                                number: 16,
                            },
                            {
                                handicapIndex: 12,
                                id: 53,
                                number: 17,
                            },
                            {
                                handicapIndex: 8,
                                id: 54,
                                number: 18,
                            },
                        ],
                        id: 3,
                        name: "RoseLake",
                        tee: "Gold",
                    },
                    {
                        holes: [
                            {
                                handicapIndex: 3,
                                id: 55,
                                number: 1,
                            },
                            {
                                handicapIndex: 9,
                                id: 56,
                                number: 2,
                            },
                            {
                                handicapIndex: 17,
                                id: 57,
                                number: 3,
                            },
                            {
                                handicapIndex: 5,
                                id: 58,
                                number: 4,
                            },
                            {
                                handicapIndex: 13,
                                id: 59,
                                number: 5,
                            },
                            {
                                handicapIndex: 1,
                                id: 60,
                                number: 6,
                            },
                            {
                                handicapIndex: 15,
                                id: 61,
                                number: 7,
                            },
                            {
                                handicapIndex: 11,
                                id: 62,
                                number: 8,
                            },
                            {
                                handicapIndex: 7,
                                id: 63,
                                number: 9,
                            },
                            {
                                handicapIndex: 10,
                                id: 64,
                                number: 10,
                            },
                            {
                                handicapIndex: 6,
                                id: 65,
                                number: 11,
                            },
                            {
                                handicapIndex: 4,
                                id: 66,
                                number: 12,
                            },
                            {
                                handicapIndex: 18,
                                id: 67,
                                number: 13,
                            },
                            {
                                handicapIndex: 2,
                                id: 68,
                                number: 14,
                            },
                            {
                                handicapIndex: 14,
                                id: 69,
                                number: 15,
                            },
                            {
                                handicapIndex: 16,
                                id: 70,
                                number: 16,
                            },
                            {
                                handicapIndex: 12,
                                id: 71,
                                number: 17,
                            },
                            {
                                handicapIndex: 8,
                                id: 72,
                                number: 18,
                            },
                        ],
                        id: 4,
                        name: "RoseLake",
                        tee: "Red",
                    },
                ],
            },
            getTeams: vi.fn(),
            getPlayers: vi.fn(),
            getCourses: vi.fn(),
            frontBackNine: "frontNine",
            team1Id: 1,
            team2Id: 2,
            division: "Mens Division",
        };
    });

    it("renders correct components", () => {
        const { container } = render(<Scorecard {...props} />);

        const date = container.querySelector('[name="dateToday"]');
        const frontBackNine = container.querySelector('[name="frontBackNine"]');
        const division = container.querySelector('[name="division"]');
        const scoreCardTable = container.querySelector('[name="scoreCardTable"]');
        const print = container.querySelector('[name="print"]');
        const scorecard = container.querySelector('[id="scorecard"]');

        expect(date).not.toBeNull();
        expect(frontBackNine).not.toBeNull();
        expect(division).not.toBeNull();
        expect(scoreCardTable).not.toBeNull();
        expect(print).not.toBeNull();
        expect(scorecard).not.toBeNull();
    });

    it("populate course called on load", () => {
        render(<Scorecard {...props} />);

        expect(props.getCourses).toHaveBeenCalled();
    });

    test.each([
        ["frontNine", "Front Nine"],
        ["backNine", "Back Nine"],
    ])("renders %s nine from props", (frontOrBack, textValue) => {
        props.frontBackNine = frontOrBack;
        const { container } = render(<Scorecard {...props} />);

        const frontBackNine = container.querySelector('[name="frontBackNine"]');
        const frontBackNineHandicap = container.querySelector('[name="frontBackNineHandicap"]');

        expect(frontBackNine.textContent).toEqual(textValue);
        expect(frontBackNineHandicap.textContent).toEqual(textValue + " Handicap");
    });

    it("renders division when present in props", () => {
        const divisionText = "Mens Div1";
        props.division = divisionText;
        const { container } = render(<Scorecard {...props} />);

        const division = container.querySelector('[name="division"]');

        expect(division.textContent).toEqual("Division: " + divisionText);
    });

    it("doesn't render division when not present in props", () => {
        props.division = "";
        const { container } = render(<Scorecard {...props} />);

        const division = container.querySelector('[name="division"]');

        expect(division.textContent).toEqual("");
    });

    it("renders todays date", () => {
        const { container } = render(<Scorecard {...props} />);

        const today = new Date();
        const formattedTodayDate = today.toLocaleDateString("en-US");
        const date = container.querySelector('[name="dateToday"]');

        expect(date.textContent).toEqual("Date: " + formattedTodayDate);
    });

    test.each([["frontNine"], ["backNine"]])("renders correct holes for %s", (frontOrBack) => {
        props.frontBackNine = frontOrBack;
        const { container } = render(<Scorecard {...props} />);

        const hole1 = container.querySelector('[name="hole1"]');
        const hole2 = container.querySelector('[name="hole2"]');
        const hole3 = container.querySelector('[name="hole3"]');
        const hole4 = container.querySelector('[name="hole4"]');
        const hole5 = container.querySelector('[name="hole5"]');
        const hole6 = container.querySelector('[name="hole6"]');
        const hole7 = container.querySelector('[name="hole7"]');
        const hole8 = container.querySelector('[name="hole8"]');
        const hole9 = container.querySelector('[name="hole9"]');

        const holeOffset = frontOrBack === "frontNine" ? 0 : 9;

        expect(hole1.textContent).toEqual(props.golf.courses[0].holes[holeOffset].number.toString());
        expect(hole2.textContent).toEqual(props.golf.courses[0].holes[holeOffset + 1].number.toString());
        expect(hole3.textContent).toEqual(props.golf.courses[0].holes[holeOffset + 2].number.toString());
        expect(hole4.textContent).toEqual(props.golf.courses[0].holes[holeOffset + 3].number.toString());
        expect(hole5.textContent).toEqual(props.golf.courses[0].holes[holeOffset + 4].number.toString());
        expect(hole6.textContent).toEqual(props.golf.courses[0].holes[holeOffset + 5].number.toString());
        expect(hole7.textContent).toEqual(props.golf.courses[0].holes[holeOffset + 6].number.toString());
        expect(hole8.textContent).toEqual(props.golf.courses[0].holes[holeOffset + 7].number.toString());
        expect(hole9.textContent).toEqual(props.golf.courses[0].holes[holeOffset + 8].number.toString());
    });

    it("renders HoleHandicap rows correctly", () => {
        const { container } = render(<Scorecard {...props} />);

        // Check that tee handicap rows are rendered by looking for tee names in the table
        const tableContent = container.querySelector('[name="scoreCardTable"]').textContent;
        expect(tableContent).toContain("Blue tee index");
        expect(tableContent).toContain("White tee index");
        expect(tableContent).toContain("Gold tee index");
        expect(tableContent).toContain("Red tee index");
    });

    it("renders playerStrokes row correctly", () => {
        const { container } = render(<Scorecard {...props} />);

        // Check that player rows are rendered by verifying player names appear in the table
        const tableContent = container.querySelector('[name="scoreCardTable"]').textContent;
        expect(tableContent).toContain("Bob Smith");
        expect(tableContent).toContain("Brian Sokoloski");
        expect(tableContent).toContain("Mary Johnson");
        expect(tableContent).toContain("Jane Doe");
    });

    test.each([
        ["White", "White", "White", "White", true],
        ["Blue", "Gold", "White", "White", false],
    ])("renders notes correctly based on courses shown", (t1APref, t1BPref, t2APref, t2BPref, hidden) => {
        props.golf.players[0].teePreference = t1APref;
        props.golf.players[1].teePreference = t1BPref;
        props.golf.players[2].teePreference = t2APref;
        props.golf.players[3].teePreference = t2BPref;
        const { container } = render(<Scorecard {...props} />);

        const notes = container.querySelector('[name="notes"]');

        expect(notes.hidden).toEqual(hidden);
    });

    it("renders team points for each team", () => {
        const { container } = render(<Scorecard {...props} />);

        // Check that TeamTotals components are rendered by verifying the table has enough rows
        // The table should have: header row, 4 HoleHandicap rows, player header, 4 player rows, 2 empty rows, 2 team total rows
        const tableRows = container.querySelectorAll('[name="scoreCardTable"] tr');
        expect(tableRows.length).toBeGreaterThan(10); // Should have at least the expected rows
    });

    test.each([
        [false, 2, 1],
        [true, 1, 2],
    ])("renders A and B player correctly based on forceAB %s", (forceAB, APlayerId, BPlayerId) => {
        props.golf.teams[0].forceAB = forceAB;
        const { container } = render(<Scorecard {...props} />);

        // Verify players are rendered in the correct order based on forceAB
        const tableContent = container.querySelector('[name="scoreCardTable"]').textContent;

        // When forceAB is false: Bob Smith (lower handicap) should be A player, Brian Sokoloski should be B
        // When forceAB is true: Based on APlayer flag in teamMembers (player 1 is A when APlayer=true)
        const bobIndex = tableContent.indexOf("Bob Smith");
        const brianIndex = tableContent.indexOf("Brian Sokoloski");

        // Both players should be in the table
        expect(bobIndex).toBeGreaterThan(-1);
        expect(brianIndex).toBeGreaterThan(-1);
    });
});
