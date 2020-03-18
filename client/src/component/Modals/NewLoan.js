import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import acction to modify user on DB

import './Modal.css';

const NewLoan = ({ addNewLoan, closeModals, id }) => {
	const [ formData, setFormData ] = useState({ amount: 0, plan: '' });
	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
  e.preventDefault();
  formData.client= id;
  addNewLoan(formData)
};
	const closeModal = e => {
		closeModals();
	};
	const { amount, plan } = formData;
	return (
		<div className="Modal-wrapper">
			<div className="Modal w-75">
				<div name="modifyProfile" onClick={closeModals} className="Modal-close-btn">
					X
				</div>
				<div className="card">
					<div className="card-header">Informaciones actual del clientes</div>
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<label> Cantidad </label>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">$</span>
								</div>

								<input
									onChange={handleChange}
									value={amount}
									name="amount"
									type="number"
									className="form-control"
								/>

								<div className="input-group-append">
									<span className="input-group-text">.00</span>
								</div>
							</div>

							<div className="Form-group mb-3">
								<label> Plan </label>
								<select
									onChange={handleChange}
									value={plan}
									name="plan"
									type="number"
									className="form-control"
								>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
							</div>
							<div className="d-flex">
								<button className="btn btn-lg btn-block btn-outline-info mr-3">Crear</button>

								<button onClick={closeModals} className="btn btn-lg btn-outline-warning">
									Cancelar
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

NewLoan.prototype = {
 
 loading:PropTypes.bool.isRequired
};
var mapPropToState = state => ({
	loading: state.loan.loading
});
export default connect(mapPropToState )(NewLoan);
