import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams, addTeam } from "../../Actions/GolfActions";
import Team from "./Team";

export class Teams extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTeamMemberIds: [],
        };

        this.handleSelectionBoxChange = this.handleSelectionBoxChange.bind(this);
    }

    componentDidMount() {
        // this.props.getTeams("Teams_Testing.json");
        this.props.getTeams("http://localhost:8082/getAllTeams");
    }

    handleSelectionBoxChange(event) {
        let selectedIds = [].slice.call(event.target.selectedOptions).map((option) => parseInt(option.value));
        this.setState({
            selectedTeamMemberIds: selectedIds,
        });
    }

    handleSubmitClick = () => {
        var teamNumber = this.findTeamNumber();
        this.props.addTeam(teamNumber, this.state.selectedTeamMemberIds);
    };

    submitButtonDisabled() {
        return this.state.selectedTeamMemberIds.length !== 2;
    }

    findTeamNumber() {
        var teamNumber = 1;
        for (var i = 1; i < this.props.golf.teams.length + 1; i++) {
            teamNumber = i;
            var found = false;
            for (var team in this.props.golf.teams) {
                if (this.props.golf.teams[team].teamNumber === i) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                break;
            } else {
                teamNumber += 1;
            }
        }
        return teamNumber;
    }

    render() {
        return (
            <div>
                <h1>Teams</h1>
                <br />
                <div>
                    <h2>Add Team</h2>
                    <br />
                    <select name="playersSelectionBox" multiple={true} onChange={this.handleSelectionBoxChange}>
                        {this.props.golf.players
                            .filter((player) => !this.props.golf.teams.some((team) => team.teamMemberIds.includes(player.id)))
                            .map((player) => {
                                return (
                                    <option key={player.id} value={player.id}>
                                        {player.firstName + " " + player.lastName}
                                    </option>
                                );
                            })}
                    </select>
                    <br />
                    <button name="submit" onClick={this.handleSubmitClick} disabled={this.submitButtonDisabled()}>
                        Submit
                    </button>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h2>Team List</h2>
                    <table
                        style={{
                            textAlign: "left",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "50%",
                        }}
                    >
                        <tr>
                            <th>Team Number</th>
                            <th>Team Members</th>
                            <th></th>
                        </tr>
                        {this.props.golf.teams !== undefined &&
                            this.props.golf.teams.map((t) => {
                                return <Team key={t.teamNumber} team={t} />;
                            })}
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

const actionCreators = { getTeams, addTeam };

export default connect(mapStateToProps, actionCreators)(Teams);
