import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams, getPlayers, getCourses } from "../../Actions/GolfActions";

const today = new Date();
const formattedTodayDate = today.toLocaleDateString("en-US");

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
                    <label name="dateToday">Date: {formattedTodayDate}</label>
                    <br />
                    <label name="frontBackNine">{this.props.frontBackNine === "frontNine" ? "Front Nine" : "Back Nine"}</label>
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
