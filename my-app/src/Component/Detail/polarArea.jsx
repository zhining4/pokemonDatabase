import React , {Component} from 'react'
import {Polar} from 'react-chartjs-2';

class PolarArea extends Component {
    render() {
        const stats = this.props.pokemon.stats;
        var values = [];
        var labels = [];
        for (var i = 0; i < stats.length; i++) {
            values.push(stats[i].base_stat);
            labels.push(stats[i].stat.name);
        }
        
        var data = {
            datasets: [ 
                {
                    data: values,
                    backgroundColor: ['rgba(250, 50, 50, 0.65)', 'rgba(50, 250, 50, 0.65)', 
                    'rgba(50, 50, 250, 0.65)', 'rgba(0, 250, 250, 0.65)', 'rgba(250, 0, 250, 0.65)', 
                    'rgba(250, 250, 0, 0.65)'],
                    borderWidth: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
                } 
            ],
            labels: labels,
            options: {
                responsive: true,
            }
        }

        return (
            <div>
                <Polar data = {data}/>
            </div>
        )
    }
}

export default PolarArea;