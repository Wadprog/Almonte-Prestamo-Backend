import React, { useState } from 'react';
import { Redirect } from 'react-router';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import { addExpense } from '../redux/actions/expenses';

const NewExpense = ({ addExpense, expenseLoading }) => {
	const [ formData, setFormData ] = useState({
		description: '',
		amount: '',
		fireRedirect: false
	});

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		console.log(formData);
		addExpense(formData);
		setFormData({ ...formData, fireRedirect: true });
	};
	const { fireRedirect, amount, description } = formData;

	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			{!expenseLoading ? (
				<Fragment>
					<form onSubmit={handleSubmit}>
						<div className="Form-group">
							<label className="text-white h6">Descripcion del gasto</label>
							<textarea
								className="form-control"
								name="description"
								value={description}
								onChange={handleChange}
							/>
						</div>

						<div className="Form-group mt-2">
								<label className="text-white h6">Cantidad</label>
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

						<div className="mt-3">
							<button className="btn btn-block btn-outline-info" type="sumbit">
								Agregar Gasto
							</button>
						</div>
					</form>
					{fireRedirect && <Redirect to={`/expense/`} />}
				</Fragment>
			) : (
				<Loading />
			)}
		</div>
	);
};

NewExpense.prototype = {
	expenseLoading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
	expenseLoading: state.expense.loading
});
export default connect(mapStateToProps, { addExpense })(NewExpense);
