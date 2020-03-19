import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { loadLoans, addLoan } from '../redux/actions/loans';

import { connect } from 'react-redux';
import Accordion from '../component/Accordion';
import Loading from '../component/layout/Loading';
import ModifyProfile from '../component/Modals/ModifyProfile';
import NewLoan from '../component/Modals/NewLoan';

import ExpandableRow from '../component/layout/ExpandableRow';
import './Client.css';
const Client2 = ({ addLoan, profiles, loans, loanLoading, profileLoading, authLoading, match: { params: { id } } }) => {
	const [ client ] = profiles.filter(profile => profile._id === id);
	const clientLoans = loans.filter(loan => loan.client === id);
	const paidLoans = clientLoans.filter(loan => loan.paidStatus);
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
		if (unpaidLoan != null) {
			if (window.confirm('Este cliente tiene deuda pendiente se cancelara y el monto sera agregado a este'))
				addLoan(formData);
		} else {
			addLoan(formData);
		}
	};
	return (
		<Fragment>
			{loanLoading || profileLoading || authLoading ? (
				<Loading />
			) : (
				<Fragment>
					{modifyProfile && <ModifyProfile id={id} closeModals={closeModals} />}
					{newLoan && <NewLoan id={id} closeModals={closeModals} addNewLoan={addNewLoan} />}

					<div className="container pt-5">
						<div className=" pb-5 border-bottom ">
							{client !== undefined && (
								<div className=" mt-5 ">
									<div className="my-info  mb-4 p-0 rounded-0">
										<div className="  ">
											<a
												href={`/newLoan/${client._id}`}
												className=" text-white btn btn-outline-secondary btn-block "
											>
												Crear nuevo Prestamo
											</a>
										</div>
									</div>
									<ul className="list-group my-info-list">
										<li className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Nombre</h6>
												<span className="text-muted">
													{client.name.charAt(0).toUpperCase() + client.name.slice(1)}
												</span>
											</div>
										</li>
										<li className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Appellido</h6>
												<span className="text-muted">
													{client.apellido.charAt(0).toUpperCase() + client.apellido.slice(1)}
												</span>
											</div>
										</li>
										<li className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Cedula</h6>
												<span className="text-muted">
													{client.cedula.split().length == 11 ? (
														<NumberFormat
															value={client.cedula}
															displayType={'text'}
															format="###-#######-#"
														/>
													) : (
														client.cedula
													)}
												</span>
											</div>
										</li>
										<li className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Telefono</h6>
												<span className="text-muted">
													<NumberFormat
														value={client.telefono}
														displayType={'text'}
														format="(###) ###-####"
													/>
												</span>
											</div>
										</li>
										{client.telefono2 && (
											<li className="my-info list-group-item mb-2 p-0 rounded-0">
												<div className=" py-2 pl-2">
													<h6 className="text-bold">Telefono2 </h6>
													<span className="text-muted">
														<NumberFormat
															value={client.telefono2}
															displayType={'text'}
															format="(###) ###-####"
														/>
													</span>
												</div>
											</li>
										)}

										{client.telefono3 && (
											<li className="my-info list-group-item mb-2 p-0 rounded-0">
												<div className=" py-2 pl-2">
													<h6 className="text-bold">Telefono2 </h6>
													<span className="text-muted">
														<NumberFormat
															value={client.telefono3}
															displayType={'text'}
															format="(###) ###-####"
														/>
													</span>
												</div>
											</li>
										)}
										<li className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Dirreccion</h6>
												<span className="text-muted">
													{client.dirreccion.charAt(0).toUpperCase() +
														client.dirreccion.slice(1)}
												</span>
											</div>
										</li>
										<li className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Ciudad</h6>
												<span className="text-muted">
													{client.ciudad.charAt(0).toUpperCase() + client.ciudad.slice(1)}
												</span>
											</div>
										</li>
										<div className="row">
											<div className="col-md-6" />
											<div
												className={` col-md-6 justify-content-end pr-5 ${!modifyProfile
													? 'd-none'
													: 'd-flex'}`}
											>
												<button className="btn btn-primary">Guardar</button>
											</div>
										</div>
									</ul>
									<div className="my-info  mt-4 mb-2 p-0 rounded-0">
										<div className="  ">
											<a
												href={`/newLoan/${client._id}`}
												className=" text-white btn btn-outline-secondary btn-block "
											>
												Ver los Prestamo de este cliente
											</a>
										</div>
									</div>
									
									Aqui aparecera los prestamo si hay 

								</div>
							)}
						</div>

					</div>
				</Fragment>
			)}
		</Fragment>
	);
};
Client2.prototype = {
	profiles: PropTypes.array.isRequired,
	loans: PropTypes.array.isRequired,
	loanLoading: PropTypes.bool.isRequired,
	profileLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
	profiles: state.profile.profiles,
	loans: state.loan.loans,
	loanLoading: state.loan.loading,
	profileLoading: state.profile.isLoading,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, { loadLoans, addLoan })(Client2);
