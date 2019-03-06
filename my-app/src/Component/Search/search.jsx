import React, { Component } from 'react';
import { Button, Input} from 'semantic-ui-react';
import axios from 'axios';
import Filter from './filter.jsx';
import {SearchbarInput, SearchbarImage, SearchbarButton} from './search.module.scss';
import history from '../History/history.jsx';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value : '',
			pokemons_arr: [],		// hold all pokemons         
			results: [],            //hold the result from the search
			checked_1: false,
			checked_2: false,
			checked_descend: false,
		};

		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.clickHandler1 = this.clickHandler1.bind(this);
		this.clickHandler2 = this.clickHandler2.bind(this);
		this.descendHandler = this.descendHandler.bind(this);
		this.hideResult = this.hideResult.bind(this);
		this.closeCheck = this.closeCheck.bind(this);
		this.galleryHandler = this.galleryHandler.bind(this);
	}

	componentDidMount() {
		var num_arr = [];
		//store all promises in an array
		for (var i = 1; i <=151; i++) {
			num_arr.push(i);
		}

		var promises = [];

		num_arr.forEach(function (poke_no) {
			let end_url = 'pokemon/' + poke_no + '/';
			promises.push(axios.get('https://pokeapi.co/api/v2/' + end_url));
		});

		//store all pokemons in an array
		var pokemons_arr = this.state.pokemons_arr;
		axios.all(promises)
		.then(results => {
			results.forEach(function(response) {
				pokemons_arr.push(response.data);
			})
			for (var i = 0; i < pokemons_arr.length; i++) {
				pokemons_arr[i].name = pokemons_arr[i].name[0].toUpperCase() + pokemons_arr[i].name.substring(1);
			}
			this.setState({pokemons_arr: pokemons_arr});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	//hide the list after clicking the search results
	hideResult() {
		this.setState({results: []});
	}

	//unclick the button after clicking the search results
	closeCheck() {
		this.setState({checked_1: false, 
					   checked_2: false,
					   check_descend: false});
	}

    // change the input when user types
	inputChangeHandler(event) {
		// if nothing enter, hide the whole list and reset the button click
		if (event.target.value.length === 0) {
			this.setState({value: '',
			results: [], 
			checked_1: false,
			checked_2: false
			});
		} else {
			this.setState({
				value: event.target.value,
				results: isInList(event.target.value, this.state.pokemons_arr),
			});
		}
	}

	//click the button sort by stats
	clickHandler1() {
		var judge_2 = this.state.checked_2;
		if (this.state.value.length > 0) {
			this.setState({checked_1: true});
		}
		if (judge_2 === true) {
			this.setState({checked_2: false});
		}
		if (this.state.checked_descend === true) {
			this.setState({checked_descend: false});
		}
	}
	//click the button sort by base experience
	clickHandler2() {
		var judge_1 = this.state.checked_1;
		if (this.state.value.length > 0) {
			this.setState({checked_2: true});
		}
		if (judge_1 === true) {
			this.setState({checked_1: false});
		}
		if (this.state.checked_descend === true) {
			this.setState({checked_descend: false});
		}
	}

	descendHandler() {
		if (this.state.value.length > 0) {
			this.setState({checked_descend: true});
		}
	}

	galleryHandler() {
		history.push("/Pokemon");
	}

	render() {
		return (
		<div>
			<div className = {SearchbarImage}>
				<img onClick = {this.galleryHandler} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt = "header" title = "header"/>
			</div>
			<div className = {SearchbarInput}>
			<Input
				onChange = {this.inputChangeHandler}
				type = "text"
			   	placeholder = "enter Pokemon's name"
				value = {this.state.value}
			/>
			</div>	
			<Filter results = {this.state.results} checked_1 = {this.state.checked_1} 
			checked_2 = {this.state.checked_2} hideResult = {this.hideResult} 
			closeCheck = {this.closeCheck} pokemons_arr = {this.state.pokemons_arr} 
			checked_descend = {this.state.checked_descend}/>
			<div className = {SearchbarButton}>
				<Button onClick = {this.clickHandler1}>
					sort by stats
				</Button>
				<Button onClick = {this.clickHandler2}>
					sort by base experience
				</Button>
				<Button onClick = {this.descendHandler}>
					Descending
				</Button>
		   </div>	
		</div>		
		)
	}
}

function isInList(input, arr) {
	var result = []; 
	for (let i = 0; i < arr.length; i++) {
		if ((arr[i].name.toLowerCase()).indexOf(input.toLowerCase()) === 0) {
			result.push(arr[i]);
		}
	}
	return result;
}

export default Search