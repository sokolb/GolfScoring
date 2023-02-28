import React, { Component } from "react";
import { connect } from "react-redux";

export class Matches extends Component {
    componentDidMount() {
       
    }


    handleSubmitClick = () => {
    };


    render() {
        return (
            <div>
                <h1>Matches</h1>
                <br />
               
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

};

export default connect(mapStateToProps, actionCreators)(Matches);
