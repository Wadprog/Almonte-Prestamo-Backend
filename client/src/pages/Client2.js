import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { loadLoans, addLoan } from '../redux/actions/loans';

import { connect } from 'react-redux';
import Accordion from '../component/Accordion';
import Loading from '../component/layout/Loading';
import ModifyProfile from '../component/Modals/ModifyProfile';
import NewLoan from '../component/Modals/NewLoan';


import ExpandableRow from '../component/layout/ExpandableRow'
import './Client2.css'
const Client2 = ({ addLoan, profiles, loans, loanLoading, profileLoading, authLoading, match: { params: { id } } }) => {

	const [ client ] = profiles.filter(profile => profile._id === id);
 const clientLoans = loans.filter(loan => loan.client === id);
	const paidLoans =clientLoans.filter(loan => loan.paidStatus);
 const [ unpaidLoan ] = clientLoans.filter(loan => !loan.paidStatus);
 
	const [ pageState, setPageState ] = useState({
		modifyProfile: false,
		newPayment: false,
		newLoan: false,
		loading: false
 });
 

	
	const { loading, modifyProfile, newPayment, newLoan } = pageState;
	const { Fragment } = React;
	const setPage = e => {
		setPageState({ ...pageState, [e.target.name]: true });
	};
	const closeModals = () => {
		setPageState({ modifyProfile: false, newPayment: false, newLoan: false });
	};
	const addNewLoan = async formData => {
		await closeModals();
		if(unpaidLoan != null){
		if(window.confirm("Este cliente tiene deuda pendiente se cancelara y el monto sera agregado a este"))
		addLoan(formData);  
		} else {
			addLoan(formData); 
		}
	};
	return (
		
		<Fragment>
			{loanLoading || profileLoading || authLoading ? <Loading /> :
			<Fragment>
			{modifyProfile && <ModifyProfile id={id} closeModals={closeModals} />}
			{newLoan && <NewLoan id={id} closeModals={closeModals} addNewLoan={addNewLoan} />}

			<div className="container pt-5">
				<div className="d-flex text-white pb-5 border-bottom ">
					<i className="fa fa-user fa-5x p-5 bg-primary  mr-5" />
					{client !== undefined && (
						<div className="text-white">
							<h4>
								<span className="text-dark text-bold mr-2">Score:</span>
								500
							</h4>
							<h6>
								<span className="text-dark text-bold mr-2">Nombre:</span> {client.name}
							</h6>
							<h6>
								<span className="text-dark text-bold mr-2">Cedula:</span> {client.cedula}
							</h6>
							<h6>
								<span className="text-dark text-bold mr-2">Direccion:</span> {client.address}
							</h6>
							<h6>
								<span className="text-dark text-bold mr-2">Referencia:</span> {client.addressRef}
							</h6>
							<div className="btn-group mt-3">
								<button
									onClick={setPage}
									name="modifyProfile"
									type="button"
									className="btn btn-outline-warning"
								>
									Modificar
								</button>

								<button
									type="button"
									onClick={setPage}
									name="newLoan"
									type="button"
									className="btn btn-outline-info"
								>
									Nuevo Prestamo
								</button>
							</div>
						</div>
					)}
				</div>
				{clientLoans !== null && clientLoans.length > 0 ? (
					<Fragment>
						{unpaidLoan !== {} &&
						unpaidLoan && (
							<Fragment>
								<h6 className="text-white mt-4">Prestamo Activo</h6>

								<ul className="list-group mb-5 ">
									<li key={unpaidLoan._id} className="list-group-item mb-1 p-0">
										<Accordion {...unpaidLoan} />
									</li>
								</ul>
							</Fragment>
						)}

						{paidLoans !== null &&
						paidLoans.length > 0 && (
							<Fragment>
								<h6 className="text-white mt-5 mb-2">Lista de prestamos pagados </h6>
								<table className="  mb-5  ">
									<thead className="  mb-5  ">
										<tr>
											<th scope="col">Nombre</th>
											<th scope="col">Valor</th>
										</tr>
									</thead>

									{paidLoans.map(loan => (
								<ExpandableRow {...loan}/>
									))}
								</table>
							</Fragment>
						)}
					</Fragment>
				) : (
					<h6 className="text-white text-center">Este cliente no tiene registro de deuda</h6>
				)}
			</div>
		</Fragment>
}
		</Fragment>
	);
};
Client2.prototype = {
	profiles: PropTypes.array.isRequired,
	loans: PropTypes.array.isRequired,
	loanLoading: PropTypes.bool.isRequired,
	profileLoading: PropTypes.bool.isRequired,
	authLoading:PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
	profiles: state.profile.profiles,
	loans: state.loan.loans,
	loanLoading: state.loan.loading,
	profileLoading:state.profile.isLoading, 
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, { loadLoans, addLoan })(Client2);
