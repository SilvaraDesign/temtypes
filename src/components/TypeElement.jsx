import React, { Component } from "react";

export default class TypeElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }

    render() {
        return (
            <li className="TypeElement">
                <img src={this.props.image} alt={this.props.name + " icon"}/>
                <p>{this.props.name}</p>
            </li>
        );
    }
}