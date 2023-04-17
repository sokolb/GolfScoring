import { shallow } from "enzyme";
import PlayerScorecard from "./PlayerScorecard";

var props;
var player1 = {
    id: 1,
    GHIN: 1234,
    firstName: "Brian",
    lastName: "Sokoloski",
    handicap: 18,
    frontNine: 9,
    backNine: 9,
    teePreference: "White",
};
var player2 = {
    id: 2,
    GHIN: 4321,
    firstName: "Bob",
    lastName: "Smith",
    handicap: 1,
    frontNine: 0,
    backNine: 1,
    teePreference: "Blue",
};
var player3 = {
    id: 3,
    GHIN: 5567,
    firstName: "Mary",
    lastName: "Johnson",
    handicap: 12,
    frontNine: 6,
    backNine: 6,
    teePreference: "Red",
};
var player4 = {
    id: 4,
    GHIN: 5568,
    firstName: "Jane",
    lastName: "Doe",
    handicap: 17,
    frontNine: 8,
    backNine: 9,
    teePreference: "Gold",
};
var courseWhite = {
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
};
var courseBlue = {
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
};
var courseGold = {
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
};
var courseRed = {
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
};

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
            player: player4,
            strokes: 4,
        };
    });

    it("renders tee in name, tee pref, handicap, and strokes", () => {
        const wrapper = shallow(<PlayerScorecard {...props} />);

        var name = wrapper.find({ name: "name" });
        var tee = wrapper.find({ name: "tee" });
        var strokes = wrapper.find({ name: "strokes" });

        expect(name.text()).toEqual(props.player.firstName + " " + props.player.lastName);
        expect(tee.text()).toEqual(props.player.teePreference);
        expect(strokes.text()).toEqual(props.strokes.toString());
    });

    test.each([
        ["frontNine", "8"],
        ["backNine", "9"],
    ])("renders handicap based on front or back nine", (frontOrBack, handicapValue) => {
        props.frontBackNine = frontOrBack;
        const wrapper = shallow(<PlayerScorecard {...props} />);

        var handicap = wrapper.find({ name: "handicap" });

        expect(handicap.text()).toEqual(handicapValue);
    });

    test.each([
        [player1, courseWhite, 3, "", "", "S", "", "S", "S", "", "", ""],
        [player2, courseBlue, 1, "", "", "", "", "", "S", "", "", ""],
        [player3, courseGold, 7, "S", "S", "", "S", "S", "S", "", "S", "S"],
        [player4, courseRed, 2, "S", "", "", "", "", "S", "", "", ""],
        [player4, courseRed, 12, "SS", "S", "S", "SS", "S", "SS", "S", "S", "S"],
        [player3, courseGold, 24, "SSS", "SSS", "SS", "SSS", "SS", "SSS", "SS", "SSS", "SSS"],
    ])("renders strokes correctly for frontNine for %s", (player, course, strokes, h1, h2, h3, h4, h5, h6, h7, h8, h9) => {
        props.frontBackNine = "frontNine";
        props.course = course;
        props.player = player;
        props.strokes = strokes;
        const wrapper = shallow(<PlayerScorecard {...props} />);

        var stroke1 = wrapper.find({ name: "stroke1" });
        var stroke2 = wrapper.find({ name: "stroke2" });
        var stroke3 = wrapper.find({ name: "stroke3" });
        var stroke4 = wrapper.find({ name: "stroke4" });
        var stroke5 = wrapper.find({ name: "stroke5" });
        var stroke6 = wrapper.find({ name: "stroke6" });
        var stroke7 = wrapper.find({ name: "stroke7" });
        var stroke8 = wrapper.find({ name: "stroke8" });
        var stroke9 = wrapper.find({ name: "stroke9" });
        expect(stroke1.text()).toEqual(h1);
        expect(stroke2.text()).toEqual(h2);
        expect(stroke3.text()).toEqual(h3);
        expect(stroke4.text()).toEqual(h4);
        expect(stroke5.text()).toEqual(h5);
        expect(stroke6.text()).toEqual(h6);
        expect(stroke7.text()).toEqual(h7);
        expect(stroke8.text()).toEqual(h8);
        expect(stroke9.text()).toEqual(h9);
    });

    test.each([
        [player1, courseWhite, 6, "S", "", "S", "", "S", "", "S", "S", "S"],
        [player2, courseBlue, 3, "S", "", "", "", "S", "", "", "", "S"],
        [player3, courseGold, 3, "", "S", "S", "", "S", "", "", "", ""],
        [player4, courseRed, 9, "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        [player1, courseWhite, 12, "SS", "S", "S", "S", "SS", "S", "S", "S", "SS"],
        [player2, courseBlue, 20, "SSS", "SS", "SS", "SS", "SS", "SS", "SS", "SS", "SSS"],
    ])("renders strokes correctly for backNine for %s", (player, course, strokes, h1, h2, h3, h4, h5, h6, h7, h8, h9) => {
        props.frontBackNine = "backNine";
        props.course = course;
        props.player = player;
        props.strokes = strokes;
        const wrapper = shallow(<PlayerScorecard {...props} />);

        var stroke1 = wrapper.find({ name: "stroke1" });
        var stroke2 = wrapper.find({ name: "stroke2" });
        var stroke3 = wrapper.find({ name: "stroke3" });
        var stroke4 = wrapper.find({ name: "stroke4" });
        var stroke5 = wrapper.find({ name: "stroke5" });
        var stroke6 = wrapper.find({ name: "stroke6" });
        var stroke7 = wrapper.find({ name: "stroke7" });
        var stroke8 = wrapper.find({ name: "stroke8" });
        var stroke9 = wrapper.find({ name: "stroke9" });
        expect(stroke1.text()).toEqual(h1);
        expect(stroke2.text()).toEqual(h2);
        expect(stroke3.text()).toEqual(h3);
        expect(stroke4.text()).toEqual(h4);
        expect(stroke5.text()).toEqual(h5);
        expect(stroke6.text()).toEqual(h6);
        expect(stroke7.text()).toEqual(h7);
        expect(stroke8.text()).toEqual(h8);
        expect(stroke9.text()).toEqual(h9);
    });
});
