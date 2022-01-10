import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams } from "../../Actions/GolfActions";
import Team from "./Team";

export class Teams extends Component {
    componentDidMount() {
        this.props.getTeams("Teams_Testing.json");
    }

    render() {
        return (
            <div>
                <h1>Teams</h1>
                <br />
                <div>
                    <h2>Add Team</h2>
                    <br />
                    <button name="submit">Submit</button>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h2>Team List</h2>
                    <table
                        style={{
                            textAlign: "left",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "50%",
                        }}
                    >
                        <tr>
                            <th>Team Number</th>
                            <th>Team Members</th>
                            <th></th>
                        </tr>
                        {this.props.golf.teams !== undefined &&
                            this.props.golf.teams.map((t) => {
                                return <Team key={t.teamNumber} team={t} />;
                            })}
                    </table>
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

const actionCreators = { getTeams };

export default connect(mapStateToProps, actionCreators)(Teams);
