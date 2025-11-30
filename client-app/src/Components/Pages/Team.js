import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTeam, getDivisions } from "../../Actions/GolfActions";
import CommonMethods from "../../Commons/commonMethods";

export class Team extends Component {
    componentDidMount() {
        this.props.getDivisions();
    }

    getTeamMemberNames() {
        return CommonMethods.getTeamMemberNames(this.props.team, this.props.players);
    }

    getDivisionName() {
        var retval = "";
        if (this.props.divisions.length > 0) {
            var division = this.props.divisions.find((d) => d.id === this.props.team.divisionId);
            if (division === undefined) {
                retval = "Temporary Team";
            } else {
                retval = division.name;
            }
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
                    <label name="division">{this.getDivisionName()}</label>
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
        divisions: state.golf.divisions,
    };
};

const actionCreators = { removeTeam, getDivisions };

export default connect(mapStateToProps, actionCreators)(Team);
