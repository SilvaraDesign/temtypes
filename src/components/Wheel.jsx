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
                {this.props.typelist.forEach(type => <li>
                    <img src={type.image} alt=""/>
                    <p>{type.name}</p>
                </li>)}
                {this.props.typelist
                    .map((type, index) => (
                        <TypeElement 
                            key={index}
                            name={type.name}
                            image={type.image}
                        />
                    ))}
            </ul>
        );
    }
}