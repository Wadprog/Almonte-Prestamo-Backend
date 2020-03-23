import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import {filterLoans} from '../redux/actions/loans'

const Clients = ({ loans, loanLoading, authLoading, filteredLoans,filterLoans }) => {
	const [ pageState, setPageState ] = useState({
		modifyProfile: false,
		newPayment: false,
		newLoan: false,
		id: ''
	});
	const { id, modifyProfile, newPayment, newLoan } = pageState;
	const { Fragment } = React;
	const openModal = e => {
		console.log(id);
		setPageState({ ...pageState, [e.target.name]: true, id: e.target.id });
	};
	const closeModals = () => {
		setPageState({ modifyProfile: false, newPayment: false, newLoan: false, newClient: false });
	};
	const handleFilter = e => {
		console.log(e.target.value);
		filterLoans(e.target.value, loans)
	};
	return (
		<div className="container mt-5">
			<Fragment>
				{!loanLoading && !authLoading ? (
					<Fragment>
						<div className="row">
							<div className="col-md-6 " />
							<div className="col-md-6 col-sm-12 ">
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text">
											<i className="fa fa-filter"></i>
											<i className="fa fa-user mx-2 text-muted"></i>
											<i className="fa fa-money text-muted"></i>
										</span>
									</div>
									<input
										onChange={handleFilter}
										type="text"
										className="form-control"
										aria-label="Text input with dropdown button"
									/>
								</div>
							</div>
						</div>
						<div classNamee="card p-2">
							<div className="card-header">
								<h5 className=" text-white">Lista de los prestamos</h5>
							</div>
							<div className="card-body">
								<div className="list-group">
									{filteredLoans &&
										filteredLoans !== null &&
										filteredLoans.length > 0 &&
										filteredLoans.map(loan => (
											<li key={loan._id} className=" my-item list-group-item mb-2 p-0">
												<div className=" bg-light  rounded p-4">
													<div className="mb-2">
														<span className={`text-${loan.status ? 'success' : 'danger'}`}>
															{loan.status ? 'Pagado' : 'No Pagado'}
														</span>
													</div>
													<div className=" mb-1 d-flex justify-content-between  ">
														<h5 className="">{`${loan.client.name} ${loan.client
															.apellido}`}</h5>

														<h5
															className={`text-bold text-${loan.status
																? 'success'
																: 'danger'}`}
														>
															<NumberFormat
																value={loan.amount}
																displayType={'text'}
																thousandSeparator={true}
																prefix={'RD$'}
															/>
														</h5>
													</div>

													<div className="mb-1">
														<span className="text-muted mr-4 ">
															{loan.client.cedula.split().length == 11 ? (
																<NumberFormat
																	value={loan.client.cedula}
																	displayType={'text'}
																	format="###-#######-#"
																/>
															) : (
																loan.client.cedula
															)}
														</span>

														<span className="text-muted">
															<NumberFormat
																value={loan.client.telefono}
																displayType={'text'}
																format="(###) ###-####"
															/>
														</span>
													</div>
													<div className="mb-1">
														<span className="text-muted">{loan.client.dirreccion}</span>
													</div>
													<div>
														<span className="text-muted mr-3">Ciudad :</span>
														<span className="text-muted">
															{loan.client.ciudad.charAt(0).toUpperCase() +
																loan.client.ciudad.slice(1)}
														</span>
													</div>
													<div className="mb-3">
														<span className="text-muted mr-3 ">
															{`Fecha ${loan.status ? 'ultimo :' : 'proximo'} pago `}
														</span>

														<span className="text-muted">{loan.nextpaymentDate}</span>
													</div>

													<div className="d-flex justify-content-between
          ">
														<a href={`/loan/${loan._id}`} className="btn btn-outline-info">
															Detalle
														</a>

														<a
															href={`/newloan/${loan.client._id}`}
															className="btn btn-outline-info"
														>
															Nuevo Prestamo
														</a>
													</div>
												</div>
											</li>
										))}
								</div>
							</div>
						</div>
					</Fragment>
				) : (
					<Loading />
				)}
			</Fragment>
		</div>
	);
};
Clients.propTypes = {
	filteredLoans:PropTypes.array.isRequired,
	loans: PropTypes.array.isRequired,
	loanLoading: PropTypes.array.isRequired,
	authLoading: PropTypes.bool.isRequired,
	filterLoans:PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	loans: state.loan.loans,
	filteredLoans:state.loan.filteredLoans,
	loanLoading: state.loan.loading,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, {filterLoans})(Clients);
