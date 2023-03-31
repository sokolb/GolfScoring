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
                        handicap: 11,
                    },
                    {
                        id: 2,
                        GHIN: 4321,
                        firstName: "Bob",
                        lastName: "Smith",
                        handicap: 12,
                    },
                    {
                        id: 3,
                        GHIN: 5567,
                        firstName: "Mary",
                        lastName: "Johnson",
                        handicap: 12,
                    },
                    {
                        id: 4,
                        GHIN: 5568,
                        firstName: "Jane",
                        lastName: "Doe",
                        handicap: 17,
                    },
                ],
            },
            getTeams: jest.fn(),
            getPlayers: jest.fn(),
            getCourses: jest.fn(),
            frontBackNine: "frontNine",
        };
    });

    it("renders correct components", () => {
        const wrapper = shallow(<Scorecard {...props} />);

        var date = wrapper.find({ name: "date" });
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

        expect(frontBackNine.text()).toEqual(textValue);
    });

    it("renders todays date", () => {
        const wrapper = shallow(<Scorecard {...props} />);

        const today = new Date();
        const formattedTodayDate = today.toLocaleDateString("en-US");
        var date = wrapper.find({ name: "dateToday" });

        expect(date.text()).toEqual("Date: " + formattedTodayDate);
    });
});
