import NavBar from "../NavBar/Navbar";
import "./App.css";
import Login from "../Login/Login";
import { Component } from "react";
import { connect } from "react-redux";

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="App">
                {console.log("here")}
                {console.log(this.props)}
                {this.props.golf.loggedInUser !== undefined && (
                    <div>
                        <label name="loggedInUser">{"Logged in user: " + this.props.golf.loggedInUser}</label>
                        <NavBar />
                    </div>
                )}
                {this.props.golf.loggedInUser === undefined && <Login />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        golf: state.golf,
    };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(App);
