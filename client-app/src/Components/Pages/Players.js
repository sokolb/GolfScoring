import React, { Component } from "react";
import { connect } from "react-redux";
import { addPlayer } from "../../Actions/GolfActions";

export class Players extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            GHIN: "",
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleGHINChange = this.handleGHINChange.bind(this);
    }

    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value,
        });
    }

    handleLastNameChange(event) {
        this.setState({
            lastName: event.target.value,
        });
    }

    handleGHINChange(event) {
        this.setState({
            GHIN: event.target.value,
        });
    }

    handleSubmitClick = () => {
        this.props.addPlayer(this.state.firstName, this.state.lastName, this.state.GHIN);
    };

    render() {
        return (
            <div>
                <h1>Players</h1>
                <br />
                <label>First Name:</label>
                <input name="firstName" onChange={this.handleFirstNameChange} />
                <br />
                <label>Last Name:</label>
                <input name="lastName" onChange={this.handleLastNameChange} />
                <br />
                <label>GHIN:</label>
                <input name="GHIN" onChange={this.handleGHINChange} />
                <br />
                <button name="submit" onClick={this.handleSubmitClick}>
                    Submit
                </button>
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
    addPlayer,
};

export default connect(mapStateToProps, actionCreators)(Players);
