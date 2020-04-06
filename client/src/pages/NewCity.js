import React, { useState } from 'react';
import { Redirect } from 'react-router';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import { addCity } from '../redux/actions/city';

const NewCity = ({ addCity, loans, loanLoading, authLoading }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		fireRedirect: false
	});

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		console.log(formData);
		addCity(formData);

		setFormData({ ...formData, fireRedirect: true });
	};
	const { fireRedirect, name } = formData;

	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			{!loanLoading && !authLoading ? (
				<Fragment>
					<form onSubmit={handleSubmit}>
						<div className="Form-group">
							<label className="text-white h6">Nombre de la ciudad</label>

							<input
							required="true"
								name="name"
								type="text"
								value={name}
								onChange={handleChange}
								className="form-control"
							/>
						</div>

						
						<div className="mt-3">
							<button className="btn btn-block btn-outline-info" type="sumbit">
								Agregar
							</button>
						</div>
					</form>
					{fireRedirect && <Redirect to={`/cities/`} />}
				</Fragment>
			) : (
				<Loading />
			)}
		</div>
	);
};

NewCity.prototype = {
cityLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
cityLoading: state.city.loading,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, { addCity })(NewCity);
