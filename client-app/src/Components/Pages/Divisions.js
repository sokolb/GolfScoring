import React, { Component } from "react";
import { connect } from "react-redux";
import { addDivision, getDivisions } from "../../Actions/GolfActions";
import Division from "./Division";

export class Divisions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
        };

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    componentDidMount() {
        this.props.getDivisions("http://localhost:8082/getAllDivisions");
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value,
        });
    }

    handleSubmitClick = () => {
        this.props.addDivision(this.state.name);
        this.setState({
            name: "",
        });
    };

    submitButtonDisabled() {
        return this.state.name === "";
    }

    render() {
        return (
            <div>
                {this.props.golf.loggedInUser !== undefined && (
                    <div name="addDivision">
                        <h2>Add Division</h2>

                        <br />
                        <label>Name:</label>
                        <input name="name" onChange={this.handleNameChange} value={this.state.name} />
                        <br />
                        <button name="submit" onClick={this.handleSubmitClick} disabled={this.submitButtonDisabled()}>
                            Submit
                        </button>
                    </div>
                )}

                <div class="section-to-print" style={{ textAlign: "center" }}>
                    <h2>Division List</h2>
                    <table
                        name="divisions"
                        style={{
                            textAlign: "left",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "80%",
                        }}
                    >
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                        {this.props.golf.divisions !== undefined &&
                            this.props.golf.divisions.map((d) => {
                                return <Division key={d.id} division={d} />;
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

const actionCreators = {
    addDivision,
    getDivisions,
};

export default connect(mapStateToProps, actionCreators)(Divisions);
