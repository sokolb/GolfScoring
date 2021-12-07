import NavBar from "../NavBar/Navbar";
import "./App.css";
import Login from "../Login/Login";
import { Component } from "react";
import { connect } from "react-redux";
import Players from "../Pages/Players";
import Teams from "../Pages/Teams";

export class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.golf.loggedInUser !== undefined && (
          <div>
            <label name="loggedInUser">
              {"Logged in user: " + this.props.golf.loggedInUser}
            </label>
            <NavBar />
          </div>
        )}
        {this.props.golf.loggedInUser === undefined && <Login />}
        {this.props.golf.currentPage === "Players" && <Players />}
        {this.props.golf.currentPage === "Teams" && <Teams />}
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
