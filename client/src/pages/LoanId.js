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
	payment,
	match: { params: { id } }
}) => {
	const [ loan ] = loans.filter(loan => loan._id === id);
	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			{!loanLoading && !authLoading ? (
				<Fragment>
					{loans &&
					loans !== null &&
					loans.length > 1 && (
						<div key={loan._id} className=" my-item list-group-item mb-2 p-0 bg-none">
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
