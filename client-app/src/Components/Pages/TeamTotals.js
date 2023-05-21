import React, { Component } from "react";

export class TeamTotals extends Component {
    getPlayerNameCombined(player) {
        return player.firstName + " " + player.lastName;
    }

    render() {
        return (
            <tr style={{ height: "40px" }}>
                <td name="totalTeamName" colSpan={3}>
                    Team Points: {this.getPlayerNameCombined(this.props.player1)}/{this.getPlayerNameCombined(this.props.player2)}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );
    }
}

export default TeamTotals;
