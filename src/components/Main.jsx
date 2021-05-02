import React, { Component } from "react";
import * as Services from "../libraries/services";
import DisplayTable from "./DisplayTable";
import Wheel from './Wheel';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typelist: [],
            typenames: [],
            weaknesses: [],
            firstType: null,
            secondType: null,
            selectedWeaknesses: {
                type1: [],
                type2: []
            }
        };
    }

    componentDidMount() {
        this.getTypelist();
        this.getWeaknesses();
    }

    getTypelist() {
        Services.getTypes().then(
            (response)=>{
              return response.json();
        })
        .then(
            (responseJson)=>{
                let types = [];
                let names = [];
                responseJson.forEach(type => {
                    type.icon = 'https://temtem-api.mael.tech' + type.icon;
                    responseJson[type.name] = type;
                    names.push(type.name);
                });
                types = this.reorderTypes(responseJson);
                this.setState({typelist: types, typenames: names});
            }
        );
    }

    getWeaknesses() {
        Services.getWeaknesses().then(
            (response)=>{
              return response.json();
        })
        .then(
            (responseJson)=>{
                this.setState({ weaknesses: responseJson });
            }
        );
    }

    onTypeSelect(type) {
        let firstType = this.state.firstType;
        let secondType = this.state.secondType;
        let newState = {};
        if (firstType && secondType) {
            if (type !== firstType.name && type !== secondType.name) return;
            newState = type === firstType.name ? {firstType: null} : {secondType: null};
        }
        else {
            let newType = this.state.typelist[type];
            if (!firstType && !secondType) newState = {firstType: newType};
            else if (firstType) {
                newState = type === firstType.name ? {firstType: null} : {secondType: newType};
            }
            else {
                newState = type === secondType.name ? {secondType: null} : {firstType: newType};
            }
        }
        this.setState(newState, function() {
            this.calculateWeaknesses();
        });
    }

    calculateWeaknesses() {
        let type1 = this.state.firstType;
        let type2 = this.state.secondType;
        let weaknesses1 = [];
        let weaknesses2 = [];
        let currentWeakness;
        if (type1) {
            this.state.typenames.forEach(name => {
                currentWeakness = {name: name, value: this.state.weaknesses[name][type1.name]};
                weaknesses1.push(currentWeakness);
                weaknesses1[name] = currentWeakness;
            });
        }
        if (type2) {
            this.state.typenames.forEach(name => {
                currentWeakness = {name: name, value: this.state.weaknesses[name][type2.name]};
                weaknesses2.push(currentWeakness);
                weaknesses2[name] = currentWeakness;
            });
        }
        this.setState({selectedWeaknesses: {type1: weaknesses1, type2: weaknesses2}});
    }

    reorderTypes(typeArray) {
        let typeOrder = {'Neutral': 0, 'Toxic': 1, 'Mental': 2, 'Crystal': 3, 'Fire': 4, 'Melee': 5, 'Electric': 6, 'Nature': 7, 'Wind': 8, 'Water': 9, 'Digital': 10, 'Earth': 11};
        let ret = [];
        let index;
        typeArray.forEach(type => {
            index = typeOrder[type.name];
            ret[index] = type;
            ret[type.name] = type;
        });
        return ret;
    }

    render() {
        return (
            <main>
                <h1>Welcome to Temtypes!</h1>
                <Wheel typelist={this.state.typelist} onTypeSelect={type=>this.onTypeSelect(type)} firstType={this.state.firstType} secondType={this.state.secondType} />
                <DisplayTable firstType={this.state.firstType} secondType={this.state.secondType} selectedWeaknesses={this.state.selectedWeaknesses} typelist={this.state.typelist} typenames={this.state.typenames}/>
            </main>
        );
    }
}