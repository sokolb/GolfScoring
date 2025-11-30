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
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
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

    handleSubmitClick() {
        this.props.logInUser(this.state.userName, this.state.password);
    }

    render() {
        return (
            <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
                <h1>Login:</h1>
                <br />
                <div className="form-group">
                    <label>Email Address or GHIN</label>
                    <input type="text" name="userName" onChange={this.handleUserNameChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handlePasswordChange} />
                </div>
                <button className="btn-primary" name="btnSubmit" onClick={this.handleSubmitClick}>
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
    logInUser,
};

export default connect(mapStateToProps, actionCreators)(Login);
