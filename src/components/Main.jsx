import React, { Component } from "react";
import DisplayTable from "./DisplayTable";
import Wheel from './Wheel';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstType: null,
            secondType: null
        };
    }

    typelist = () => {
        const types = [
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
        types.forEach(type => types[type.name] = type);
        return types;
    }

    onTypeSelect(type) {
        let firstType = this.state.firstType;
        let secondType = this.state.secondType;
        if (firstType && secondType) {
            if (type !== firstType.name && type !== secondType.name) return;
            type === firstType.name ? this.setState({firstType: null}) : this.setState({secondType: null});
        }
        else {
            let newType = this.typelist()[type];
            if (!firstType && !secondType) this.setState({firstType: newType});
            else if (firstType) {
                type === firstType.name ? this.setState({firstType: null}) : this.setState({secondType: newType});
            }
            else {
                type === secondType.name ? this.setState({secondType: null}) : this.setState({firstType: newType});
            }
        }
    }

    render() {
        return (
            <main>
                <Wheel typelist={this.typelist} onTypeSelect={type=>this.onTypeSelect(type)} firstType={this.state.firstType} secondType={this.state.secondType} />
                <DisplayTable firstType={this.state.firstType} secondType={this.state.secondType} />
            </main>
        );
    }
}