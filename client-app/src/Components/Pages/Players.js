import React, { Component } from "react";
import { connect } from "react-redux";
import { addOrUpdatePlayer, getPlayers } from "../../Actions/GolfActions";
import Player from "./Player";

const tees = ["Blue", "White", "Gold", "Red"];

export class Players extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            GHIN: "",
            selectedTeePreference: "White",
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleGHINChange = this.handleGHINChange.bind(this);
        this.handleTeePreferenceSelectionBoxChange = this.handleTeePreferenceSelectionBoxChange.bind(this);
    }

    componentDidMount() {
        // this.props.getPlayers("Players_Testing.json");
        this.props.getPlayers("http://localhost:8082/getAllPlayers");
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
        this.props.addOrUpdatePlayer(-1, this.state.firstName, this.state.lastName, this.state.GHIN, this.state.selectedTeePreference, this.props.golf.userToken);
        this.setState({
            firstName: "",
            lastName: "",
            GHIN: "",
        });
    };

    handleRefreshAllHandicapsClick = () => {
        this.props.golf.players.forEach(player => {
            this.props.addOrUpdatePlayer(player.id, player.firstName, player.lastName, player.GHIN, player.teePreference, this.props.golf.userToken);
        });
    };

    submitButtonDisabled() {
        return this.state.firstName === "" || this.state.lastName === "" || this.state.GHIN === "" || this.playerExistsWithGHIN(this.state.GHIN);
    }

    playerExistsWithGHIN(targetGHIN) {
        let player = this.props.golf.players.find((player) => player.GHIN.toString() === targetGHIN);
        return player !== undefined;
    }

    handleTeePreferenceSelectionBoxChange(event) {
        this.setState({
            selectedTeePreference: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <h1>Players</h1>
                <br />
                <div>
                    <h2>Add Player</h2>
                    <br />
                    <button name="refreshAllHandicaps" onClick={this.handleRefreshAllHandicapsClick}>Refresh All Handicaps</button>
                    <br />
                    <label>First Name:</label>
                    <input name="firstName" onChange={this.handleFirstNameChange} value={this.state.firstName} />
                    <br />
                    <label>Last Name:</label>
                    <input name="lastName" onChange={this.handleLastNameChange} value={this.state.lastName} />
                    <br />
                    <label>GHIN:</label>
                    <input name="GHIN" onChange={this.handleGHINChange} value={this.state.GHIN} />
                    <br />
                    <select name="teePreferenceSelectionBox" onChange={this.handleTeePreferenceSelectionBoxChange}>
                        {tees.map((tee) => {
                            return (
                                <option key={tee} value={tee}>
                                    {tee}
                                </option>
                            );
                        })}
                    </select>
                    <br />
                    <button name="submit" onClick={this.handleSubmitClick} disabled={this.submitButtonDisabled()}>
                        Submit
                    </button>
                </div>
                {this.props.golf.errorMessage !== undefined && this.props.golf.errorMessage.length > 0 && (
                    <label name="lblError" style={{ color: "red" }}>
                        {this.props.golf.errorMessage}
                    </label>
                )}
                <div class="section-to-print" style={{ textAlign: "center" }}>
                    <h2>Player List</h2>
                    <table
                        style={{
                            textAlign: "left",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "80%",
                        }}
                    >
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>GHIN</th>
                            <th>Tee</th>
                            <th>Front Nine</th>
                            <th>Back Nine</th>
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
    addOrUpdatePlayer,
    getPlayers,
};

export default connect(mapStateToProps, actionCreators)(Players);
