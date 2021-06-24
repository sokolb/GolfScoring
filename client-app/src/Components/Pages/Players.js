import React, { Component } from "react";
import { connect } from "react-redux";
import { addPlayer, getPlayers } from "../../Actions/GolfActions";
import Player from "./Player";

export class Players extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            GHIN: "",
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleGHINChange = this.handleGHINChange.bind(this);
    }

    componentDidMount() {
        this.props.getPlayers("Players_Testing.json");
    }

    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value,
        });
    }

    handleLastNameChange(event) {
        this.setState({
            lastName: event.target.value,
        });
    }

    handleGHINChange(event) {
        this.setState({
            GHIN: event.target.value,
        });
    }

    handleSubmitClick = () => {
        this.props.addPlayer(this.state.firstName, this.state.lastName, this.state.GHIN, this.props.golf.userToken);
    };

    render() {
        return (
            <div>
                <h1>Players</h1>
                <br />
                <div>
                    <h2>Add Player</h2>
                    <br />
                    <label>First Name:</label>
                    <input name="firstName" onChange={this.handleFirstNameChange} />
                    <br />
                    <label>Last Name:</label>
                    <input name="lastName" onChange={this.handleLastNameChange} />
                    <br />
                    <label>GHIN:</label>
                    <input name="GHIN" onChange={this.handleGHINChange} />
                    <br />
                    <button name="submit" onClick={this.handleSubmitClick}>
                        Submit
                    </button>
                </div>
                <div>
                    <h2>Player List</h2>
                    {this.props.golf.players !== undefined &&
                        this.props.golf.players.map((p) => {
                            return <Player key={p.GHIN} player={p} />;
                        })}
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
    addPlayer,
    getPlayers,
};

export default connect(mapStateToProps, actionCreators)(Players);
