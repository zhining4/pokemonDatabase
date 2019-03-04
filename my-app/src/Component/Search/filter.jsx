import React, { Component } from 'react';
import {Label} from 'semantic-ui-react';
import history from '../History/history.jsx';
import {Filter as FilterCss} from './filter.module.scss';

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
        history.push('/Pokemon/' + pokemon.id);
    }


    render() {
        const data_items = this.props.results;
        const sort_alpha = this.props.checked_1;
        const sort_base = this.props.checked_2;
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

        var list_items;
        if (sort_alpha === true) {
            list_items = data_items.map((elem) => <Label key = {elem.name} 
            onClick = {this.clickHandler.bind(this, elem)}>{elem.name}, 
            stats: {sum_stats(elem)}</Label>);
        } else if (sort_base === true) {
            list_items = data_items.map((elem) => <Label key = {elem.name} 
            onClick = {this.clickHandler.bind(this, elem)}>{elem.name}, 
            base experience: {elem.base_experience} </Label>);
        } else {
            list_items = data_items.map((elem) => <Label key = {elem.name} 
            onClick = {this.clickHandler.bind(this, elem)}>{elem.name}</Label>);
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