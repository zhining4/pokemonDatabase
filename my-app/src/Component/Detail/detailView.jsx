import React , {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Label } from 'semantic-ui-react';

class DetailView extends Component {
    render() {
             //display the ability
            const abilitiesView = this.props.pokemon.abilities.map(ability => {
                return (
                    <Label key = {this.props.pokemon.name + ability.ability.name}>
                        {ability.ability.name}
                    </Label>
                )
            });
              //display some data about the pokemon and its abilities
            return (
            <div>
                <Card>    
                    <Card.Content>
                        <Card.Header>
                            {this.props.pokemon.name}
                        </Card.Header>
                        <Card.Meta>
                            Pokedex #{this.props.pokemon.id}
                        </Card.Meta>
                        <img
                        src={this.props.pokemon.sprites.front_default}
                        alt={`Sprite of ${this.props.pokemon.name}`}
                        />
                        <div>Abilities: {abilitiesView}</div>
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