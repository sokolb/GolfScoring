import React, { Component } from "react";
import { connect } from "react-redux";
import { removeDivision } from "../../Actions/GolfActions";

export class Division extends Component {
    render() {
        return (
            <tr>
                <td>
                    <label name="divisionName">{this.props.division.name}</label>
                </td>
                <td>
                    <button name="delete" onClick={() => this.props.removeDivision(this.props.division.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        divisions: state.golf.divisions,
    };
};

const actionCreators = { removeDivision };

export default connect(mapStateToProps, actionCreators)(Division);
