import React, { Component } from "react";
import { connect } from "react-redux";

export class Players extends Component {
    render() {
        return (
            <div>
                <h1>Players</h1>
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

export default connect(mapStateToProps, actionCreators)(Players);
