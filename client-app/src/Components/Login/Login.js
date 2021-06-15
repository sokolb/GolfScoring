import React, { Component } from "react";
import { logInUser } from "../../Actions/GolfActions";
import { connect } from "react-redux";
import GhinDataService from "../../Ghin/GhinDataService";

export class Login extends Component {
    render() {
        return (
            <div>
                <h1>Login:</h1>
                <br />
                <label>Email Address</label>
                <input name="userName"></input>
                <br />
                <label>Password</label>
                <input name="password"></input>
                <br />
                <button name="btnSubmit" onClick={this.handleSubmitClick}>
                    Submit
                </button>
            </div>
        );
    }

    handleSubmitClick = () => {
        this.props.logInUser("", "");
    };
}

const mapStateToProps = (state) => {
    return {
        golf: state.golf,
    };
};

const actionCreators = {
    logInUser,
};

export default connect(mapStateToProps, actionCreators)(Login);
