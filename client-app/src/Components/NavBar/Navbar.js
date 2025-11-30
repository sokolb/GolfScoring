import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentPage, setLoggedInUser } from "../../Actions/GolfActions";
import packageJson from "../../../package.json";
import "./Navbar.css";

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

    isActivePage(pageName) {
        return this.props.golf.currentPage === pageName;
    }

    render() {
        const isLoggedIn = this.props.golf.loggedInUser !== undefined;

        return (
            <nav className="navbar">
                <div className="navbar-brand">
                    <span className="navbar-brand-icon">⛳</span>
                    <span>Golf Scoring</span>
                </div>

                <div className="navbar-nav">
                    <button name="btnPlayers" className={`nav-button ${this.isActivePage("Players") ? "active" : ""}`} onClick={() => this.handleNavigationButtonClick("Players")}>
                        Players
                    </button>
                    <button name="btnTeams" className={`nav-button ${this.isActivePage("Teams") ? "active" : ""}`} onClick={() => this.handleNavigationButtonClick("Teams")}>
                        Teams
                    </button>
                    {isLoggedIn && (
                        <button name="btnDivisions" className={`nav-button ${this.isActivePage("Divisions") ? "active" : ""}`} onClick={() => this.handleNavigationButtonClick("Divisions")}>
                            Divisions
                        </button>
                    )}
                    <button name="btnMatches" className={`nav-button ${this.isActivePage("Matches") ? "active" : ""}`} onClick={() => this.handleNavigationButtonClick("Matches")}>
                        Matches
                    </button>
                </div>

                <div className="navbar-actions">
                    <span className="navbar-version" name="lblVersion">
                        v{version}
                    </span>
                    <button name="btnLogin" className={`nav-button ${isLoggedIn ? "nav-button-logout" : "nav-button-login"}`} onClick={() => this.handleLogInLogOutClick()}>
                        {this.getLoginLogoutText()}
                    </button>
                </div>
            </nav>
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
