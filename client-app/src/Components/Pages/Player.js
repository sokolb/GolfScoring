import React, { Component } from "react";
import { removePlayer } from "../../Actions/GolfActions";
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
        <td>
          <button
            name="delete"
            onClick={() => this.props.removePlayer(this.props.player.id)}
          >
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

const actionCreators = {
  removePlayer,
};

export default connect(mapStateToProps, actionCreators)(Player);
