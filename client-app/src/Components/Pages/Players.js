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
            autoUpdateGHIN: true,
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleGHINChange = this.handleGHINChange.bind(this);
        this.handleTeePreferenceSelectionBoxChange = this.handleTeePreferenceSelectionBoxChange.bind(this);
        this.handleAutoUpdateGHINChange = this.handleAutoUpdateGHINChange.bind(this);
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

    handleAutoUpdateGHINChange(event) {
        this.setState({
            autoUpdateGHIN: event.target.checked,
        });
    }

    handleSubmitClick = () => {
        this.props.addOrUpdatePlayer(-1, this.state.firstName, this.state.lastName, this.state.GHIN, this.state.selectedTeePreference, this.state.autoUpdateGHIN, this.props.golf.userToken);
        this.setState({
            firstName: "",
            lastName: "",
            GHIN: "",
            autoUpdateGHIN: true,
        });
    };

    handleRefreshAllHandicapsClick = () => {
        this.props.golf.players.forEach((player) => {
            if (player.autoUpdateGHIN) {
                this.props.addOrUpdatePlayer(player.id, player.firstName, player.lastName, player.GHIN, player.teePreference, true, this.props.golf.userToken);
            }
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
                {this.props.golf.loggedInUser !== undefined && (
                    <div name="addPlayer">
                        <h2>Add Player</h2>
                        <br />
                        <button name="refreshAllHandicaps" onClick={this.handleRefreshAllHandicapsClick}>
                            Refresh All Handicaps
                        </button>
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
                        <label>Auto Update GHIN:</label>
                        <input name="autoUpdateGHIN" type="checkbox" onChange={this.handleAutoUpdateGHINChange} selected={this.state.autoUpdateGHIN}></input>
                        <br />
                        <button name="submit" onClick={this.handleSubmitClick} disabled={this.submitButtonDisabled()}>
                            Submit
                        </button>
                    </div>
                )}

                {this.props.golf.errorMessage !== undefined && this.props.golf.errorMessage.length > 0 && (
                    <label name="lblError" style={{ color: "red" }}>
                        {this.props.golf.errorMessage}
                    </label>
                )}
                <div class="section-to-print" style={{ textAlign: "center" }}>
                    <h2>Player List</h2>
                    <label>*Course adjusted handicap based on tee preference</label>
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
                            <th>Handicap Index</th>
                            <th>Tee</th>
                            <th>Front Nine*</th>
                            <th>Back Nine*</th>
                            <th></th>
                        </tr>
                        {this.props.golf.players !== undefined &&
                            this.props.golf.players
                                .sort((a, b) => {
                                    if (a.handicap === "NH" && b.handicap === "NH") {
                                        return 0;
                                    } else if (a.handicap === "NH") {
                                        return 1;
                                    } else if (b.handicap === "NH") {
                                        return -1;
                                    } else {
                                        return a.handicap - b.handicap;
                                    }
                                })
                                .map((p) => {
                                    return <Player key={p.GHIN} player={p} showDeleteButton={this.props.golf.loggedInUser !== undefined} />;
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
