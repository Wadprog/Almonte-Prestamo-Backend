import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { renewLoan } from '../redux/actions/loans';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
//import { registerClient } from '../redux/actions/profile';

const LoanRenew = ({
	profiles,
	loanLoading,
	profileLoading,
	renewLoan,
	match: { params: { id } }
}) => {

	const [ formData, setFormData ] = useState({
		id:id,
		amount: 0
 });
 

	const handleSubmit = e => {
		e.preventDefault();
		if (Infoverified()) renewLoan(formData);
	
	};

	const { fireRedirect, amount } = formData;

	const Infoverified = () => {
		return amount !== 0 ;
	};

	return (
		<div className="container text-white mt-5 pt-5">
			{ !loanLoading ?(
				<div>
			
					<div>
						<div className="h6 card-header">{`Renovar pretamo`}</div>

						<div className="card-body">
							<form onSubmit={handleSubmit}>
								<div className="Form-group mb-3">
									<label>Cantidad</label>
									<NumberFormat
										className="form-control"
										value={amount}
										thousandSeparator={true}
										prefix={'$'}
										onValueChange={values => {
											const { formattedValue, value } = values;
											// formattedValue = $2,223
											// value ie, 2223
											setFormData({ ...formData, amount: value });
										}}
									/>
								</div>
				

								<div className="mt-3">
									<button className="btn btn-block btn-outline-info"> Renovar Prestamo</button>
								</div>
							</form>
							{fireRedirect && <Redirect to={`/client/${id}`} />}
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};

LoanRenew.prototype = {
	profiles: PropTypes.array.isRequired,
	profileLoading: PropTypes.bool.isRequired,
	loanLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired,
	renewLoan: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	profiles: state.profile.profiles,
	profileLoading: state.profile.isLoading,
	plans: state.plan.plans,
	planLoading: state.plan.loading,
	loanLoading: state.loan.loading,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, { renewLoan })(LoanRenew);
