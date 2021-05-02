import React, { Component } from "react";

export default class TypeElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }

    handleTypeSelect() {
        let type = this.props.name;
        this.props.onTypeSelect(type);
    }

    render() {
        let isSelected = false;
        if (this.props.firstType && (this.props.firstType.name === this.props.name)) isSelected = true;
        else if (this.props.secondType && (this.props.secondType.name === this.props.name)) isSelected = true;
        return (
            <li className={(isSelected ? "selected " : "") + "TypeElement"} onClick={() => this.handleTypeSelect()}>
                <img src={this.props.icon} alt={this.props.name + " icon"}/>
                <p>{this.props.name}</p>
            </li>
        );
    }
}