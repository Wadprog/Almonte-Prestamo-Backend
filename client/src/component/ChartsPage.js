import React from 'react';
import { Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

const ChartsPage = ({ dataLine }) => {
	return (
		<MDBContainer className="text-white">
			<h5 className="my-5">Report de los ultimos 12 meses</h5>
			<Line data={dataLine} options={{ responsive: true }} />
		</MDBContainer>
	);
};

export default ChartsPage;
