import React, { Component } from "react";

export default class TableType extends Component {
    render() {
        return (
            <span>{this.props.type.name} </span>
        );
    }
}