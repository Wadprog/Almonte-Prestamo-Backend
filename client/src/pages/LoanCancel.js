import React from 'react';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import { removeLoan } from '../redux/actions/loans';
const LoanCancel = ({ removeLoan, match: { params: { id } } }) => {
	const handleClick = e => {
		removeLoan(id);
	};
	return (
		<div className="container mt-5 pt-5">
			<div className="alert alert-warning  text-dark">
				<h4 className="alert-heading text-dark">Cancelar Prestamo</h4>
				<p>
					{`Confirmar que quieres cancelar el Prestamo `}
					<a href={`/loan/${id}`}> detalles </a>
				</p>
				<hr />
				<div className="mb-0 d-flex justify-content-around">
					<a href={`/loan/${id}`} className="btn btn-outline-warning">
						No{' '}
					</a>
					<button onClick={handleClick} className="btn btn-outline-danger">
						Si{' '}
					</button>
				</div>
			</div>
			
		</div>
 )
	
};

export default connect(null, { removeLoan })(LoanCancel);
