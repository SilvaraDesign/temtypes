import React, { Component } from "react";

export default class DisplayTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    render() {
        return (
            <div>{this.props.firstType ? this.props.firstType.name : "None"} selected</div>
        );
    }
}