import React , {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import {PolarDetail} from './polarArea.module.scss';
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
            labels: labels,
            datasets: [ 
                {
                    data: values,
                    label: "Statistics",
                    font: {
                        size: 15,
                    },
                    backgroundColor: ['rgba(200, 150, 250, 0.8)', 'rgba(50, 250, 50, 0.65)', 
                    'rgba(50, 50, 250, 0.65)', 'rgba(250, 250, 0, 0.65)', 'rgba(250, 50, 50, 0.65)',
                    'rgba(200, 200, 200, 0.8)'],
                } 
            ],
        }

        var options = {
            responsive: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            paddingtop: 200,
                            beginAtZero: true, 
                            min: 0,
                            max: 200,
                            stepSize: 50,
                        },
                    }
                ],
                xAxes: [
                    {
                        barPercentage: 1,
                    }
                ],
            },
        }

        return (
            <div className = {PolarDetail} >
                <Bar data = {data} options = {options}/>
            </div>
        )
    }
}

export default PolarArea;