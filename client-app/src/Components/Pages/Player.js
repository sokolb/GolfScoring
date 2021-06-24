import React, { Component } from "react";
import { connect } from "react-redux";

export class Player extends Component {
    render() {
        return (
            <div>
                <label name="firstName">{this.props.player.firstName}</label>
                <label name="lastName">{this.props.player.lastName}</label>
                <label name="GHIN">{this.props.player.GHIN}</label>
                <label name="handicap">{this.props.player.handicap}</label>;
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(Player);
