import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams, getPlayers, getCourses } from "../../Actions/GolfActions";
import HoleHandicaps from "./HoleHandicaps";

const today = new Date();
const formattedTodayDate = today.toLocaleDateString("en-US");

export class Scorecard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team1A: "",
            team1B: "",
            team2A: "",
            team2B: "",
            team1AStrokes: 0,
            team1BStrokes: 0,
            team2AStrokes: 0,
            team2BStrokes: 0,
            courses: [],
        };
    }

    componentDidMount() {
        this.props.getCourses("http://localhost:8082/getAllCourses");

        if (this.props.team1Id > -1 && this.props.team2Id > -1) {
            this.setScorecardData();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.team1A !== this.state.team1A || prevState.team1B !== this.state.team1B || prevState.team2A !== this.state.team2A || prevState.team2B !== this.state.team2B) {
            this.findAndSetStrokes();
        }
    }

    setScorecardData() {
        var team1A = this.findAPlayer(this.props.team1Id);
        var team1B = this.findBPlayer(this.props.team1Id);
        var team2A = this.findAPlayer(this.props.team2Id);
        var team2B = this.findBPlayer(this.props.team2Id);
        this.setState({
            team1A: team1A,
            team1B: team1B,
            team2A: team2A,
            team2B: team2B,
        });

        var courses = [];
        if (!courses.includes(team1A.teePreference)) {
            courses.push(team1A.teePreference);
        }
        if (!courses.includes(team1B.teePreference)) {
            courses.push(team1B.teePreference);
        }
        if (!courses.includes(team2A.teePreference)) {
            courses.push(team2A.teePreference);
        }
        if (!courses.includes(team2B.teePreference)) {
            courses.push(team2B.teePreference);
        }
        this.setState({
            courses: courses,
        });
    }

    findAndSetStrokes() {
        this.setState({
            team1AStrokes: this.calculateStrokesForPlayer(this.state.team1A, this.state.team2A),
            team1BStrokes: this.calculateStrokesForPlayer(this.state.team1B, this.state.team2B),
            team2AStrokes: this.calculateStrokesForPlayer(this.state.team2A, this.state.team1A),
            team2BStrokes: this.calculateStrokesForPlayer(this.state.team2B, this.state.team1B),
        });
    }

    calculateStrokesForPlayer(player, opponent) {
        var strokeDifference = this.props.frontBackNine === "frontNine" ? player.frontNine - opponent.frontNine : player.backNine - opponent.backNine;
        return strokeDifference <= 0 ? 0 : strokeDifference;
    }

    findAPlayer(teamId) {
        var team = this.props.golf.teams.find((team) => team.teamNumber === teamId);
        var player1 = this.getPlayer(team.teamMemberIds[0]);
        var player2 = this.getPlayer(team.teamMemberIds[1]);
        return player1.handicap < player2.handicap ? player1 : player2;
    }

    findBPlayer(teamId) {
        var team = this.props.golf.teams.find((team) => team.teamNumber === teamId);
        var player1 = this.getPlayer(team.teamMemberIds[0]);
        var player2 = this.getPlayer(team.teamMemberIds[1]);

        return player1.handicap > player2.handicap ? player1 : player2;
    }

    getPlayer(id) {
        return this.props.golf.players.find((player) => player.id === id);
    }

    getPlayerHandicap(player) {
        return this.props.frontBackNine === "frontNine" ? player.frontNine : player.backNine;
    }

    getHoleNumberByPosition(position) {
        if (this.props.golf.courses.length === 0) {
            return "";
        }
        var holeOffset = this.props.frontBackNine === "frontNine" ? 0 : 9;
        return this.props.golf.courses[0].holes[holeOffset + position].number;
    }

    getCourseByName(courseName) {
        var course = this.props.golf.courses.find((course) => course.tee === courseName);
        return course;
    }

    playerGetsStroke(player, strokes, holeNumber) {
        var course = this.getCourseByName(player.teePreference);
        if (course === undefined) {
            return "";
        }
        var holes = this.props.frontBackNine === "frontNine" ? [...course.holes].slice(0, 9) : [...course.holes].slice(9, 18);
        holes.sort(function (a, b) {
            return a.handicapIndex - b.handicapIndex;
        });

        var index = holes.findIndex(function (hole) {
            return hole.number === holeNumber;
        });

        return index !== -1 && index < strokes ? "S" : "";
    }

    render() {
        return (
            <div>
                <h1>Scorecard</h1>
                <br />
                <div>
                    <label name="dateToday">Date: {formattedTodayDate}</label>
                    <br />
                    <label name="frontBackNine">{this.props.frontBackNine === "frontNine" ? "Front Nine" : "Back Nine"}</label>
                    <br />
                    <table name="scoreCardTable" visible="true" border="1">
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Hole #</td>
                                <td name="hole1">{this.getHoleNumberByPosition(0)}</td>
                                <td name="hole2">{this.getHoleNumberByPosition(1)}</td>
                                <td name="hole3">{this.getHoleNumberByPosition(2)}</td>
                                <td name="hole4">{this.getHoleNumberByPosition(3)}</td>
                                <td name="hole5">{this.getHoleNumberByPosition(4)}</td>
                                <td name="hole6">{this.getHoleNumberByPosition(5)}</td>
                                <td name="hole7">{this.getHoleNumberByPosition(6)}</td>
                                <td name="hole8">{this.getHoleNumberByPosition(7)}</td>
                                <td name="hole9">{this.getHoleNumberByPosition(8)}</td>
                            </tr>
                            {this.state.courses.map((course) => {
                                return <HoleHandicaps name={"holesHandicap" + course} key={"holesHandicap" + course} course={this.getCourseByName(course)} frontBackNine={this.props.frontBackNine} />;
                            })}
                            <tr>
                                <th>Player</th>
                                <th>
                                    <label name="frontBackNineHandicap">{this.props.frontBackNine === "frontNine" ? "Front Nine" : "Back Nine"} Handicap</label>
                                </th>
                                <th>Tees</th>
                                <th>Strokes Received</th>
                            </tr>
                            <tr>
                                <td>
                                    <label name="team1A">{this.state.team1A.firstName + " " + this.state.team1A.lastName}</label>
                                </td>
                                <td>
                                    <label name="team1AHandicap">{this.getPlayerHandicap(this.state.team1A)}</label>
                                </td>
                                <td>
                                    <label name="team1ATees">{this.state.team1A.teePreference}</label>
                                </td>
                                <td>
                                    <label name="team1AStrokes">{this.state.team1AStrokes}</label>
                                </td>
                                <td name="t1AS1">{this.playerGetsStroke(this.state.team1A, this.state.team1AStrokes, this.getHoleNumberByPosition(0))}</td>
                                <td name="t1AS2">{this.playerGetsStroke(this.state.team1A, this.state.team1AStrokes, this.getHoleNumberByPosition(1))}</td>
                                <td name="t1AS3">{this.playerGetsStroke(this.state.team1A, this.state.team1AStrokes, this.getHoleNumberByPosition(2))}</td>
                                <td name="t1AS4">{this.playerGetsStroke(this.state.team1A, this.state.team1AStrokes, this.getHoleNumberByPosition(3))}</td>
                                <td name="t1AS5">{this.playerGetsStroke(this.state.team1A, this.state.team1AStrokes, this.getHoleNumberByPosition(4))}</td>
                                <td name="t1AS6">{this.playerGetsStroke(this.state.team1A, this.state.team1AStrokes, this.getHoleNumberByPosition(5))}</td>
                                <td name="t1AS7">{this.playerGetsStroke(this.state.team1A, this.state.team1AStrokes, this.getHoleNumberByPosition(6))}</td>
                                <td name="t1AS8">{this.playerGetsStroke(this.state.team1A, this.state.team1AStrokes, this.getHoleNumberByPosition(7))}</td>
                                <td name="t1AS9">{this.playerGetsStroke(this.state.team1A, this.state.team1AStrokes, this.getHoleNumberByPosition(8))}</td>
                            </tr>
                            <tr>
                                <td>
                                    <label name="team1B">{this.state.team1B.firstName + " " + this.state.team1B.lastName}</label>
                                </td>
                                <td>
                                    <label name="team1BHandicap">{this.getPlayerHandicap(this.state.team1B)}</label>
                                </td>
                                <td>
                                    <label name="team1BTees">{this.state.team1B.teePreference}</label>
                                </td>
                                <td name="team1BStrokes">{this.state.team1BStrokes}</td>
                                <td name="t1BS1">{this.playerGetsStroke(this.state.team1B, this.state.team1BStrokes, this.getHoleNumberByPosition(0))}</td>
                                <td name="t1BS2">{this.playerGetsStroke(this.state.team1B, this.state.team1BStrokes, this.getHoleNumberByPosition(1))}</td>
                                <td name="t1BS3">{this.playerGetsStroke(this.state.team1B, this.state.team1BStrokes, this.getHoleNumberByPosition(2))}</td>
                                <td name="t1BS4">{this.playerGetsStroke(this.state.team1B, this.state.team1BStrokes, this.getHoleNumberByPosition(3))}</td>
                                <td name="t1BS5">{this.playerGetsStroke(this.state.team1B, this.state.team1BStrokes, this.getHoleNumberByPosition(4))}</td>
                                <td name="t1BS6">{this.playerGetsStroke(this.state.team1B, this.state.team1BStrokes, this.getHoleNumberByPosition(5))}</td>
                                <td name="t1BS7">{this.playerGetsStroke(this.state.team1B, this.state.team1BStrokes, this.getHoleNumberByPosition(6))}</td>
                                <td name="t1BS8">{this.playerGetsStroke(this.state.team1B, this.state.team1BStrokes, this.getHoleNumberByPosition(7))}</td>
                                <td name="t1BS9">{this.playerGetsStroke(this.state.team1B, this.state.team1BStrokes, this.getHoleNumberByPosition(8))}</td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <td>
                                    <label name="team2A">{this.state.team2A.firstName + " " + this.state.team2A.lastName}</label>
                                </td>
                                <td>
                                    <label name="team2AHandicap">{this.getPlayerHandicap(this.state.team2A)}</label>
                                </td>
                                <td>
                                    <label name="team2ATees">{this.state.team2A.teePreference}</label>
                                </td>
                                <td name="team2AStrokes">{this.state.team2AStrokes}</td>
                                <td name="t2AS1">{this.playerGetsStroke(this.state.team2A, this.state.team2AStrokes, this.getHoleNumberByPosition(0))}</td>
                                <td name="t2AS2">{this.playerGetsStroke(this.state.team2A, this.state.team2AStrokes, this.getHoleNumberByPosition(1))}</td>
                                <td name="t2AS3">{this.playerGetsStroke(this.state.team2A, this.state.team2AStrokes, this.getHoleNumberByPosition(2))}</td>
                                <td name="t2AS4">{this.playerGetsStroke(this.state.team2A, this.state.team2AStrokes, this.getHoleNumberByPosition(3))}</td>
                                <td name="t2AS5">{this.playerGetsStroke(this.state.team2A, this.state.team2AStrokes, this.getHoleNumberByPosition(4))}</td>
                                <td name="t2AS6">{this.playerGetsStroke(this.state.team2A, this.state.team2AStrokes, this.getHoleNumberByPosition(5))}</td>
                                <td name="t2AS7">{this.playerGetsStroke(this.state.team2A, this.state.team2AStrokes, this.getHoleNumberByPosition(6))}</td>
                                <td name="t2AS8">{this.playerGetsStroke(this.state.team2A, this.state.team2AStrokes, this.getHoleNumberByPosition(7))}</td>
                                <td name="t2AS9">{this.playerGetsStroke(this.state.team2A, this.state.team2AStrokes, this.getHoleNumberByPosition(8))}</td>
                            </tr>
                            <tr>
                                <td>
                                    <label name="team2B">{this.state.team2B.firstName + " " + this.state.team2B.lastName}</label>
                                </td>
                                <td>
                                    <label name="team2BHandicap">{this.getPlayerHandicap(this.state.team2B)}</label>
                                </td>
                                <td>
                                    <label name="team2BTees">{this.state.team2B.teePreference}</label>
                                </td>
                                <td name="team2BStrokes">{this.state.team2BStrokes}</td>
                                <td name="t2BS1">{this.playerGetsStroke(this.state.team2B, this.state.team2BStrokes, this.getHoleNumberByPosition(0))}</td>
                                <td name="t2BS2">{this.playerGetsStroke(this.state.team2B, this.state.team2BStrokes, this.getHoleNumberByPosition(1))}</td>
                                <td name="t2BS3">{this.playerGetsStroke(this.state.team2B, this.state.team2BStrokes, this.getHoleNumberByPosition(2))}</td>
                                <td name="t2BS4">{this.playerGetsStroke(this.state.team2B, this.state.team2BStrokes, this.getHoleNumberByPosition(3))}</td>
                                <td name="t2BS5">{this.playerGetsStroke(this.state.team2B, this.state.team2BStrokes, this.getHoleNumberByPosition(4))}</td>
                                <td name="t2BS6">{this.playerGetsStroke(this.state.team2B, this.state.team2BStrokes, this.getHoleNumberByPosition(5))}</td>
                                <td name="t2BS7">{this.playerGetsStroke(this.state.team2B, this.state.team2BStrokes, this.getHoleNumberByPosition(6))}</td>
                                <td name="t2BS8">{this.playerGetsStroke(this.state.team2B, this.state.team2BStrokes, this.getHoleNumberByPosition(7))}</td>
                                <td name="t2BS9">{this.playerGetsStroke(this.state.team2B, this.state.team2BStrokes, this.getHoleNumberByPosition(8))}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        golf: state.golf,
    };
};

const actionCreators = { getTeams, getPlayers, getCourses };

export default connect(mapStateToProps, actionCreators)(Scorecard);
