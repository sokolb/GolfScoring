import React, { Component } from "react";
import { connect } from "react-redux";
import { addPlayer, getPlayers } from "../../Actions/GolfActions";
import Player from "./Player";

export class Teams extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Teams</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    golf: state.golf,
  };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(Teams);
