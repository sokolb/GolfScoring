import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams, getPlayers, getCourses } from "../../Actions/GolfActions";
import HoleHandicaps from "./HoleHandicaps";
import PlayerScorecard from "./PlayerScorecard";

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

    handlePrint = () => {
        const content = document.getElementByName("scorecard").innerHTML;
        const printWindow = window.open("", "Print");
        printWindow.document.write(content);
        printWindow.document.close();

        // Add landscape orientation rule to printWindow document
        const style = printWindow.document.createElement("style");
        style.textContent = "@page { size: landscape; }";
        printWindow.document.head.appendChild(style);

        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <button name="print" onClick={this.handlePrint} style={{ width: "200px", fontSize: "16px", fontWeight: "bold" }}>
                    Print Scorecard
                </button>
                <br />
                <div name="scorecard">
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
                            <PlayerScorecard name="player1A" player={this.state.team1A} course={this.getCourseByName(this.state.team1A.teePreference)} frontBackNine={this.props.frontBackNine} strokes={this.state.team1AStrokes} />
                            <PlayerScorecard name="player1B" player={this.state.team1B} course={this.getCourseByName(this.state.team1B.teePreference)} frontBackNine={this.props.frontBackNine} strokes={this.state.team1BStrokes} />
                            <PlayerScorecard name="player2A" player={this.state.team2A} course={this.getCourseByName(this.state.team2A.teePreference)} frontBackNine={this.props.frontBackNine} strokes={this.state.team2AStrokes} />
                            <PlayerScorecard name="player2B" player={this.state.team2B} course={this.getCourseByName(this.state.team2B.teePreference)} frontBackNine={this.props.frontBackNine} strokes={this.state.team2BStrokes} />
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
