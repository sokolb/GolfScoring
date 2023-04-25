import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTeam } from "../../Actions/GolfActions";
import CommonMethods from "../../Commons/commonMethods";

export class Team extends Component {
    getTeamMemberNames() {
        return CommonMethods.getTeamMemberNames(this.props.team, this.props.players);
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
                    {this.props.showDeleteButton && (
                        <button name="delete" onClick={() => this.props.removeTeam(this.props.team.id)}>
                            Delete
                        </button>
                    )}
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
