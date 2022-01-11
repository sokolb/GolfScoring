import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTeam } from "../../Actions/GolfActions";

export class Team extends Component {
    getTeamMemberNames() {
        return this.props.players
            .filter((player) => this.props.team.teamMemberIds.includes(player.id))
            .map((player) => player.firstName + " " + player.lastName)
            .join(" | ");
    }

    render() {
        return (
            <tr>
                <td>
                    <label name="teamNumber">{this.props.team.teamNumber}</label>
                </td>
                <td>
                    <label name="teamMembers">{this.getTeamMemberNames()}</label>
                </td>
                <td>
                    <button name="delete" onClick={() => this.props.removeTeam(this.props.team.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        players: state.golf.players,
    };
};

const actionCreators = { removeTeam };

export default connect(mapStateToProps, actionCreators)(Team);
