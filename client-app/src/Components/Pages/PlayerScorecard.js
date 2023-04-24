import React, { Component } from "react";

export class PlayerScorecard extends Component {
    getPlayerHandicap() {
        return this.props.frontBackNine === "frontNine" ? this.props.player.frontNine : this.props.player.backNine;
    }

    playerGetsStroke(holeNumber, strokes) {
        if (this.props.course === undefined) {
            return "";
        }

        var holes = this.props.frontBackNine === "frontNine" ? [...this.props.course.holes].slice(0, 9) : [...this.props.course.holes].slice(9, 18);
        holes.sort(function (a, b) {
            return a.handicapIndex - b.handicapIndex;
        });

        var index = holes.findIndex(function (hole) {
            return hole.number === holeNumber;
        });

        var retval = index !== -1 && index < strokes ? "S" : "";

        if (strokes > 9) {
            retval += this.playerGetsStroke(holeNumber, strokes - 9);
        }

        return retval;
    }

    getHoleNumberByPosition(position) {
        if (this.props.course === undefined) {
            return "";
        }
        var holeOffset = this.props.frontBackNine === "frontNine" ? 0 : 9;
        return this.props.course.holes[holeOffset + position].number;
    }

    render() {
        return (
            <tr style={{ height: "40px" }}>
                <td>
                    <label name="name">{this.props.player.firstName + " " + this.props.player.lastName}</label>
                </td>
                <td>
                    <label name="handicap">{this.getPlayerHandicap()}</label>
                </td>
                <td>
                    <label name="tee">{this.props.player.teePreference}</label>
                </td>
                <td>
                    <label name="strokes">{this.props.strokes}</label>
                </td>
                <td name="stroke1" style={{ textAlign: "right", verticalAlign: "top" }}>
                    {this.playerGetsStroke(this.getHoleNumberByPosition(0), this.props.strokes)}
                </td>
                <td name="stroke2" style={{ textAlign: "right", verticalAlign: "top" }}>
                    {this.playerGetsStroke(this.getHoleNumberByPosition(1), this.props.strokes)}
                </td>
                <td name="stroke3" style={{ textAlign: "right", verticalAlign: "top" }}>
                    {this.playerGetsStroke(this.getHoleNumberByPosition(2), this.props.strokes)}
                </td>
                <td name="stroke4" style={{ textAlign: "right", verticalAlign: "top" }}>
                    {this.playerGetsStroke(this.getHoleNumberByPosition(3), this.props.strokes)}
                </td>
                <td name="stroke5" style={{ textAlign: "right", verticalAlign: "top" }}>
                    {this.playerGetsStroke(this.getHoleNumberByPosition(4), this.props.strokes)}
                </td>
                <td name="stroke6" style={{ textAlign: "right", verticalAlign: "top" }}>
                    {this.playerGetsStroke(this.getHoleNumberByPosition(5), this.props.strokes)}
                </td>
                <td name="stroke7" style={{ textAlign: "right", verticalAlign: "top" }}>
                    {this.playerGetsStroke(this.getHoleNumberByPosition(6), this.props.strokes)}
                </td>
                <td name="stroke8" style={{ textAlign: "right", verticalAlign: "top" }}>
                    {this.playerGetsStroke(this.getHoleNumberByPosition(7), this.props.strokes)}
                </td>
                <td name="stroke9" style={{ textAlign: "right", verticalAlign: "top" }}>
                    {this.playerGetsStroke(this.getHoleNumberByPosition(8), this.props.strokes)}
                </td>
            </tr>
        );
    }
}

export default PlayerScorecard;
