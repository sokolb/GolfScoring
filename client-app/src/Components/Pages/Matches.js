import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams, getPlayers } from "../../Actions/GolfActions";
import CommonMethods from "../../Commons/commonMethods";

export class Matches extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date().toISOString().split("T")[0],
            selectedTeam1: -1,
            selectedTeam2: -1,
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTeam1Change = this.handleTeam1Change.bind(this);
        this.handleTeam2Change = this.handleTeam2Change.bind(this);
    }

    handleDateChange(event) {
        this.setState({
            selectedDate: event.target.value,
        });
    }

    handleTeam1Change(event) {
        this.setState({
            selectedTeam1: event.target.value,
        });
    }

    handleTeam2Change(event) {
        this.setState({
            selectedTeam2: event.target.value,
        });
    }

    componentDidMount() {
        this.props.getPlayers("http://localhost:8082/getAllPlayers");
        this.props.getTeams("http://localhost:8082/getAllTeams");
    }

    getTeamOptions() {
        var teampOptions = [];
        const emptyOption = (
            <option key="teamEmpty" value={-1}>
                Select a team
            </option>
        );

        if (this.props.golf.teams !== undefined) {
            teampOptions = this.props.golf.teams.map((t) => {
                return (
                    <option key={t.teamNumber} value={t.teamNumber}>
                        {this.getTeamNumberAndNames(t)}
                    </option>
                );
            });
        }

        var options = [emptyOption, ...teampOptions];

        return options;
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
                    <input name="date" type="date" value={this.state.selectedDate} onChange={this.handleDateChange} />
                    <br />
                    <label>Team 1:</label>
                    <select name="team1" value={this.state.team1Selected} onChange={this.handleTeam1Change}>
                        {this.getTeamOptions()}
                    </select>
                    <br />
                    <label>Team 2:</label>
                    <select name="team2" value={this.state.team2Selected} onChange={this.handleTeam2Change}>
                        {this.getTeamOptions()}
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
