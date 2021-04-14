import React, { Component } from "react";

export default class DisplayTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    render() {
        let message = "None";
        if (this.props.firstType && this.props.secondType) message = this.props.firstType.name + " and " + this.props.secondType.name;
        else if (this.props.firstType) message = this.props.firstType.name;
        else if (this.props.secondType) message = this.props.secondType.name;
        return (
            <div>{message} selected</div>
        );
    }
}