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
        };
    }

    componentDidMount() {
        this.props.getCourses("http://localhost:8082/getAllCourses");

        if (this.props.team1Id > -1 && this.props.team2Id > -1) {
            this.calculateAandBPlayer();
        }
    }

    calculateAandBPlayer() {
        this.setState({
            team1A: this.findAPlayer(this.props.team1Id),
            team1B: this.findBPlayer(this.props.team1Id),
            team2A: this.findAPlayer(this.props.team2Id),
            team2B: this.findBPlayer(this.props.team2Id),
        });
    }

    findAPlayer(teamId) {
        var team = this.props.golf.teams.find((team) => team.teamNumber === teamId);
        console.log("TEAM1ID: " + teamId + " TEAM: " + team);
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
                    <table name="scoreCardTable" visible="true">
                        <thead>
                            <tr>
                                <th>TEST</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <label name="team1A">{this.state.team1A.firstName + " " + this.state.team1A.lastName}</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label name="team1B">{this.state.team1B.firstName + " " + this.state.team1B.lastName}</label>
                                </td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <label name="team2A">{this.state.team2A.firstName + " " + this.state.team2A.lastName}</label>
                            </tr>
                            <tr>
                                <label name="team2B">{this.state.team2B.firstName + " " + this.state.team2B.lastName}</label>
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
