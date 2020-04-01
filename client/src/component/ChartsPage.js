import React from 'react';
import { Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

const ChartsPage = ({ dataLine }) => {
	var gradientChartOptionsConfiguration = {
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 12,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [
					{
						barPercentage: 1.6,
						gridLines: {
							drawBorder: false,
							color: 'rgba(29,140,248,0.0)',
							zeroLineColor: 'transparent'
						},
						ticks: {
							suggestedMin: 60,
							suggestedMax: 125,
							padding: 20,
							fontColor: '#9a9a9a'
						}
					}
				],
        xAxes: [
					{
						barPercentage: 1.6,
						gridLines: {
							drawBorder: false,
							color: 'rgba(29,140,248,0.1)',
							zeroLineColor: 'transparent'
						},
						ticks: {
							padding: 20,
							fontColor: '#9a9a9a'
						}
					}
				]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };
	return (
		<MDBContainer className="py-2">
			
			<Line
				data={dataLine}
				options={gradientChartOptionsConfiguration}
			/>
		</MDBContainer>
	);
};

export default ChartsPage;
