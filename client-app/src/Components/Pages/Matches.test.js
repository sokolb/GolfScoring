import { shallow } from "enzyme";
import { Matches } from "./Matches";

var props;

describe("Matches tests", () => {
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
        };
    });

    it("Renders add new player boxes", () => {
        const wrapper = shallow(<Matches {...props} />);

        var date = wrapper.find({ name: "date" });
        var team1 = wrapper.find({ name: "team1" });
        var team2 = wrapper.find({ name: "team2" });
        var frontBackNine = wrapper.find({ name: "frontBackNine" });
        var createScoreCard = wrapper.find({ name: "createScoreCard" });

        expect(date.length).toEqual(1);
        expect(team1.length).toEqual(1);
        expect(team2.length).toEqual(1);
        expect(frontBackNine.length).toEqual(1);
        expect(createScoreCard.length).toEqual(1);
    });

    it("populate teams and players on page load", () => {
        const wrapper = shallow(<Matches {...props} />);

        expect(props.getTeams).toHaveBeenCalled();
        expect(props.getPlayers).toHaveBeenCalled();
    });

    it("renders teams correctly in each team list", () => {
        const wrapper = shallow(<Matches {...props} />);

        var team1 = wrapper.find({ name: "team1" });
        expect(team1.props().children.length).toEqual(3);
        expect(team1.props().children[0].props.value).toEqual("");
        expect(team1.props().children[1].props.children).toEqual("1: Brian Sokoloski | Bob Smith");
        expect(team1.props().children[2].props.children).toEqual("2: Mary Johnson | Jane Doe");

        var team2 = wrapper.find({ name: "team2" });
        expect(team2.props().children.length).toEqual(3);
        expect(team1.props().children[0].props.value).toEqual("");
        expect(team2.props().children[1].props.children).toEqual("1: Brian Sokoloski | Bob Smith");
        expect(team2.props().children[2].props.children).toEqual("2: Mary Johnson | Jane Doe");
    });

    it("renders date input field with today's date as the default value", () => {
        const wrapper = shallow(<Matches {...props} />);
        const today = new Date().toISOString().split("T")[0];

        var date = wrapper.find({ name: "date" });

        expect(date.prop("value")).toEqual(today);
    });

    it("date change updates date input box", () => {
        const wrapper = shallow(<Matches {...props} />);
        const newDate = new Date("2022-03-10").toISOString().split("T")[0];

        var date = wrapper.find({ name: "date" });
        date.simulate("change", { target: { value: newDate } });
        date = wrapper.find({ name: "date" });

        expect(date.prop("value")).toEqual(newDate);
    });
});
