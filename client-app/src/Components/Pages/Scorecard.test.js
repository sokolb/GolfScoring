import { shallow } from "enzyme";
import { Scorecard } from "./Scorecard";

var props;

describe("Scorecard tests", () => {
    beforeEach(() => {
        props = {
            golf: {
                userToken: "abc123",
                teams: [
                    {
                        teamNumber: 1,
                        teamMemberIds: [1, 2],
                    },
                    {
                        teamNumber: 2,
                        teamMemberIds: [3, 4],
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
            getTeams: jest.fn(),
            getPlayers: jest.fn(),
            getCourses: jest.fn(),
            frontBackNine: "frontNine",
            team1Id: 1,
            team2Id: 2,
        };
    });

    it("renders correct components", () => {
        const wrapper = shallow(<Scorecard {...props} />);

        var date = wrapper.find({ name: "dateToday" });
        var frontBackNine = wrapper.find({ name: "frontBackNine" });
        var scoreCardTable = wrapper.find({ name: "scoreCardTable" });

        expect(date.length).toEqual(1);
        expect(frontBackNine.length).toEqual(1);
        expect(scoreCardTable.length).toEqual(1);
    });

    it("populate course called on load", () => {
        const wrapper = shallow(<Scorecard {...props} />);

        expect(props.getCourses).toHaveBeenCalled();
    });

    test.each([
        ["frontNine", "Front Nine"],
        ["backNine", "Back Nine"],
    ])("renders %s nine from props", (frontOrBack, textValue) => {
        props.frontBackNine = frontOrBack;
        const wrapper = shallow(<Scorecard {...props} />);

        var frontBackNine = wrapper.find({ name: "frontBackNine" });
        var frontBackNineHandicap = wrapper.find({ name: "frontBackNineHandicap" });

        expect(frontBackNine.text()).toEqual(textValue);
        expect(frontBackNineHandicap.text()).toEqual(textValue + " Handicap");
    });

    it("renders todays date", () => {
        const wrapper = shallow(<Scorecard {...props} />);

        const today = new Date();
        const formattedTodayDate = today.toLocaleDateString("en-US");
        var date = wrapper.find({ name: "dateToday" });

        expect(date.text()).toEqual("Date: " + formattedTodayDate);
    });

    it("renders correct A and B players with tees", () => {
        const wrapper = shallow(<Scorecard {...props} />);

        var team1A = wrapper.find({ name: "team1A" });
        var team1B = wrapper.find({ name: "team1B" });
        var team2A = wrapper.find({ name: "team2A" });
        var team2B = wrapper.find({ name: "team2B" });

        var team1ATees = wrapper.find({ name: "team1ATees" });
        var team1BTees = wrapper.find({ name: "team1BTees" });
        var team2ATees = wrapper.find({ name: "team2ATees" });
        var team2BTees = wrapper.find({ name: "team2BTees" });

        expect(team1A.text()).toEqual("Bob Smith");
        expect(team1ATees.text()).toEqual("Blue");
        expect(team1B.text()).toEqual("Brian Sokoloski");
        expect(team1BTees.text()).toEqual("White");
        expect(team2A.text()).toEqual("Mary Johnson");
        expect(team2ATees.text()).toEqual("Red");
        expect(team2B.text()).toEqual("Jane Doe");
        expect(team2BTees.text()).toEqual("Gold");
    });

    test.each([
        ["frontNine", "0", "9", "6", "8"],
        ["backNine", "1", "9", "6", "9"],
    ])("renders correct handicap for players on %s", (frontOrBack, team1AHandicap, team1BHandicap, team2AHandicap, team2BHandicap) => {
        props.frontBackNine = frontOrBack;
        const wrapper = shallow(<Scorecard {...props} />);

        var team1AHandicapLabel = wrapper.find({ name: "team1AHandicap" });
        var team1BHandicapLabel = wrapper.find({ name: "team1BHandicap" });
        var team2AHandicapLabel = wrapper.find({ name: "team2AHandicap" });
        var team2BHandicapLabel = wrapper.find({ name: "team2BHandicap" });

        expect(team1AHandicapLabel.text()).toEqual(team1AHandicap);
        expect(team1BHandicapLabel.text()).toEqual(team1BHandicap);
        expect(team2AHandicapLabel.text()).toEqual(team2AHandicap);
        expect(team2BHandicapLabel.text()).toEqual(team2BHandicap);
    });

    test.each([
        ["frontNine", "0", "1", "6", "0"],
        ["backNine", "0", "0", "5", "0"],
    ])("renders correct strokes for players on %s", (frontOrBack, team1AStrokes, team1BStrokes, team2AStrokes, team2BStrokes) => {
        props.frontBackNine = frontOrBack;
        const wrapper = shallow(<Scorecard {...props} />);

        var team1AStrokesLabel = wrapper.find({ name: "team1AStrokes" });
        var team1BStrokesLabel = wrapper.find({ name: "team1BStrokes" });
        var team2AStrokesLabel = wrapper.find({ name: "team2AStrokes" });
        var team2BStrokesLabel = wrapper.find({ name: "team2BStrokes" });

        expect(team1AStrokesLabel.text()).toEqual(team1AStrokes);
        expect(team1BStrokesLabel.text()).toEqual(team1BStrokes);
        expect(team2AStrokesLabel.text()).toEqual(team2AStrokes);
        expect(team2BStrokesLabel.text()).toEqual(team2BStrokes);
    });

    test.each([["frontNine"], ["backNine"]])("renders correct holes for  %s", (frontOrBack) => {
        props.frontBackNine = frontOrBack;
        const wrapper = shallow(<Scorecard {...props} />);

        var hole1 = wrapper.find({ name: "hole1" });
        var hole2 = wrapper.find({ name: "hole2" });
        var hole3 = wrapper.find({ name: "hole3" });
        var hole4 = wrapper.find({ name: "hole4" });
        var hole5 = wrapper.find({ name: "hole5" });
        var hole6 = wrapper.find({ name: "hole6" });
        var hole7 = wrapper.find({ name: "hole7" });
        var hole8 = wrapper.find({ name: "hole8" });
        var hole9 = wrapper.find({ name: "hole9" });

        var holeOffset = frontOrBack === "frontNine" ? 0 : 9;

        expect(hole1.text()).toEqual(props.golf.courses[0].holes[holeOffset].number.toString());
        expect(hole2.text()).toEqual(props.golf.courses[0].holes[holeOffset + 1].number.toString());
        expect(hole3.text()).toEqual(props.golf.courses[0].holes[holeOffset + 2].number.toString());
        expect(hole4.text()).toEqual(props.golf.courses[0].holes[holeOffset + 3].number.toString());
        expect(hole5.text()).toEqual(props.golf.courses[0].holes[holeOffset + 4].number.toString());
        expect(hole6.text()).toEqual(props.golf.courses[0].holes[holeOffset + 5].number.toString());
        expect(hole7.text()).toEqual(props.golf.courses[0].holes[holeOffset + 6].number.toString());
        expect(hole8.text()).toEqual(props.golf.courses[0].holes[holeOffset + 7].number.toString());
        expect(hole9.text()).toEqual(props.golf.courses[0].holes[holeOffset + 8].number.toString());
    });
});
