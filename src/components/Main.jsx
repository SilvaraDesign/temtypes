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
        let types = [
            {name: "Neutral", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/b/b3/Neutral.png"},
            {name: "Toxic", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/9/96/Toxic.png"},
            {name: "Mental", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/b/bf/Mental.png"},
            {name: "Crystal", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/3/31/Crystal.png"},
            {name: "Fire", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/3/30/Fire.png"},
            {name: "Melee", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/8/8f/Melee.png"},
            {name: "Electric", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/2/2f/Electric.png"},
            {name: "Nature", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/a/a7/Nature.png"},
            {name: "Wind", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/b/bf/Wind.png"},
            {name: "Water", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/9/9d/Water.png"},
            {name: "Digital", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/1/1b/Digital.png"},
            {name: "Earth", image: "https://static.wikia.nocookie.net/temtem_gamepedia_en/images/1/1e/Earth.png"},
        ];
        let names = [];
        types.forEach(type => {
            types[type.name] = type;
            names.push(type.name);
        });
        this.setState({typelist: types, typenames: names});
    }

    getWeaknesses() {
        Services.getWeaknesses().then(
            (response)=>{
              return response.json();
        })
        .then(
            (responseJson)=>{
                this.setState({ weaknesses: responseJson });
        });
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