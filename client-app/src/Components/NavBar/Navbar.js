import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentPage, setLoggedInUser } from "../../Actions/GolfActions";
import packageJson from "../../../package.json";

const version = packageJson.version;

export class NavBar extends Component {
    getLoginLogoutText() {
        return this.props.golf.loggedInUser === undefined ? "Login" : "Logout";
    }

    handleLogInLogOutClick() {
        if (this.props.golf.loggedInUser === undefined) {
            this.handleNavigationButtonClick("Login");
        } else {
            this.props.setLoggedInUser(undefined, undefined);
        }
    }

    handleNavigationButtonClick(pageName) {
        this.props.setCurrentPage(pageName);
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <div style={{ textAlign: "left" }}>
                    <button name="btnLogin" onClick={() => this.handleLogInLogOutClick()}>
                        {this.getLoginLogoutText()}
                    </button>
                </div>
                <div>
                    <button name="btnPlayers" onClick={() => this.handleNavigationButtonClick("Players")}>
                        Players
                    </button>
                    <button name="btnTeams" onClick={() => this.handleNavigationButtonClick("Teams")}>
                        Teams
                    </button>
                    {this.props.golf.loggedInUser !== undefined && (
                        <button name="btnDivisions" onClick={() => this.handleNavigationButtonClick("Divisions")}>
                            Divisions
                        </button>
                    )}
                    <button name="btnMatches" onClick={() => this.handleNavigationButtonClick("Matches")}>
                        Matches
                    </button>
                </div>
                <div style={{ position: "absolute", top: 0, right: 2 }}>
                    <label name="lblVersion" style={{ fontSize: 10 }}>
                        Version: {version}
                    </label>
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
    setCurrentPage,
    setLoggedInUser,
};

export default connect(mapStateToProps, actionCreators)(NavBar);
