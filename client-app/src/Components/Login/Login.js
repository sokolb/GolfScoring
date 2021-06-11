import React, { Component } from "react";
import { setLoggedInUser } from "../../Actions/GolfActions";
import { connect } from "react-redux";

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
                <button name="btnSubmit">Submit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        golf: state.survey,
    };
};

const actionCreators = {
    setLoggedInUser,
};

export default connect(mapStateToProps, actionCreators)(Login);
