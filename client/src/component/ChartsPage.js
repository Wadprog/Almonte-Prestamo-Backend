import React from 'react';
import { Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

const ChartsPage = ({ dataLine }) => {
	return (
		<MDBContainer className="text-white">
			<h3 className="mt-5">Report de los ultimos 12 meses</h3>
			<Line data={dataLine} options={{ responsive: true }} />
		</MDBContainer>
	);
};

export default ChartsPage;
