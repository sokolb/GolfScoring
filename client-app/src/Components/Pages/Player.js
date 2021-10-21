import React, { Component } from "react";
import { connect } from "react-redux";

export class Player extends Component {
    render() {
        return (
            <tr>
                <td>
                    <label name="firstName">{this.props.player.firstName}</label>
                </td>
                <td>
                    <label name="lastName">{this.props.player.lastName}</label>
                </td>
                <td>
                    <label name="GHIN">{this.props.player.GHIN}</label>
                </td>
                <td>
                    <label name="handicap">{this.props.player.handicap}</label>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(Player);
