import React, { Component } from 'react';
import axios from 'axios';
import { Card }  from 'semantic-ui-react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import history from '../History/history.jsx';
import {GalleryCheck, GalleryCheckbox} from './gallery.module.scss';

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            pokemon: {},
            pokemons_arr: [],
        }
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

		//store all pokemons in an array
		var pokemons_arr = this.state.pokemons_arr;
		axios.all(promises)
		.then(results => {
			results.forEach(function(response) {
				pokemons_arr.push(response.data);
			})
			this.setState({pokemons_arr: pokemons_arr});
		})
		.catch((error) => {
			console.log(error);
		});
    }

    clickHandler(elem) {
        this.setState({pokemon: elem})
        history.push('/Pokemon/'+ elem.id);
    }

    render() {
        var dataItems = this.state.pokemons_arr;
        const imageGallery = dataItems.map((elem) => 
        <Card key = {elem.name} onClick = {this.clickHandler.bind(this, elem)}>
            <img
            src={elem.sprites.front_default}
            alt={`Sprite of ${elem.name}`}
            />
            <Card.Meta>
                Pokedex #{elem.id}
            </Card.Meta>
        </Card>);

        return(
        <div>
          <CheckboxGroup className = {GalleryCheck} name = 'type1'>
            <Checkbox className = {GalleryCheckbox} value = 'normal' name = 'normal'/>normal
            <Checkbox className = {GalleryCheckbox} value = 'fighting' name = 'fighting'/>fighting
            <Checkbox className = {GalleryCheckbox} value = 'flying' name = 'flying'/>flying
            <Checkbox className = {GalleryCheckbox} value = 'poison' name = 'poison'/>poison
            <Checkbox className = {GalleryCheckbox} value = 'ground' name = 'ground'/>ground
            <Checkbox className = {GalleryCheckbox} value = 'rock' name = 'rock'/>rock
            <Checkbox className = {GalleryCheckbox} value = 'bug' name = 'bug'/>bug
            <Checkbox className = {GalleryCheckbox} value = 'ghost' name = 'ghost'/>ghost
            <Checkbox className = {GalleryCheckbox} value = 'steel' name = 'steel'/>steel
            <Checkbox className = {GalleryCheckbox} value = 'fire' name = 'fire'/>fire
          </CheckboxGroup>  
          <CheckboxGroup className = {GalleryCheck} name = 'type2' >
            <Checkbox className = {GalleryCheckbox} value = 'water' name = 'water'/>water
            <Checkbox className = {GalleryCheckbox} value = 'grass' name = 'grass'/>grass
            <Checkbox className = {GalleryCheckbox} value = 'electric' name = 'electric'/>electric
            <Checkbox className = {GalleryCheckbox} value = 'psychic' name = 'psychic'/>psychic
            <Checkbox className = {GalleryCheckbox} value = 'ice' name = 'ice'/>ice
            <Checkbox className = {GalleryCheckbox} value = 'dragon' name = 'dragon'/>dragon
            <Checkbox className = {GalleryCheckbox} value = 'dark' name = 'dark'/>dark
            <Checkbox className = {GalleryCheckbox} value = 'fairy' name = 'fairy'/>fairy
            <Checkbox className = {GalleryCheckbox} value = 'unknown' name = 'unknown'/>unknown
            <Checkbox className = {GalleryCheckbox} value = 'shadow' name = 'shadow'/>shadow
        </CheckboxGroup>
           {imageGallery}
        </div>
        )
    }
}

export default Gallery; 