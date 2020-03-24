import React from 'react';
import { connect } from 'react-redux';
import CardContainer from '../component/CardContainer';
import cards from '../Temp/cards';
import {Months,commonOptions} from '../utils/graphData';

import ChartsPage from '../component/ChartsPage';
const Home = props => {
	
	const datasets = [
		{
			...commonOptions,
			label: 'Prestamos',
			backgroundColor: 'rgba(66, 89, 89, .4)',
			borderColor: 'rgb(66, 89, 89)',
			pointBackgroundColor: 'rgb(98, 66, 89)',
			pointHoverBackgroundColor: 'rgb(0, 0, 0)',
			pointHoverBorderColor: 'rgba(48, 89, 66,1)',
			data: [ 0, 0, 80, 0, 0, 0, 0 ]
		},
		{
			...commonOptions,
			label: 'Pagos',
			backgroundColor: 'rgba(184, 185, 210, .3)',
			borderColor: 'rgb(35, 26, 136)',
			pointBorderColor: 'rgb(35, 26, 136)',
			pointBackgroundColor: 'rgb(255, 255, 255)',
			pointHoverBackgroundColor: 'rgb(0, 0, 0)',
			data: [ 28, 48, 40, 19, 86, 27, 90 ]
		},
		{
			...commonOptions,
			label: 'Gastos',
			backgroundColor: 'rgba(47, 69, 89, .2)',
			borderColor: 'rgb(89, 269, 48)',
			pointBorderColor: 'rgb(35, 26, 136)',
			pointBackgroundColor: 'rgb(255, 255, 255)',
			pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
			data: [ 56, 330, 40, 50, 86, 27, 127 ]
		}
	];

	const dataLine = {
		labels: Months,
		datasets
	};

	return (
		<div className="">
			<div id="main-content">
				<div className="container-fluid">
					<h4 className="text-white mt-4">inicio</h4>
					<div className="container-fluid">
						<CardContainer cards={cards} />
					</div>
				</div>
			</div>
			<ChartsPage dataLine={dataLine} />
		</div>
	);
};

const mapStateToProps = state => ({
statistic: state.statistic.statistics,
loading:state.statistic.loading

});

export default connect(mapStateToProps, {})(Home);
