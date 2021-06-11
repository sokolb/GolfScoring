import NavBar from "../NavBar/Navbar";
import "./App.css";
import Login from "../Login/Login";
import { Component } from "react";
import { connect } from "react-redux";

export class App extends Component {
    render() {
        return (
            <div className="App">
                {this.props.loggedInUser !== undefined && (
                    <div>
                        <label name="loggedInUser">{"Logged in user: " + this.props.loggedInUser}</label>
                        <NavBar />
                    </div>
                )}
                {this.props.loggedInUser === undefined && <Login />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        golf: state.survey,
    };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(App);
