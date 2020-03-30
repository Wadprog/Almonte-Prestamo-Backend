import React, { useState } from 'react';
import { Redirect } from 'react-router';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import { payLoan } from '../redux/actions/loans';

const Payment = ({ payLoan, loans, loanLoading, authLoading, match: { params: { id } } }) => {
	const [ formData, setFormData ] = useState({
		id,
		amount: '',
		interest: '',
		fireRedirect: false,
		interestPayment: false
	});

	const handleToggle = e => {
		e.preventDefault();
		setFormData({ ...formData, interestPayment: !formData.interestPayment });
	};
	const handleSubmit = e => {
		e.preventDefault();
		console.log('calling');
		payLoan(formData);
		console.log('called pay loan');
		setFormData({ ...formData, fireRedirect: true });
	};
	const { amount, interest, fireRedirect, interestPayment } = formData;

	const [ loan ] = loans.filter(loan => loan._id === id);
	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			{!loanLoading && !authLoading ? (
				<Fragment>
					{loan &&
					loan != null && (
						<div className="text-white">
							<h3 className="text-white card-header">{`Pago para ${loan.client.name} ${loan.client.apellido} `}</h3>
							<div className="my-4">
								<h5>
									<div className="d-flex justify-content-between">
										<div>Monto del Prestamo </div>
										<NumberFormat
											value={loan.amount}
											displayType={'text'}
											thousandSeparator={true}
											prefix={'RD$'}
										/>
									</div>
								</h5>
								<h5>
									<div className="d-flex justify-content-between">
										<div>Numero de pago</div>
										<div>{loan.quota}</div>
									</div>
								</h5>

								<h5>
									<div className="d-flex justify-content-between">
										<div>Cuota a pagar</div>
										<div>
											<NumberFormat
												value={loan.amountPerQuota}
												displayType={'text'}
												thousandSeparator={true}
												prefix={'RD$'}
											/>
										</div>
									</div>
								</h5>
								<div>
									<div className="d-flex justify-content-between">
										<small>Mora</small>
										<small>
											<NumberFormat
												value={loan.interestPerQuota}
												displayType={'text'}
												thousandSeparator={true}
												prefix={'RD$'}
											/>
										</small>
									</div>
								</div>
							</div>

							<form onSubmit={handleSubmit}>
								<div className="mb-2 d-flex justify-content-between">
									<span>{`${interestPayment ? 'Interes' : 'Cantidad'}`}</span>
									<span>
										<button
											onClick={handleToggle}
											className="text-muted btn btn-sm btn-outline-se"
										>{`Solo ${interestPayment ? 'cuota' : 'Mora'}`}</button>
									</span>
								</div>
								<div className={`Form-group d-${interestPayment && 'none'}`}>
									<NumberFormat
										placeholder="Cuota"
										className="form-control"
										value={amount}
										thousandSeparator={true}
										prefix={'$'}
										onValueChange={values => {
											const { formattedValue, value } = values;

											setFormData({ ...formData, amount: value });
										}}
									/>
								</div>
								<div className={`Form-group d-${!interestPayment && 'none'}`}>
									<NumberFormat
										placeholder="Mora"
										className="form-control"
										value={interest}
										thousandSeparator={true}
										prefix={'$'}
										onValueChange={values => {
											const { formattedValue, value } = values;

											setFormData({ ...formData, interest: value });
										}}
									/>
								</div>

								<div className="mt-3">
									<button className="btn btn-block btn-outline-info" type="sumbit">
										Pagar
									</button>
								</div>
							</form>
							{fireRedirect && <Redirect to={`/loan/${id}`} />}
						</div>
					)}
				</Fragment>
			) : (
				<Loading />
			)}
		</div>
	);
};

Payment.prototype = {
	loans: PropTypes.array.isRequired,
	loanLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired,
	payLoan: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	loanLoading: state.loan.loading,
	loans: state.loan.loans,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, { payLoan })(Payment);
