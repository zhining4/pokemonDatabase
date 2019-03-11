import React, { Component } from 'react';
import {Label, Card} from 'semantic-ui-react';
//import history from '../History/history.jsx';
import {Filter as FilterCss, LabelImage, FilterCard, LabelText} from './filter.module.scss';

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            pokemon: {},
        }
    }

    clickHandler(pokemon) {
        this.setState({pokemon: pokemon});
        this.props.hideResult();
        this.props.closeCheck(); 
        this.props.history.push('/Pokemon/' + pokemon.id);
    }


    render() {
        const data_items = this.props.results;
        const sort_alpha = this.props.checked_1;
        const sort_base = this.props.checked_2;

        //sort data by different properties
        if (sort_alpha === true) {
            data_items.sort(function(a, b) {
                var a_arr = a.stats;
                let a_sum = 0;
                let b_sum = 0;
                var b_arr = b.stats;
                for (let i = 0; i < a.stats.length; i++) {
                    a_sum += a_arr[i].base_stat;
                    b_sum += b_arr[i].base_stat;
                }
                if(a_sum < b_sum) {
                    return -1;
                } else if (a_sum > b_sum) {
                    return 1;
                }
                    return 0;
            })
            if (this.props.checked_descend === true) {
                data_items.reverse();
            }
        } else if (sort_base === true) {
            data_items.sort(function(a, b) {
                if (a.base_experience < b.base_experience) {
                    return -1;
                } else if (a.base_experience > b.base_experience) {
                    return 1;
                }
                return 0;
            })
            if (this.props.checked_descend === true) {
                data_items.reverse();
            }
        }
        
        //displaying the result
        var list_items;
        if (sort_alpha === true) {
            list_items = data_items.map((elem) => 
            <Card className = {FilterCard} key = {elem.name + elem.id + sum_stats(elem)} 
            onClick = {this.clickHandler.bind(this, elem)}>
                <Label className = {LabelText}>
                {elem.name}-stats: {sum_stats(elem)}
                </Label>
                <img className = {LabelImage}
                src={elem.sprites.front_default}
                alt={`Sprite of ${elem.name}`}/>
            </Card>);
        } else if (sort_base === true) {
            list_items = data_items.map((elem) => 
            <Card className = {FilterCard} key = {elem.name + elem.id + elem.base_experience} 
            onClick = {this.clickHandler.bind(this, elem)}>
                <Label className = {LabelText}>
                {elem.name}-base experience: {elem.base_experience}
                </Label>
                <img className = {LabelImage}
                src={elem.sprites.front_default}
                alt={`Sprite of ${elem.name}`}
                />
            </Card>);
        } else {
            list_items = data_items.map((elem) => 
            <Card className = {FilterCard} key = {elem.name + elem.id + 'filter'} 
            onClick = {this.clickHandler.bind(this, elem)}>
                <Label className = {LabelText}>{elem.name}
                </Label>
                <img className = {LabelImage}
                src={elem.sprites.front_default}
                alt={`Sprite of ${elem.name}`}
                />
            </Card>);
        }
        const result_lists = list_items;
        return (
            <div className = {FilterCss}>
               <div>
                 {result_lists}
               </div>
            </div>
        )
    }
} 

function sum_stats(elem) {
    var sum = 0;
    var arr = elem.stats;
    for (var i = 0; i < elem.stats.length; i++) {
        sum += arr[i].base_stat;
    }
    return sum;
}
export default Filter