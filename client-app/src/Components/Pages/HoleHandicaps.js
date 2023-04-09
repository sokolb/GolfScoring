import React, { Component } from "react";

export class HoleHandicaps extends Component {
    getHoleHandicapByPosition(position) {
        if (this.props.frontBackNine === undefined || this.props.course === undefined) {
            return "";
        }
        var holeOffset = this.props.frontBackNine === "frontNine" ? 0 : 9;
        return this.props.course.holes[holeOffset + position].handicapIndex;
    }

    getTeeName() {
        if (this.props.course === undefined) {
            return "";
        } else {
            return this.props.course.tee;
        }
    }

    render() {
        return (
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td name="tee">{"Hole Handicap Index " + this.getTeeName()}</td>
                <td name="hole1Handicap">{this.getHoleHandicapByPosition(0)}</td>
                <td name="hole2Handicap">{this.getHoleHandicapByPosition(1)}</td>
                <td name="hole3Handicap">{this.getHoleHandicapByPosition(2)}</td>
                <td name="hole4Handicap">{this.getHoleHandicapByPosition(3)}</td>
                <td name="hole5Handicap">{this.getHoleHandicapByPosition(4)}</td>
                <td name="hole6Handicap">{this.getHoleHandicapByPosition(5)}</td>
                <td name="hole7Handicap">{this.getHoleHandicapByPosition(6)}</td>
                <td name="hole8Handicap">{this.getHoleHandicapByPosition(7)}</td>
                <td name="hole9Handicap">{this.getHoleHandicapByPosition(8)}</td>
            </tr>
        );
    }
}

export default HoleHandicaps;
