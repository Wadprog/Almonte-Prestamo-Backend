import React, { useState } from 'react';
import { Redirect } from 'react-router';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import {payLoan} from '../redux/actions/loans'

const Payment = ({ payLoan, loans, loanLoading, authLoading, match: { params: { id } } }) => {
	const [ formData, setFormData ] = useState({
		id,
		amount:'',
		interest:'',
		fireRedirect: false
	});

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = e => {
		e.preventDefault();
			console.log("calling")
		payLoan(formData); 
		console.log("called pay loan")
setFormData({ ...formData, fireRedirect: true });
	};
	const { amount, interest,fireRedirect } = formData;

	const [ loan ] = loans.filter(loan => loan._id === id);
	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			{!loanLoading && !authLoading ? (
				<Fragment>
					{loan &&
					loan != null && (
						<Fragment>
							<h1 className='text-white'> {`Pago para ${loan.client.name} ${loan.client.apellido} `}</h1>

							<h2>{`Cantidad:${loan.amount}`}</h2>
							<h2>{`Numero de pago:${loan.quota}`}</h2>
							<h2>{`Cuota:${loan.amountPerQuota}`}</h2>
							<h2>{`Interest:${loan.interestPerQuota}`}</h2>

							<form onSubmit={handleSubmit}>
								<div className="Form-group">
									<label>Cantidad</label>

								<NumberFormat
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
								<div className="Form-group">
									<label>Interest 2</label>

									<NumberFormat
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
									<button 
									className="btn btn-block btn-outline-info"
									type="sumbit"
									> 
									Pagar</button>
								</div>
							</form>
							{fireRedirect && <Redirect to={`/loan/${id}`} />}
						</Fragment>
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
	payLoan:PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	loanLoading: state.loan.loading,
	loans: state.loan.loans,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, {payLoan})(Payment);
