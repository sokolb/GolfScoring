import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams, getPlayers } from "../../Actions/GolfActions";
import CommonMethods from "../../Commons/commonMethods";
import Scorecard from "./Scorecard";

export class Matches extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date().toISOString().split("T")[0],
            selectedTeam1: -1,
            selectedTeam2: -1,
            frontBackNine: "frontNine",
            errorMessage: "",
            showScorecard: false,
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTeam1Change = this.handleTeam1Change.bind(this);
        this.handleTeam2Change = this.handleTeam2Change.bind(this);
        this.handleFronBackNineChange = this.handleFronBackNineChange.bind(this);
    }

    handleDateChange(event) {
        this.setState({
            selectedDate: event.target.value,
        });
        this.resetForm();
    }

    handleTeam1Change(event) {
        this.setState({
            selectedTeam1: parseInt(event.target.value, 10),
        });
        this.resetForm();
    }

    handleTeam2Change(event) {
        this.setState({
            selectedTeam2: parseInt(event.target.value, 10),
        });
        this.resetForm();
    }

    handleFronBackNineChange(event) {
        this.setState({
            frontBackNine: event.target.value,
        });
        this.resetForm();
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

    handleSubmitClick = () => {
        this.resetForm();

        if (this.state.selectedTeam1 === -1 || this.state.selectedTeam2 === -1) {
            this.setState({
                errorMessage: "Please select 2 teams",
            });
            return;
        }

        if (this.state.selectedTeam1 === this.state.selectedTeam2) {
            this.setState({
                errorMessage: "Please select 2 different teams",
            });
            return;
        }

        this.setState({
            showScorecard: true,
        });
    };

    resetForm() {
        this.setState({
            showScorecard: false,
            errorMessage: "",
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Create Match</h2>
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
                    <select name="frontBackNine" onChange={this.handleFronBackNineChange}>
                        <option value="frontNine">Front Nine</option>
                        <option value="backNine">Back Nine</option>
                    </select>
                    <br />
                    <button name="createScoreCard" onClick={this.handleSubmitClick}>
                        Create Score Card
                    </button>
                    <br />
                    <label name="errorMessage" style={{ color: "red" }}>
                        {this.state.errorMessage}
                    </label>
                </div>
                <div>{this.state.showScorecard && <Scorecard frontBackNine={this.state.frontBackNine} team1Id={this.state.selectedTeam1} team2Id={this.state.selectedTeam2} />} </div>
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
