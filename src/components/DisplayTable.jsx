import React, { Component } from "react";
import TableType from './TableType';

export default class DisplayTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    parseWeaknesses(list1, list2) {
        let weaknesses = {
            superEffective: [],
            effective: [],
            resistant: [],
            superResistant: []
        };
        let currValue;
        this.props.typenames.forEach(name => {
            if (list1[name] && list2[name]) {
                currValue = list1[name].value * list2[name].value;
            }
            else if (list1[name]) currValue = list1[name].value;
            else if (list2[name]) currValue = list2[name].value;
            switch(currValue) {
                case 4:
                    weaknesses.superEffective.push(this.props.typelist[name]);
                    break;
                case 2:
                    weaknesses.effective.push(this.props.typelist[name]);
                    break;
                case 0.5:
                    weaknesses.resistant.push(this.props.typelist[name]);
                    break;
                case 0.25:
                    weaknesses.superResistant.push(this.props.typelist[name]);
                    break;
                default:
                    //
            }
        });
        return weaknesses;
    }

    render() {
        let weaknesses = this.parseWeaknesses(this.props.selectedWeaknesses.type1, this.props.selectedWeaknesses.type2);
        if (!this.props.firstType && !this.props.secondType) {
            return (
                <section className="DisplayTable">
                    <p>No type selected</p>
                </section>
            )
        }
        else {
            let message = "";
            if (!this.props.secondType) {
                message = `${this.props.firstType.name} takes:`;
            }
            else if (!this.props.firstType) {
                message = `${this.props.secondType.name} takes:`;
            }
            else {
                message = `${this.props.firstType.name}/${this.props.secondType.name} takes:`;
            }
            return (
                <section className="DisplayTable">
                    <div>
                        <h2>{message}</h2>
                        <ul>
                            <li>4x from {weaknesses.superEffective.map((type, index) => (
                                <TableType 
                                    key = {index}
                                    type = {type}
                                />
                            ))}</li>
                            <li>2x from {weaknesses.effective.map((type, index) => (
                                <TableType 
                                    key = {index}
                                    type = {type}
                                />
                            ))}</li>
                            <li>0.5x from {weaknesses.resistant.map((type, index) => (
                                <TableType 
                                    key = {index}
                                    type = {type}
                                />
                            ))}</li>
                            <li>0.25x from {weaknesses.superResistant.map((type, index) => (
                                <TableType 
                                    key = {index}
                                    type = {type}
                                />
                            ))}</li>
                        </ul>
                    </div>
                </section>
            );
        }
    }
}