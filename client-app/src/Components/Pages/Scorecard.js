import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams, getPlayers, getCourses } from "../../Actions/GolfActions";

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
        };
    }

    componentDidMount() {
        console.log("about to call getAllCourses");
        this.props.getCourses("http://localhost:8082/getAllCourses");

        if (this.props.team1Id > -1 && this.props.team2Id > -1) {
            this.calculateScorecard();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.team1A !== this.state.team1A || prevState.team1B !== this.state.team1B || prevState.team2A !== this.state.team2A || prevState.team2B !== this.state.team2B) {
            this.findAndSetStrokes();
        }
    }

    calculateScorecard() {
        this.findAndSetAandBPlayers();
    }

    findAndSetAandBPlayers() {
        this.setState({
            team1A: this.findAPlayer(this.props.team1Id),
            team1B: this.findBPlayer(this.props.team1Id),
            team2A: this.findAPlayer(this.props.team2Id),
            team2B: this.findBPlayer(this.props.team2Id),
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Hole Handicap Index</td>
                                <td name="hole1Handicap"></td>
                                <td name="hole2Handicap"></td>
                                <td name="hole3Handicap"></td>
                                <td name="hole4Handicap"></td>
                                <td name="hole5Handicap"></td>
                                <td name="hole6Handicap"></td>
                                <td name="hole7Handicap"></td>
                                <td name="hole8Handicap"></td>
                                <td name="hole9Handicap"></td>
                            </tr>
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
