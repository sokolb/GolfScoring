import React, { Component } from "react";
import { connect } from "react-redux";
import { addOrUpdatePlayer, addOrUpdatePlayerNoAutoGhinUpdate, getPlayers } from "../../Actions/GolfActions";
import Player from "./Player";
import config from "../../config";

const tees = ["Blue", "White", "Gold", "Red"];

export class Players extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            GHIN: "",
            selectedTeePreference: "White",
            handicap: -1,
            frontNine: -1,
            backNine: -1,
            selectedPlayerId: -1,
            autoUpdateGHIN: true,
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleGHINChange = this.handleGHINChange.bind(this);
        this.handleTeePreferenceSelectionBoxChange = this.handleTeePreferenceSelectionBoxChange.bind(this);
        this.handleAutoUpdateGHINChange = this.handleAutoUpdateGHINChange.bind(this);
        this.handleHandicapChange = this.handleHandicapChange.bind(this);
        this.handleFrontNineChange = this.handleFrontNineChange.bind(this);
        this.handleBackNineChange = this.handleBackNineChange.bind(this);
        this.handlePlayersSelectionChange = this.handlePlayersSelectionChange.bind(this);
    }

    componentDidMount() {
        // this.props.getPlayers("Players_Testing.json");
        this.props.getPlayers(`${config.apiBaseUrl}/getAllPlayers`);
    }

    resetState() {
        this.setState({
            firstName: "",
            lastName: "",
            GHIN: "",
            selectedTeePreference: "White",
            autoUpdateGHIN: true,
            handicap: -1,
            frontNine: -1,
            backNine: -1,
            selectedPlayerId: -1,
        });
    }

    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value,
        });
    }

    handlePlayersSelectionChange(event) {
        var playerId = parseInt(event.target.value);
        if (playerId === -1) {
            this.resetState();
        } else {
            var player = this.props.golf.players.find((p) => p.id === playerId);
            this.setState({
                firstName: player.firstName,
                lastName: player.lastName,
                GHIN: player.GHIN,
                selectedTeePreference: player.teePreference,
                handicap: player.handicap,
                frontNine: player.frontNine,
                backNine: player.backNine,
                selectedPlayerId: playerId,
                autoUpdateGHIN: Boolean(player.autoUpdateGHIN),
            });
        }
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

    handleHandicapChange(event) {
        this.setState({
            handicap: event.target.value,
        });
    }

    handleFrontNineChange(event) {
        this.setState({
            frontNine: event.target.value,
        });
    }

    handleBackNineChange(event) {
        this.setState({
            backNine: event.target.value,
        });
    }

    handleSubmitClick = () => {
        console.log("this.state.selectedPlayerId: " + this.state.selectedPlayerId);
        if (this.state.autoUpdateGHIN) {
            this.props.addOrUpdatePlayer(this.state.selectedPlayerId, this.state.firstName, this.state.lastName, this.state.GHIN, this.state.selectedTeePreference, this.state.autoUpdateGHIN, this.props.golf.userToken);
        } else {
            this.props.addOrUpdatePlayerNoAutoGhinUpdate(this.state.selectedPlayerId, this.state.firstName, this.state.lastName, this.state.GHIN, this.state.selectedTeePreference, this.state.autoUpdateGHIN, this.state.handicap, this.state.frontNine, this.state.backNine);
        }
        this.resetState();
    };

    handleRefreshAllHandicapsClick = () => {
        this.props.golf.players.forEach((player) => {
            if (player.autoUpdateGHIN) {
                this.props.addOrUpdatePlayer(player.id, player.firstName, player.lastName, player.GHIN, player.teePreference, true, this.props.golf.userToken);
            }
        });
    };

    submitButtonDisabled() {
        return this.state.firstName === "" || this.state.lastName === "" || this.state.GHIN === "";
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

    getPlayers() {
        const emptyOption = (
            <option key="teamEmpty" value={-1}>
                Add new player
            </option>
        );

        var playerOptions = this.props.golf.players
            .map((p) => ({
                id: p.id,
                fullName: p.firstName + " " + p.lastName,
            }))
            .sort((a, b) => a.fullName.localeCompare(b.fullName))
            .map((p) => (
                <option key={p.id} value={p.id}>
                    {p.fullName}
                </option>
            ));

        var options = [emptyOption, ...playerOptions];

        return options;
    }

    render() {
        return (
            <div className="container">
                {this.props.golf.loggedInUser !== undefined && (
                    <div className="card" name="addPlayer">
                        <div className="card-header">
                            <h2>Manage Players</h2>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-between align-center mb-3">
                                <button className="btn-secondary btn-sm" name="refreshAllHandicaps" onClick={this.handleRefreshAllHandicapsClick}>
                                    Refresh All Handicaps
                                </button>
                            </div>

                            <div className="form-group">
                                <label>Select Player:</label>
                                <select name="players" onChange={this.handlePlayersSelectionChange}>
                                    {this.getPlayers()}
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group compact">
                                    <label>First Name:</label>
                                    <input type="text" name="firstName" onChange={this.handleFirstNameChange} value={this.state.firstName} />
                                </div>
                                <div className="form-group compact">
                                    <label>Last Name:</label>
                                    <input type="text" name="lastName" onChange={this.handleLastNameChange} value={this.state.lastName} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group compact">
                                    <label>GHIN:</label>
                                    <input type="text" name="GHIN" onChange={this.handleGHINChange} value={this.state.GHIN} />
                                </div>
                                <div className="form-group compact">
                                    <label>Tee Preference:</label>
                                    <select name="teePreferenceSelectionBox" onChange={this.handleTeePreferenceSelectionBoxChange} value={this.state.selectedTeePreference}>
                                        {tees.map((tee) => {
                                            return (
                                                <option key={tee} value={tee}>
                                                    {tee}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group form-check">
                                <input name="autoUpdateGHIN" type="checkbox" onChange={this.handleAutoUpdateGHINChange} checked={this.state.autoUpdateGHIN} />
                                <label>Auto Update GHIN</label>
                            </div>

                            {!this.state.autoUpdateGHIN && (
                                <div className="form-row">
                                    <div className="form-group compact">
                                        <label>Handicap:</label>
                                        <input type="number" name="handicap" onChange={this.handleHandicapChange} value={this.state.handicap} />
                                    </div>
                                    <div className="form-group compact">
                                        <label>Front Nine:</label>
                                        <input type="number" name="frontNine" onChange={this.handleFrontNineChange} value={this.state.frontNine} />
                                    </div>
                                    <div className="form-group compact">
                                        <label>Back Nine:</label>
                                        <input type="number" name="backNine" onChange={this.handleBackNineChange} value={this.state.backNine} />
                                    </div>
                                </div>
                            )}

                            <button className="btn-primary" name="submit" onClick={this.handleSubmitClick} disabled={this.submitButtonDisabled()}>
                                {this.state.selectedPlayerId === -1 ? "Add Player" : "Update Player"}
                            </button>
                        </div>
                    </div>
                )}

                {this.props.golf.errorMessage !== undefined && this.props.golf.errorMessage.length > 0 && (
                    <div className="alert alert-danger" name="lblError">
                        {this.props.golf.errorMessage}
                    </div>
                )}

                <div className="section-to-print">
                    <h2>Player List</h2>
                    <p className="text-muted">*Course adjusted handicap based on tee preference</p>
                    <div className="table-responsive">
                        <table className="player-table">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>GHIN</th>
                                    <th className="handicap-column">Handicap Index</th>
                                    <th>Tee</th>
                                    <th className="col-numeric">Front Nine*</th>
                                    <th className="col-numeric">Back Nine*</th>
                                    <th className="col-actions"></th>
                                </tr>
                            </thead>
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>
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
    addOrUpdatePlayerNoAutoGhinUpdate,
    getPlayers,
};

export default connect(mapStateToProps, actionCreators)(Players);
