import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';

const NewLoan = ({
	plans,
	planLoading,
	profiles,
	profileLoading,
	loans,
	loanLoading,
	authLoading,
	payments,
	match: { params: { id } }
}) => {
	const [ loan ] = loans.filter(loan => loan._id === id);
	const loanPayments = payments.filter(payment => payment.loan === id);

	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			{!loanLoading && !authLoading ? (
				<Fragment>
					{loans &&
					loans !== null &&
					loans.length > 0 && (
						<div key={loan._id} className=" my-info list-group-item mb-2 p-0">
							<div className="   rounded p-4">
								<div className="mb-2">
									<span className={`text-${loan.status ? 'success' : 'danger'}`}>
										{loan.status ? 'Pagado' : 'No Pagado'}
									</span>
								</div>
								<div className=" mb-1 d-flex justify-content-between  ">
									<h5 className="">{`${loan.client.name} ${loan.client.apellido}`}</h5>

									<h5 className={`text-bold text-${loan.status ? 'success' : 'danger'}`}>
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
										{loan.client.ciudad.charAt(0).toUpperCase() + loan.client.ciudad.slice(1)}
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
									<a href={`/payment/${loan._id}`} className="btn btn-block btn-outline-info">
										Pagar
									</a>
								</div>
							</div>
						</div>
					)}
					{loanPayments && loanPayments !== null && loanPayments.length > 0 ? (
						<div>
							{
								<ul className="list-group">
									{loanPayments.map(payment => (
										<li className="list-group-item my-info">
											<div
												className={`d-flex justify-content-between text-${payment.status ===
												'paid'
													? 'success'
													: 'danger'}`}
											>
												<span>Numero pago :</span>
												<span>{payment.quota}</span>
											</div>

											<div
												className={`d-flex justify-content-between text-${payment.status ===
												'paid'
													? 'success'
													: 'danger'}`}
											>
												<span>Estado:</span>
												<span>{payment.status}</span>
											</div>

											<div>
												<span className="mr-2">Fecha a pagar:</span>
												<span>{payment.dateToPay}</span>
											</div>
											<div>
												<span className="mr-2">Fecha que pago:</span>
												<span>{payment.dateAmountPaid}</span>
											</div>
											<div>
												<span className="mr-2">Monto que pago:</span>
												<span>
													<NumberFormat
														value={payment.amountPaid}
														displayType={'text'}
														thousandSeparator={true}
														prefix={'RD$'}
													/>
												</span>
											</div>
											<div>
												<span className="mr-2">Fecha que pago el interes:</span>
												<span>{payment.dateInterestPaid}</span>
											</div>
											<div>
												<span className="mr-2">Monto de interes que pago:</span>
												<span>
													<NumberFormat
														value={payment.interestPaid}
														displayType={'text'}
														thousandSeparator={true}
														prefix={'RD$'}
													/>
												</span>
											</div>
											<div />
											{payment.comment &&
											payment.comment != null &&
											payment.comment !== '' && (
												<div>
													<span className="mr-2">Comentario</span>
													<span>{payment.dateInterestPaid}</span>
												</div>
											)}
										</li>
									))}
								</ul>
							}
						</div>
					) : (
						<h6>No hay pagos por este prestamo</h6>
					)}
				</Fragment>
			) : (
				<Loading />
			)}
		</div>
	);
};

NewLoan.prototype = {
	profiles: PropTypes.array.isRequired,
	profileLoading: PropTypes.bool.isRequired,
	loans: PropTypes.array.isRequired,
	loanLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired,
	payments: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
	profiles: state.profile.profiles,
	profileLoading: state.profile.isLoading,
	payments: state.payment.payments,
	plans: state.plan.plans,
	planLoading: state.plan.loading,
	loanLoading: state.loan.loading,
	loans: state.loan.loans,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, {})(NewLoan);
