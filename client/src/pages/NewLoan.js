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
		plan: '',
		date: new Date()
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

	const { date, fireRedirect, amount, plan } = formData;

	const Infoverified = () => {
		console.log(parseInt(amount));
		return amount !== 0 && plan !== '';
	};
	const [ editting, toggleEditting ] = useState();

	const handleDateAdd = e => {
		toggleEditting({ editting: e.target.checked });
	};

	return (
		<div className="container text-white mt-5 pt-5">
			{!planLoading && !loanLoading && !profileLoading && !authLoading ? (
				<div>
					<div className="h6 card-header">{`Crear Prestamo por ${client.name} ${client.apellido}`}</div>

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

							{editting ? (
								<div className="Form-group mt-2">
									<label>Fecha</label>
									<input
										type="date"
										className="form-control"
										onChange={handleChange}
										value={date}
										name="date"
										className="form-control"
									/>
								</div>
							) : (
								<label>
									<input
	
										name="editor"
										onChange={handleDateAdd}
										className=" d-none "
										type="checkbox"
										checked={editting}
									/>
									Agregar fecha
								</label>
							)}

							<div className="mt-3">
								<button className="btn btn-block btn-outline-info"> Crear Nuevo Prestamo</button>
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
