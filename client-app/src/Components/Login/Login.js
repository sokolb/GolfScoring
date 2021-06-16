import React, { Component } from "react";
import { logInUser } from "../../Actions/GolfActions";
import { connect } from "react-redux";

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUserNameChange(event) {
        this.setState({
            userName: event.target.value,
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <h1>Login:</h1>
                <br />
                <label>Email Address or GHIN</label>
                <input name="userName" onChange={this.handleUserNameChange}></input>
                <br />
                <label>Password</label>
                <input name="password" onChange={this.handlePasswordChange}></input>
                <br />
                <button name="btnSubmit" onClick={this.handleSubmitClick}>
                    Submit
                </button>
            </div>
        );
    }

    handleSubmitClick = () => {
        this.props.logInUser(this.state.userName, this.state.password);
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
