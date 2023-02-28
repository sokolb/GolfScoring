import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams, getPlayers } from "../../Actions/GolfActions";
import CommonMethods from "../../Commons/commonMethods";

export class Matches extends Component {
    componentDidMount() {
        this.props.getPlayers("http://localhost:8082/getAllPlayers");
        this.props.getTeams("http://localhost:8082/getAllTeams");
    }

    getTeamNumberAndNames(team) {
        return team.teamNumber + ": " + CommonMethods.getTeamMemberNames(team, this.props.golf.players);
    }

    handleSubmitClick = () => {};

    render() {
        return (
            <div>
                <h1>Matches</h1>
                <br />
                <div>
                    <h2>Create Match</h2>
                    <br />
                    <label>Date:</label>
                    <input name="date" type="date" />
                    <br />
                    <label>Team 1:</label>
                    <select name="team1">
                        {this.props.golf.teams !== undefined &&
                            this.props.golf.teams.map((t) => {
                                return (
                                    <option key={t.teamNumber} value={t.teamNumber}>
                                        {this.getTeamNumberAndNames(t)}
                                    </option>
                                );
                            })}
                    </select>
                    <br />
                    <label>Team 2:</label>
                    <select name="team2">
                        {this.props.golf.teams !== undefined &&
                            this.props.golf.teams.map((t) => {
                                return (
                                    <option key={t.teamNumber} value={t.teamNumber}>
                                        {this.getTeamNumberAndNames(t)}
                                    </option>
                                );
                            })}
                    </select>
                    <br />
                    <label>Front/Back:</label>
                    <select name="frontBackNine">
                        <option value="frontNine">Front Nine</option>
                        <option value="backNine">Back Nine</option>
                    </select>
                    <br />
                    <button name="createScoreCard">Create Score Card</button>
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

const actionCreators = { getTeams, getPlayers };

export default connect(mapStateToProps, actionCreators)(Matches);