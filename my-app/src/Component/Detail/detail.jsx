import React, { Component } from 'react';
import DetailView from '../Detail/detailView.jsx';
import axios from 'axios';
import {Button} from 'semantic-ui-react';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons_arr: [],
      pokemon: {},
    }
    this.previousHandler = this.previousHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
  }

  componentDidMount() {
		var num_arr = [];
		//store all promises in an array
		for (var i = 1; i <=200; i++) {
			num_arr.push(i);
		}

		var promises = [];

		num_arr.forEach(function (poke_no) {
			let end_url = 'pokemon/' + poke_no + '/';
			promises.push(axios.get('https://pokeapi.co/api/v2/' + end_url));
		});

		//store all pokemons in an arrayrdrss
		var pokemons_arr = this.state.pokemons_arr;
		axios.all(promises)
		.then(results => {
			results.forEach(function(response) {
				pokemons_arr.push(response.data);
			})
      this.setState({pokemons_arr: pokemons_arr});
      var pokemon = pokemons_arr[this.props.match.params.id-1];
      this.setState({pokemon: pokemon});
		})
		.catch((error) => {
			console.log(error);
		});
	}

  previousHandler() {
    const data_items = this.state.pokemons_arr;
    let index = 0;
    for (var i = 0; i < data_items.length; i++) {
        if (data_items[i].name === this.state.pokemon.name) {
            if (i === 0) {
                index = data_items.length - 1;
            } else {
                index = i - 1;
            }
        }
    }
    const pokemon2 = data_items[index];
    this.setState({pokemon: pokemon2});
  }

  nextHandler() {
    const data_items = this.state.pokemons_arr;
    let index = 0;
    for (var i = 0; i < data_items.length; i++) {
        if (data_items[i].name === this.state.pokemon.name) {
            if (i === data_items.length - 1) {
                index = 0;
            } else {
                index = i + 1;
            }
        }
    }
    const pokemon2 = data_items[index];
    this.setState({pokemon: pokemon2});
  }

  render() {
    //console.log(this.props.match.params.id);
    const noPokemon = (this.state.pokemon.name === undefined);
        if (noPokemon) {    //check if there is corresponding search result
             return (
             <p></p>
           )
        } else {
          return(
            <div>
              <DetailView pokemon = {this.state.pokemon} />
              <Button onClick = {this.previousHandler}>Previous</Button>
              <Button onClick = {this.nextHandler}>Next</Button>
            </div>
          )
        }
  }
}

export default Detail