import React , {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Label } from 'semantic-ui-react';
import {DetailImage, DetailTitle, DetailText, DetailSection} from './detailView.module.scss';

class DetailView extends Component {
    render() {
             //display the ability
            const abilitiesView = this.props.pokemon.abilities.map(ability => {
                return (
                    <Label key = {this.props.pokemon.name + ability.ability.name}>
                        {ability.ability.name[0].toUpperCase() + ability.ability.name.substring(1)}
                    </Label>
                )
            });

            //display type
            var types = [];
            for (var i = 0; i < this.props.pokemon.types.length; i++) {
                types.push((this.props.pokemon.types[i].type.name[0].toUpperCase()) 
                + (this.props.pokemon.types[i].type.name.substring(1)));
            }

            const typesView = types.map(type => {
                return (
                    <Label key = {this.props.pokemon.name + type}>
                        {type}
                    </Label>
                )
            });

              //display some data about the pokemon and its abilities
            return (
            <div>
                <Card>    
                    <Card.Content>
                        <Card.Header className = {DetailTitle}>
                            {this.props.pokemon.name} #{this.props.pokemon.id}
                        </Card.Header>
                        <img className = {DetailImage}
                        src={this.props.pokemon.sprites.front_default}
                        alt={`Sprite of ${this.props.pokemon.name}`}
                        />
                        <div className = {DetailText}>
                            <div className = {DetailSection}>
                                Height: {this.props.pokemon.height}
                            </div>

                            <div className = {DetailSection}>
                                Weight: {this.props.pokemon.weight}
                            </div>

                            <div className = {DetailSection}>
                                Type: {typesView}
                            </div>

                            <div className = {DetailSection}>
                                Abilities: {abilitiesView}
                            </div>
                        </div>
                    </Card.Content>
                </Card>
        </div>   
        )
    } 
} 

DetailView.propTypes = {
    pokemon: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      abilities: PropTypes.arrayOf(PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string,
          url: PropTypes.string,
        })
      })),
      sprites: PropTypes.object,
    }),
  }

 export default DetailView;  