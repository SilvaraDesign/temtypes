import React, { Component } from "react";
import TypeElement from './TypeElement';

export default class Wheel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }

    render() {
        return (
            <ul>
                {this.props.typelist
                    .map((type, index) => (
                        <TypeElement 
                            key = {index}
                            name = {type.name}
                            image = {type.image}
                            onTypeSelect = {type=>this.props.onTypeSelect(type)}
                            firstType = {this.props.firstType}
                            secondType = {this.props.secondType}
                        />
                    ))}
            </ul>
        );
    }
}