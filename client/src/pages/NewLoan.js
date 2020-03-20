import React, { useState } from 'react';
import { setAlert } from '../redux/actions/alert';
import NumberFormat from 'react-number-format';
import { addLoan } from '../redux/actions/loans';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
//import { registerClient } from '../redux/actions/profile';

const NewLoan = ({
	plans,
	planLoading,
	profiles,
	loanLoading,
	profileLoading,
	authLoading,
	addLoan,
	setAlert,
	match: { params: { id } }
}) => {
	const [ formData, setFormData ] = useState({
		client: id,
		amount: 0,
		plan: ''
	});
	const [ client ] = profiles.filter(profile => profile._id === id);
	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (Infoverified()) addLoan(formData);
		else
			//addLoan(formData);
			console.log('Verificar toda las informaciones');
		setFormData({ ...formData, fireRedirect: true });
	};

	const { fireRedirect, amount, plan } = formData;

	const Infoverified = () => {
		console.log(parseInt(amount));
		return amount !== 0 && plan !== '';
	};
	return (
		<div className="container mt-5 pt-5">
			{!planLoading && !loanLoading && !profileLoading && !authLoading ? (
				<div className="card">
					<div className="card-header">
						Crear Prestamo por
						<span className="h5 text-bold ">{` ${client.name} ${client.apellido}`}</span>
					</div>
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div>Cantidad</div>
							<div className="input-group mb-3">

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

								

								<div class="input-group-append">
									<span class="input-group-text">RD$</span>
								</div>
							</div>
							<div className="Form-group">
								<label>Elegir el plan</label>
								<select
									className="form-control"
									onChange={handleChange}
									value={plan}
									name="plan"
									className="form-control"
								>
									<option />
									{plans.map(plan => <option value={plan._id}>{plan.name}</option>)}
								</select>
							</div>

							<div className="mt-3">
								<button className="btn btn-block btn-outline-info"> Crear Nuevo Cliente</button>
							</div>
						</form>
						{fireRedirect && <Redirect to={`/client/${id}`} />}
					</div>
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};

NewLoan.prototype = {
	profiles: PropTypes.array.isRequired,
	profileLoading: PropTypes.bool.isRequired,
	loanLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired,
	addLoan: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, { addLoan })(NewLoan);
