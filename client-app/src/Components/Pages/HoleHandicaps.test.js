import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import HoleHandicaps from "./HoleHandicaps";

var props;

describe("Scorecard tests", () => {
    beforeEach(() => {
        props = {
            course: {
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
            frontBackNine: "frontNine",
        };
    });

    it("renders tee in name", () => {
        const { container } = render(<HoleHandicaps {...props} />);

        const tee = container.querySelector('[name="tee"]');

        expect(tee.textContent).toEqual(props.course.tee + " tee index");
    });

    it("renders correct components for front nine", () => {
        const { container } = render(<HoleHandicaps {...props} />);

        const hole1Handicap = container.querySelector('[name="hole1Handicap"]');
        const hole2Handicap = container.querySelector('[name="hole2Handicap"]');
        const hole3Handicap = container.querySelector('[name="hole3Handicap"]');
        const hole4Handicap = container.querySelector('[name="hole4Handicap"]');
        const hole5Handicap = container.querySelector('[name="hole5Handicap"]');
        const hole6Handicap = container.querySelector('[name="hole6Handicap"]');
        const hole7Handicap = container.querySelector('[name="hole7Handicap"]');
        const hole8Handicap = container.querySelector('[name="hole8Handicap"]');
        const hole9Handicap = container.querySelector('[name="hole9Handicap"]');

        expect(hole1Handicap.textContent).toEqual("7");
        expect(hole2Handicap.textContent).toEqual("13");
        expect(hole3Handicap.textContent).toEqual("3");
        expect(hole4Handicap.textContent).toEqual("11");
        expect(hole5Handicap.textContent).toEqual("5");
        expect(hole6Handicap.textContent).toEqual("1");
        expect(hole7Handicap.textContent).toEqual("17");
        expect(hole8Handicap.textContent).toEqual("9");
        expect(hole9Handicap.textContent).toEqual("15");
    });

    it("renders correct components for back nine", () => {
        props.frontBackNine = "backNine";
        const { container } = render(<HoleHandicaps {...props} />);

        const hole1Handicap = container.querySelector('[name="hole1Handicap"]');
        const hole2Handicap = container.querySelector('[name="hole2Handicap"]');
        const hole3Handicap = container.querySelector('[name="hole3Handicap"]');
        const hole4Handicap = container.querySelector('[name="hole4Handicap"]');
        const hole5Handicap = container.querySelector('[name="hole5Handicap"]');
        const hole6Handicap = container.querySelector('[name="hole6Handicap"]');
        const hole7Handicap = container.querySelector('[name="hole7Handicap"]');
        const hole8Handicap = container.querySelector('[name="hole8Handicap"]');
        const hole9Handicap = container.querySelector('[name="hole9Handicap"]');

        expect(hole1Handicap.textContent).toEqual("4");
        expect(hole2Handicap.textContent).toEqual("14");
        expect(hole3Handicap.textContent).toEqual("8");
        expect(hole4Handicap.textContent).toEqual("16");
        expect(hole5Handicap.textContent).toEqual("6");
        expect(hole6Handicap.textContent).toEqual("18");
        expect(hole7Handicap.textContent).toEqual("12");
        expect(hole8Handicap.textContent).toEqual("10");
        expect(hole9Handicap.textContent).toEqual("2");
    });
});
