import React, { useState } from 'react';
import { Redirect } from 'react-router';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import { addPlan } from '../redux/actions/plan';

const NewPlan = ({ addPlan, loans, loanLoading, authLoading }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		steps: '',
		interval: '',
		interest: '',
		fireRedirect: false
	});

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		console.log(formData);
		addPlan(formData);

		setFormData({ ...formData, fireRedirect: true });
	};
	const { fireRedirect, name, steps, interval, interest } = formData;

	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			{!loanLoading && !authLoading ? (
				<Fragment>
					<form onSubmit={handleSubmit}>
						<div className="Form-group">
							<label className="text-white h6">Nombre del plan</label>

							<input
								name="name"
								type="text"
								value={name}
								onChange={handleChange}
								className="form-control"
							/>
						</div>

						<div className="Form-group">
							<label className="text-white h6">En cuanto paso se paga</label>

							<input
								onChange={handleChange}
								name="steps"
								className="form-control"
								type="number"
								value={steps}
								className="form-control"
							/>
						</div>

						<div className="Form-group">
							<label className="text-white h6">Tasa</label>
							<NumberFormat
								className="form-control"
								value={interest}
								thousandSeparator={true}
								suffix={'%'}
								onValueChange={values => {
									const { formattedValue, value } = values;
									setFormData({ ...formData, interest: value });
								}}
							/>
						</div>

						<div className="Form-group">
							<label className="text-white h6">Cada cuanto dia</label>
							<NumberFormat
								className="form-control"
								value={interval}
								suffix={'Dias'}
								onValueChange={values => {
									const { formattedValue, value } = values;
									setFormData({ ...formData, interval: value });
								}}
							/>
						</div>

						<div className="mt-3">
							<button className="btn btn-block btn-outline-info" type="sumbit">
								Agregar
							</button>
						</div>
					</form>
					{fireRedirect && <Redirect to={`/plan/`} />}
				</Fragment>
			) : (
				<Loading />
			)}
		</div>
	);
};

NewPlan.prototype = {
	planLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
	planLoading: state.plan.loading,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, { addPlan })(NewPlan);
