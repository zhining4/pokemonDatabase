import React, { Component } from 'react';
import axios from 'axios';
import { Card }  from 'semantic-ui-react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import history from '../History/history.jsx';
import {GalleryBar, GalleryCheck1, GalleryCheck2, GalleryCheckbox, GalleryCard, GalleryMeta, GalleryImage} from './gallery.module.scss';

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            pokemon: {},
            pokemons_arr: [],
            results: [],
            checked: [],
            normalCheck: false,
            fightingCheck: false,
            flyingCheck: false,
            poisonCheck: false,
            groundCheck: false,
            rockCheck: false,
            bugCheck: false,
            ghostCheck: false,
            steelCheck: false,
            fireCheck: false,
            waterCheck: false,
            grassCheck: false,
            electricCheck: false,
            psychicCheck: false,
            iceCheck: false,
            dragonCheck: false,
            darkCheck: false,
            fairyCheck: false,
            unknownCheck: false,
            shadowCheck: false,
        }
        this.normalHandler = this.normalHandler.bind(this);
        this.fightingHandler = this.fightingHandler.bind(this);
        this.flyingHandler = this.flyingHandler.bind(this);
        this.poisonHandler = this.poisonHandler.bind(this);
        this.groundHandler = this.groundHandler.bind(this);
        this.rockHandler = this.rockHandler.bind(this);
        this.bugHandler = this.bugHandler.bind(this);
        this.ghostHandler = this.ghostHandler.bind(this);
        this.steelHandler = this.steelHandler.bind(this);
        this.fireHandler = this.fireHandler.bind(this);
        this.waterHandler = this.waterHandler.bind(this);
        this.grassHandler = this.grassHandler.bind(this);
        this.electricHandler = this.electricHandler.bind(this);
        this.psychicHandler = this.psychicHandler.bind(this);
        this.iceHandler = this.iceHandler.bind(this);
        this.dragonHandler = this.dragonHandler.bind(this);
        this.darkHandler = this.darkHandler.bind(this);
        this.fairyHandler = this.fairyHandler.bind(this);
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
            for (var i = 0; i < pokemons_arr.length; i++) {
				pokemons_arr[i].name = pokemons_arr[i].name[0].toUpperCase() + pokemons_arr[i].name.substring(1);
			}
            this.setState({pokemons_arr: pokemons_arr, 
                           results: pokemons_arr});
		})
		.catch((error) => {
			console.log(error);
		});
    }

    clickHandler(elem) {
        this.setState({pokemon: elem})
        history.push('/Pokemon/'+ elem.id);
    }
    
    normalHandler() {
        var check_arr = this.state.checked;
        if (this.state.normalCheck === false) {
            this.setState({normalCheck: true});
            check_arr.push('normal');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'normal') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({normalCheck: false});
            check_arr.splice(check_arr.indexOf('normal'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'normal') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    fightingHandler() {
        var check_arr = this.state.checked;
        if (this.state.fightingCheck === false) {
            this.setState({fightingCheck: true});
            check_arr.push('fighting');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'fighting') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({fightingCheck: false});
            check_arr.splice(check_arr.indexOf('fighting'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'fighting') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    flyingHandler() {
        var check_arr = this.state.checked;
        if (this.state.flyingCheck === false) {
            this.setState({flyingCheck: true});
            check_arr.push('flying');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'flying') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({flyingCheck: false});
            check_arr.splice(check_arr.indexOf('flying'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'flying') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    poisonHandler() {
        var check_arr = this.state.checked;
        if (this.state.poisonCheck === false) {
            this.setState({poisonCheck: true});
            check_arr.push('poison');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'poison') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({poisonCheck: false});
            check_arr.splice(check_arr.indexOf('poison'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'poison') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    groundHandler() {
        var check_arr = this.state.checked;
        if (this.state.groundCheck === false) {
            this.setState({groundCheck: true});
            check_arr.push('ground');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'ground') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({groundCheck: false});
            check_arr.splice(check_arr.indexOf('ground'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'ground') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    rockHandler() {
        var check_arr = this.state.checked;
        if (this.state.rockCheck === false) {
            this.setState({rockCheck: true});
            check_arr.push('rock');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'rock') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({rockCheck: false});
            check_arr.splice(check_arr.indexOf('rock'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'rock') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    bugHandler() {
        var check_arr = this.state.checked;
        if (this.state.bugCheck === false) {
            this.setState({bugCheck: true});
            check_arr.push('bug');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'bug') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({bugCheck: false});
            check_arr.splice(check_arr.indexOf('bug'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'bug') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    ghostHandler() {
        var check_arr = this.state.checked;
        if (this.state.ghostCheck === false) {
            this.setState({ghostCheck: true});
            check_arr.push('ghost');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'ghost') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({ghostCheck: false});
            check_arr.splice(check_arr.indexOf('ghost'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'ghost') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }
     
    grassHandler() {
        var check_arr = this.state.checked;
        if (this.state.grassCheck === false) {
            this.setState({grassCheck: true});
            check_arr.push('grass');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'grass') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({grassCheck: false});
            check_arr.splice(check_arr.indexOf('grass'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'grass') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    steelHandler() {
        var check_arr = this.state.checked;
        if (this.state.steelCheck === false) {
            this.setState({steelCheck: true});
            check_arr.push('steel');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'steel') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({steelCheck: false});
            check_arr.splice(check_arr.indexOf('steel'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'steel') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    fireHandler() {
        var check_arr = this.state.checked;
        if (this.state.fireCheck === false) {
            this.setState({fireCheck: true});
            check_arr.push('fire');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'fire') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({fireCheck: false});
            check_arr.splice(check_arr.indexOf('fire'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'fire') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    waterHandler() {
        var check_arr = this.state.checked;
        if (this.state.waterCheck === false) {
            this.setState({waterCheck: true});
            check_arr.push('water');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'water') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({waterCheck: false});
            check_arr.splice(check_arr.indexOf('water'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'water') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    electricHandler() {
        var check_arr = this.state.checked;
        if (this.state.electricCheck === false) {
            this.setState({electricCheck: true});
            check_arr.push('electric');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'electric') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({electricCheck: false});
            check_arr.splice(check_arr.indexOf('electric'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'electric') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    psychicHandler() {
        var check_arr = this.state.checked;
        if (this.state.psychicCheck === false) {
            this.setState({psychicCheck: true});
            check_arr.push('psychic');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'psychic') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({psychicCheck: false});
            check_arr.splice(check_arr.indexOf('psychic'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'psychic') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    iceHandler() {
        var check_arr = this.state.checked;
        if (this.state.iceCheck === false) {
            this.setState({iceCheck: true});
            check_arr.push('ice');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'ice') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({iceCheck: false});
            check_arr.splice(check_arr.indexOf('ice'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'ice') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    dragonHandler() {
        var check_arr = this.state.checked;
        if (this.state.dragonCheck === false) {
            this.setState({dragonCheck: true});
            check_arr.push('dragon');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'dragon') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({dragonCheck: false});
            check_arr.splice(check_arr.indexOf('dragon'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'dragon') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    darkHandler() {
        var check_arr = this.state.checked;
        if (this.state.darkCheck === false) {
            this.setState({darkCheck: true});
            check_arr.push('dark');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'dark') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({darkCheck: false});
            check_arr.splice(check_arr.indexOf('dark'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'dark') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }

    fairyHandler() {
        var check_arr = this.state.checked;
        if (this.state.fairyCheck === false) {
            this.setState({fairyCheck: true});
            check_arr.push('fairy');
            this.setState({checked: check_arr});
            var pokemons = this.state.pokemons_arr;
            var filtered = pokemons.filter(elem => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name === 'fairy') {
                        if (this.state.results.length < this.state.pokemons_arr.length && !this.state.results.includes(elem)) {
                            return true;
                        } else if (this.state.results.length === this.state.pokemons_arr.length) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            if (this.state.results.length === this.state.pokemons_arr.length) {
                this.setState({results: filtered});
            } else {
                var current = this.state.results;
                var afterCurrent = current.concat(filtered);
                this.setState({results: afterCurrent});
            }
        } else {
            this.setState({fairyCheck: false});
            check_arr.splice(check_arr.indexOf('fairy'), 1);
            var current_2 = this.state.results;
            var filtering = current_2.filter((elem) => {
                for (var i = 0; i < elem.types.length; i++) {
                    if (elem.types[i].type.name !== 'fairy') {
                        if (check_arr.includes(elem.types[i].type.name)) {
                            return true;
                        }
                    }
                } 
                return false;
            })
            this.setState({checked: check_arr})
            if (filtering.length > 0) {
                this.setState({results: filtering});
            } else {
                this.setState({results: this.state.pokemons_arr});
            }
        }
    }
    
    render() {
        var dataItems = this.state.results;
        const imageGallery = dataItems.map((elem) => 
        <Card className = {GalleryCard} key = {elem.name} onClick = {this.clickHandler.bind(this, elem)}>
            <Card.Meta className = {GalleryMeta}>
                Pokedex #{elem.id}
            </Card.Meta>
            <Card.Meta className = {GalleryMeta}>
                {elem.name}
            </Card.Meta>
            <img
            src={elem.sprites.front_default}
            alt={`Sprite of ${elem.name}`}
            />
        </Card>);

        return(
        <div>
            <div className = {GalleryBar}>
                <CheckboxGroup className = {GalleryCheck1} name = 'type1'>
                    <Checkbox className = {GalleryCheckbox} value = 'normal' name = 'normal' onClick = {this.normalHandler}/>normal
                    <Checkbox className = {GalleryCheckbox} value = 'fighting' name = 'fighting' onClick = {this.fightingHandler}/>fighting
                    <Checkbox className = {GalleryCheckbox} value = 'flying' name = 'flying' onClick = {this.flyingHandler}/>flying
                    <Checkbox className = {GalleryCheckbox} value = 'poison' name = 'poison' onClick = {this.poisonHandler}/>poison
                    <Checkbox className = {GalleryCheckbox} value = 'ground' name = 'ground' onClick = {this.groundHandler}/>ground
                    <Checkbox className = {GalleryCheckbox} value = 'rock' name = 'rock' onClick = {this.rockHandler}/>rock
                    <Checkbox className = {GalleryCheckbox} value = 'bug' name = 'bug' onClick = {this.bugHandler}/>bug
                    <Checkbox className = {GalleryCheckbox} value = 'ghost' name = 'ghost' onClick = {this.ghostHandler}/>ghost
                    <Checkbox className = {GalleryCheckbox} value = 'steel' name = 'steel' onClick = {this.steelHandler}/>steel
                 </CheckboxGroup> 

                <CheckboxGroup className = {GalleryCheck2} name = 'type2' > 
                    <Checkbox className = {GalleryCheckbox} value = 'fire' name = 'fire' onClick = {this.fireHandler}/>fire
                    <Checkbox className = {GalleryCheckbox} value = 'water' name = 'water'onClick = {this.waterHandler}/>water
                    <Checkbox className = {GalleryCheckbox} value = 'grass' name = 'grass' onClick = {this.grassHandler}/>grass
                    <Checkbox className = {GalleryCheckbox} value = 'electric' name = 'electric' onClick = {this.electricHandler}/>electric
                    <Checkbox className = {GalleryCheckbox} value = 'psychic' name = 'psychic'onClick = {this.psychicHandler}/>psychic
                    <Checkbox className = {GalleryCheckbox} value = 'ice' name = 'ice' onClick = {this.iceHandler}/>ice
                    <Checkbox className = {GalleryCheckbox} value = 'dragon' name = 'dragon' onClick = {this.dragonHandler}/>dragon
                    <Checkbox className = {GalleryCheckbox} value = 'dark' name = 'dark' onClick = {this.darkHandler}/>dark
                    <Checkbox className = {GalleryCheckbox} value = 'fairy' name = 'fairy' onClick = {this.fairyHandler}/>fairy
                </CheckboxGroup>
            </div>    

            <div className = {GalleryImage}>
                {imageGallery}
            </div>
        </div>
        )
    }
}

export default Gallery; 