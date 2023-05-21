import { shallow } from "enzyme";
import { Scorecard } from "./Scorecard";
import HoleHandicaps from "./HoleHandicaps";

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
        var print = wrapper.find({ name: "print" });
        var scorecard = wrapper.find({ id: "scorecard" });

        expect(date.length).toEqual(1);
        expect(frontBackNine.length).toEqual(1);
        expect(scoreCardTable.length).toEqual(1);
        expect(print.length).toEqual(1);
        expect(scorecard.length).toEqual(1);
    });

    it("populate course called on load", () => {
        // eslint-disable-next-line no-unused-vars
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

    it("renders HoleHandicap rows correctly", () => {
        const wrapper = shallow(<Scorecard {...props} />);

        var holesBlue = wrapper.find({ name: "holesHandicapBlue" });
        var holesWhite = wrapper.find({ name: "holesHandicapWhite" });
        var holesGold = wrapper.find({ name: "holesHandicapGold" });
        var holesRed = wrapper.find({ name: "holesHandicapRed" });

        expect(holesBlue.props().course).toEqual(props.golf.courses[1]);
        expect(holesWhite.props().course).toEqual(props.golf.courses[0]);
        expect(holesGold.props().course).toEqual(props.golf.courses[2]);
        expect(holesRed.props().course).toEqual(props.golf.courses[3]);
    });

    it("renders playerStrokes row correctly", () => {
        const wrapper = shallow(<Scorecard {...props} />);

        var player1A = wrapper.find({ name: "player1A" });
        var player1B = wrapper.find({ name: "player1B" });
        var player2A = wrapper.find({ name: "player2A" });
        var player2B = wrapper.find({ name: "player2B" });

        expect(player1A.props().course).toEqual(props.golf.courses[1]);
        expect(player1A.props().player).toEqual(props.golf.players[1]);
        expect(player1A.props().frontBackNine).toEqual(props.frontBackNine);
        expect(player1A.props().strokes).toEqual(0);

        expect(player1B.props().course).toEqual(props.golf.courses[0]);
        expect(player1B.props().player).toEqual(props.golf.players[0]);
        expect(player1B.props().frontBackNine).toEqual(props.frontBackNine);
        expect(player1B.props().strokes).toEqual(1);

        expect(player2A.props().course).toEqual(props.golf.courses[3]);
        expect(player2A.props().player).toEqual(props.golf.players[2]);
        expect(player2A.props().frontBackNine).toEqual(props.frontBackNine);
        expect(player2A.props().strokes).toEqual(6);

        expect(player2B.props().course).toEqual(props.golf.courses[2]);
        expect(player2B.props().player).toEqual(props.golf.players[3]);
        expect(player2B.props().frontBackNine).toEqual(props.frontBackNine);
        expect(player2B.props().strokes).toEqual(0);
    });

    test.each([
        ["White", "White", "White", "White", true],
        ["Blue", "Gold", "White", "White", false],
    ])("renders notes correctly based on courses shown", (t1APref, t1BPref, t2APref, t2BPref, hidden) => {
        props.golf.players[0].teePreference = t1APref;
        props.golf.players[1].teePreference = t1BPref;
        props.golf.players[2].teePreference = t2APref;
        props.golf.players[3].teePreference = t2BPref;
        const wrapper = shallow(<Scorecard {...props} />);

        var notes = wrapper.find({ name: "notes" });

        expect(notes.prop("hidden")).toEqual(hidden);
    });

    it("renders team points for each team", () => {
        const wrapper = shallow(<Scorecard {...props} />);

        var team1Points = wrapper.find({ name: "team1Points" });
        var team2Points = wrapper.find({ name: "team2Points" });

        expect(team1Points.props().player1).toEqual(props.golf.players[1]);
        expect(team1Points.props().player2).toEqual(props.golf.players[0]);
        expect(team2Points.props().player1).toEqual(props.golf.players[2]);
        expect(team2Points.props().player2).toEqual(props.golf.players[3]);
    });
});
