import React, { Component } from "react";

export default class TypeElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }

    handleTypeSelect() {
        let type = this.props.name;
        this.props.onTypeSelect(type);
    }

    render() {
        return (
            <li className="TypeElement" onClick={() => this.handleTypeSelect()}>
                <img src={this.props.image} alt={this.props.name + " icon"}/>
                <p>{this.props.name}</p>
            </li>
        );
    }
}