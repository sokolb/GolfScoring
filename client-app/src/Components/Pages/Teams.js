import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams, addTeam, getPlayers } from "../../Actions/GolfActions";
import Team from "./Team";
import CommonMethods from "../../Commons/commonMethods";

export class Teams extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTeamMemberId1: -1,
            selectedTeamMemberId2: -1,
            selectedDivisionId: -1,
            forceAB: false,
        };

        this.handleSelectionBox1Change = this.handleSelectionBox1Change.bind(this);
        this.handleSelectionBox2Change = this.handleSelectionBox2Change.bind(this);
        this.handleDivisionSelectionChange = this.handleDivisionSelectionChange.bind(this);
        // this.handleChkForceABChange = this.handleChkForceABChange(this);
    }

    componentDidMount() {
        this.props.getPlayers("http://localhost:8082/getAllPlayers");
        this.props.getTeams("http://localhost:8082/getAllTeams");
    }

    handleChkForceABChange = (event) => {
        this.setState({
            forceAB: event.target.checked,
        });
    };

    handleSelectionBox1Change(event) {
        let selectedId = [].slice.call(event.target.selectedOptions).map((option) => parseInt(option.value));
        this.setState({
            selectedTeamMemberId1: selectedId,
        });
    }

    handleSelectionBox2Change(event) {
        let selectedId = [].slice.call(event.target.selectedOptions).map((option) => parseInt(option.value));
        this.setState({
            selectedTeamMemberId2: selectedId,
        });
    }

    handleDivisionSelectionChange(event) {
        this.setState({
            selectedDivisionId: event.target.value,
        });
    }

    handleSubmitClick = () => {
        var teamNumber = this.findTeamNumber();
        var teamMembers = [
            { playerId: this.state.selectedTeamMemberId1[0], APlayer: true },
            { playerId: this.state.selectedTeamMemberId2[0], APlayer: false },
        ];
        this.props.addTeam(teamNumber, teamMembers, this.state.selectedDivisionId, this.state.forceAB);
        this.setState({
            selectedTeamMemberId1: -1,
            selectedTeamMemberId2: -1,
            forceAB: false,
        });
    };

    submitButtonDisabled() {
        return !(this.state.selectedTeamMemberId1[0] > -1 && this.state.selectedTeamMemberId2[0] > -1 && this.state.selectedTeamMemberId1[0] !== this.state.selectedTeamMemberId2[0]);
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

    getArrayOfDivisionOptions() {
        var retval = [];
        retval.push(
            <option value="-1" key="-1">
                Temporary Team
            </option>
        );
        if (this.props.golf.loggedInUser !== undefined) {
            this.props.golf.divisions.forEach((d) => {
                retval.push(
                    <option key={d.id} value={d.id}>
                        {d.name}
                    </option>
                );
            });
        }
        return retval;
    }

    render() {
        return (
            <div>
                <div name="addTeam">
                    <h2>Add Team</h2>
                    <br />
                    <select key="playersSelectionBox1" name="playersSelectionBox1" style={{ height: "300px" }} multiple={true} onChange={this.handleSelectionBox1Change}>
                        {this.props.golf.players
                            .sort((a, b) => {
                                var firstNameA = a.firstName.toUpperCase();
                                var firstNameB = b.firstName.toUpperCase();
                                if (firstNameA < firstNameB) {
                                    return -1;
                                }
                                if (firstNameA > firstNameB) {
                                    return 1;
                                }
                                return 0;
                            })
                            .map((player) => {
                                return (
                                    <option key={player.id} value={player.id}>
                                        {player.firstName + " " + player.lastName}
                                    </option>
                                );
                            })}
                    </select>
                    <select key="playersSelectionBox2" name="playersSelectionBox2" style={{ height: "300px" }} multiple={true} onChange={this.handleSelectionBox2Change}>
                        {this.props.golf.players
                            .sort((a, b) => {
                                var firstNameA = a.firstName.toUpperCase();
                                var firstNameB = b.firstName.toUpperCase();
                                if (firstNameA < firstNameB) {
                                    return -1;
                                }
                                if (firstNameA > firstNameB) {
                                    return 1;
                                }
                                return 0;
                            })
                            .map((player) => {
                                return (
                                    <option key={player.id} value={player.id}>
                                        {player.firstName + " " + player.lastName}
                                    </option>
                                );
                            })}
                    </select>
                    <br />
                    <select name="divisions" value={this.state.selectedDivisionId} onChange={this.handleDivisionSelectionChange}>
                        {this.getArrayOfDivisionOptions()}
                    </select>
                    <br />
                    <input name="chkForceAB" type="checkbox" checked={this.state.forceAB} onChange={this.handleChkForceABChange} />
                    <label name="lblForceAB">Force A and B player</label>
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
                        <tbody>
                            <tr key="header">
                                <th>Division</th>
                                <th>Team Members</th>
                                <th></th>
                            </tr>
                            {this.props.golf.teams !== undefined &&
                                this.props.golf.teams
                                    .sort((a, b) => {
                                        var divisionAname = CommonMethods.getDivisionById(a.divisionId, this.props.golf.divisions).name;
                                        var divisionBname = CommonMethods.getDivisionById(b.divisionId, this.props.golf.divisions).name;

                                        if (divisionAname === "Temporary Team") {
                                            return 1; // Move "Temporary Team" to the end
                                        }
                                        if (divisionBname === "Temporary Team") {
                                            return -1; // Move "Temporary Team" to the end
                                        }

                                        if (divisionAname < divisionBname) {
                                            return -1;
                                        }
                                        if (divisionAname > divisionBname) {
                                            return 1;
                                        }
                                        return 0;
                                    })
                                    .map((t) => {
                                        return <Team key={t.id} team={t} showDeleteButton={this.props.golf.loggedInUser !== undefined || t.divisionId === -1} />;
                                    })}
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

const actionCreators = { getTeams, addTeam, getPlayers };

export default connect(mapStateToProps, actionCreators)(Teams);
