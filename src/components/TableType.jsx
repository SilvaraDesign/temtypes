import React, { Component } from "react";

export default class TableType extends Component {
    render() {
        return (
            <li className="TableType">
                <img src={this.props.type.icon} alt=""/>
                <span>{this.props.type.name}</span>
            </li>
        );
    }
}