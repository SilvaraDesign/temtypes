import React, { Component } from "react";

export default class TableType extends Component {
    render() {
        return (
            <span className="TableType">{this.props.type.name} </span>
        );
    }
}