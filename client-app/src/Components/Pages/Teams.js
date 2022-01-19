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
        this.props.getTeams("Teams_Testing.json");
    }

    handleSelectionBoxChange(event) {
        let selectedIds = [].slice.call(event.target.selectedOptions).map((option) => option.value);
        this.setState({
            selectedTeamMemberIds: selectedIds,
        });
    }

    handleSubmitClick = () => {
        this.props.addTeam(this.state.selectedTeamMemberIds);
    };

    submitButtonDisabled() {
        return this.state.selectedTeamMemberIds.length !== 2;
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
