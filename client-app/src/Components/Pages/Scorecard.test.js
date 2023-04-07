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
                    },
                    {
                        id: 2,
                        GHIN: 4321,
                        firstName: "Bob",
                        lastName: "Smith",
                        handicap: 1,
                        frontNine: 0,
                        backNine: 1,
                    },
                    {
                        id: 3,
                        GHIN: 5567,
                        firstName: "Mary",
                        lastName: "Johnson",
                        handicap: 12,
                        frontNine: 6,
                        backNine: 6,
                    },
                    {
                        id: 4,
                        GHIN: 5568,
                        firstName: "Jane",
                        lastName: "Doe",
                        handicap: 17,
                        frontNine: 8,
                        backNine: 9,
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

    it("renders correct A and B players", () => {
        const wrapper = shallow(<Scorecard {...props} />);

        var team1A = wrapper.find({ name: "team1A" });
        var team1B = wrapper.find({ name: "team1B" });
        var team2A = wrapper.find({ name: "team2A" });
        var team2B = wrapper.find({ name: "team2B" });

        expect(team1A.text()).toEqual("Bob Smith");
        expect(team1B.text()).toEqual("Brian Sokoloski");
        expect(team2A.text()).toEqual("Mary Johnson");
        expect(team2B.text()).toEqual("Jane Doe");
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
});
