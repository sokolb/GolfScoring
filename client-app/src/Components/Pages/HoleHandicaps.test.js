import { shallow } from "enzyme";
import { HoleHandicaps } from "./HoleHandicaps";

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
        const wrapper = shallow(<HoleHandicaps {...props} />);

        var tee = wrapper.find({ name: "tee" });

        expect(tee.text()).toEqual("Hole Handicap Index " + props.course.tee);
    });

    it("renders correct components for front nine", () => {
        const wrapper = shallow(<HoleHandicaps {...props} />);

        var hole1Handicap = wrapper.find({ name: "hole1Handicap" });
        var hole2Handicap = wrapper.find({ name: "hole2Handicap" });
        var hole3Handicap = wrapper.find({ name: "hole3Handicap" });
        var hole4Handicap = wrapper.find({ name: "hole4Handicap" });
        var hole5Handicap = wrapper.find({ name: "hole5Handicap" });
        var hole6Handicap = wrapper.find({ name: "hole6Handicap" });
        var hole7Handicap = wrapper.find({ name: "hole7Handicap" });
        var hole8Handicap = wrapper.find({ name: "hole8Handicap" });
        var hole9Handicap = wrapper.find({ name: "hole9Handicap" });

        expect(hole1Handicap.text()).toEqual("7");
        expect(hole2Handicap.text()).toEqual("13");
        expect(hole3Handicap.text()).toEqual("3");
        expect(hole4Handicap.text()).toEqual("11");
        expect(hole5Handicap.text()).toEqual("5");
        expect(hole6Handicap.text()).toEqual("1");
        expect(hole7Handicap.text()).toEqual("17");
        expect(hole8Handicap.text()).toEqual("9");
        expect(hole9Handicap.text()).toEqual("15");
    });

    it("renders correct components for back nine", () => {
        props.frontBackNine = "backNine";
        const wrapper = shallow(<HoleHandicaps {...props} />);

        var hole1Handicap = wrapper.find({ name: "hole1Handicap" });
        var hole2Handicap = wrapper.find({ name: "hole2Handicap" });
        var hole3Handicap = wrapper.find({ name: "hole3Handicap" });
        var hole4Handicap = wrapper.find({ name: "hole4Handicap" });
        var hole5Handicap = wrapper.find({ name: "hole5Handicap" });
        var hole6Handicap = wrapper.find({ name: "hole6Handicap" });
        var hole7Handicap = wrapper.find({ name: "hole7Handicap" });
        var hole8Handicap = wrapper.find({ name: "hole8Handicap" });
        var hole9Handicap = wrapper.find({ name: "hole9Handicap" });

        expect(hole1Handicap.text()).toEqual("4");
        expect(hole2Handicap.text()).toEqual("14");
        expect(hole3Handicap.text()).toEqual("8");
        expect(hole4Handicap.text()).toEqual("16");
        expect(hole5Handicap.text()).toEqual("6");
        expect(hole6Handicap.text()).toEqual("18");
        expect(hole7Handicap.text()).toEqual("12");
        expect(hole8Handicap.text()).toEqual("10");
        expect(hole9Handicap.text()).toEqual("2");
    });
});
