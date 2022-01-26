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
        // this.props.getPlayers("Players_Testing.json");
        this.props.getPlayers();
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
        this.props.addPlayer(
            this.state.firstName,
            this.state.lastName,
            this.state.GHIN,
            this.props.golf.userToken
        );
    };

    submitButtonDisabled() {
        return (
            this.state.firstName === "" ||
            this.state.lastName === "" ||
            this.state.GHIN === "" ||
            this.playerExistsWithGHIN(this.state.GHIN)
        );
    }

    playerExistsWithGHIN(targetGHIN) {
        let player = this.props.golf.players.find(
            (player) => player.GHIN.toString() === targetGHIN
        );
        return player !== undefined;
    }

    render() {
        return (
            <div>
                <h1>Players</h1>
                <br />
                <div>
                    <h2>Add Player</h2>
                    <br />
                    <label>First Name:</label>
                    <input
                        name="firstName"
                        onChange={this.handleFirstNameChange}
                    />
                    <br />
                    <label>Last Name:</label>
                    <input
                        name="lastName"
                        onChange={this.handleLastNameChange}
                    />
                    <br />
                    <label>GHIN:</label>
                    <input name="GHIN" onChange={this.handleGHINChange} />
                    <br />
                    <button
                        name="submit"
                        onClick={this.handleSubmitClick}
                        disabled={this.submitButtonDisabled()}
                    >
                        Submit
                    </button>
                </div>
                {this.props.golf.errorMessage !== undefined &&
                    this.props.golf.errorMessage.length > 0 && (
                        <label name="lblError" style={{ color: "red" }}>
                            {this.props.golf.errorMessage}
                        </label>
                    )}
                <div style={{ textAlign: "center" }}>
                    <h2>Player List</h2>
                    <table
                        style={{
                            textAlign: "left",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "50%",
                        }}
                    >
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>GHIN</th>
                            <th>Handicap</th>
                            <th></th>
                        </tr>
                        {this.props.golf.players !== undefined &&
                            this.props.golf.players.map((p) => {
                                return <Player key={p.GHIN} player={p} />;
                            })}
                    </table>
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
