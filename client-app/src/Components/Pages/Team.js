import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTeam } from "../../Actions/GolfActions";

export class Team extends Component {
    getTeamMemberNames() {
        var retval = "";
        if (this.props.team.teamMemberIds !== undefined && this.props.team.teamMemberIds !== null) {
            this.props.team.teamMemberIds.forEach((teamMemberId) => {
                if (retval.length > 0) {
                    retval += " | ";
                }
                retval += teamMemberId;
            });
        }
        return retval;
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
    return {};
};

const actionCreators = { removeTeam };

export default connect(mapStateToProps, actionCreators)(Team);
