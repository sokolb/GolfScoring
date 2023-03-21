import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams, getPlayers, getCourses } from "../../Actions/GolfActions";
import CommonMethods from "../../Commons/commonMethods";

export class Scorecard extends Component {
    componentDidMount() {
        this.props.getCourses("http://localhost:8082/getAllCourses");
    }

    render() {
        return (
            <div>
                <h1>Scorecard</h1>
                <br />
                <div>
                    <label>Date: </label>
                    <label name="date">today's date</label>
                    <br />
                    <label name="frontBackNine">Front/Back Nine</label>
                    <br />
                    <table name="scoreCardTable"></table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        golf: state.golf,
    };
};

const actionCreators = { getTeams, getPlayers, getCourses };

export default connect(mapStateToProps, actionCreators)(Scorecard);
