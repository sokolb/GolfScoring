import React, { Component } from "react";
import { removePlayer } from "../../Actions/GolfActions";
import { connect } from "react-redux";

export class Player extends Component {
    render() {
        return (
            <tr>
                <td name="firstName">{this.props.player.firstName}</td>
                <td name="lastName">{this.props.player.lastName}</td>
                <td name="GHIN">{this.props.player.GHIN}</td>
                <td className="handicap-column" name="handicapIndex">
                    {this.props.player.handicap}
                </td>
                <td name="teePreference">{this.props.player.teePreference}</td>
                <td className="col-numeric" name="frontNine">
                    {this.props.player.frontNine}
                </td>
                <td className="col-numeric" name="backNine">
                    {this.props.player.backNine}
                </td>
                <td className="col-actions">
                    {this.props.showDeleteButton && (
                        <button name="delete" className="btn-danger btn-sm section-to-not-print" onClick={() => this.props.removePlayer(this.props.player.id)}>
                            Delete
                        </button>
                    )}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const actionCreators = {
    removePlayer,
};

export default connect(mapStateToProps, actionCreators)(Player);
