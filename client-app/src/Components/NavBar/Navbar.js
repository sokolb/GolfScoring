import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../Actions/GolfActions";

export class NavBar extends Component {
    render() {
        return (
            <div>
                <button name="btnPlayers" onClick={() => this.handleNavigationButtonClick("Players")}>
                    Players
                </button>
            </div>
        );
    }

    handleNavigationButtonClick(pageName) {
        this.props.setCurrentPage(pageName);
    }
}

const mapStateToProps = (state) => {
    return {
        golf: state.golf,
    };
};

const actionCreators = {
    setCurrentPage,
};

export default connect(mapStateToProps, actionCreators)(NavBar);
