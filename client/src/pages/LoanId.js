import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import LoanDescription from '../component/LoanDescription';

const NewLoan = ({
	paymentLoading,
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
			{!loanLoading && !authLoading && !paymentLoading ? (
				<Fragment>
					{loans &&
					loans !== null &&
					loans.length > 0 && (
						<div key={loan._id} className=" my-info list-group-item mb-2 p-0">
							<LoanDescription loan={loan} noPaymentBtn={loan.status}noHistoryBtn={true} />
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
												'Pagado'
													? 'success'
													: 'danger'}`}
											>
												<span>Numero pago :</span>
												<span>{payment.quota}</span>
											</div>

											<div
												className={`d-flex justify-content-between text-${payment.status ===
												'Pagado'
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
						<h6 className="text-white">Aun no hay pagos por este prestamo</h6>
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
	payments: PropTypes.array.isRequired,
	paymentLoading:PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
	profiles: state.profile.profiles,
	profileLoading: state.profile.isLoading,
	payments: state.payment.payments,
	paymentLoading: state.payment.loading,
	plans: state.plan.plans,
	planLoading: state.plan.loading,
	loanLoading: state.loan.loading,
	loans: state.loan.loans,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, {})(NewLoan);
