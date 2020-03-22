import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerClient } from '../redux/actions/profile';
import Loading from '../component/layout/Loading';

const NewClient = ({ cityLoading, cities, registerClient }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		apellido: '',
		cedula: '',
		telefono: '',
		telefono2: '',
		telefono3: '',
		dirreccion: '',
		ciudad: '',
		DirReferencia: '',
		fireRedirect: false
	});

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		console.log(formData);
		registerClient(formData);
		setFormData({ ...formData, fireRedirect: true });
	};
	const {
		fireRedirect,
		name,
		apellido,
		cedula,
		telefono,
		telefono2,
		telefono3,
		dirreccion,
		ciudad,
		DirReferencia
	} = formData;

	return (
		<div className="container mt-5 pt-5">
			{!cityLoading ? (
				<div className="card">
					<div className="card-header">Crear nuevo cliente</div>
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="Form-group">
								<label>Nombre</label>
								<input
									onChange={handleChange}
									value={name}
									name="name"
									type="text"
									className="form-control"
								/>
							</div>
							<div className="Form-group">
								<label>Apellido</label>
								<input
									onChange={handleChange}
									value={apellido}
									name="apellido"
									type="text"
									className="form-control"
								/>
							</div>

							<div className="Form-group">
								<label>Cedula</label>
								<input
									onChange={handleChange}
									value={cedula}
									name="cedula"
									type="text"
									className="form-control"
								/>
							</div>
 
							<div className="Form-group">
								<label>Telefono</label>

								<NumberFormat
									className="form-control"
									value={telefono}
									format="(###) ###-####"
									onValueChange={values => {
										const { formattedValue, value } = values;
										// formattedValue = $2,223
										// value ie, 2223
										setFormData({ ...formData, telefono: value });
									}}
								/>
							</div>

							<div className="Form-group">
								<label>Telefono 2</label>

								<NumberFormat
									className="form-control"
									value={telefono2}
									format="(###) ###-####"
									onValueChange={values => {
										const { formattedValue, value } = values;
										// formattedValue = $2,223
										// value ie, 2223
										setFormData({ ...formData, telefono2: value });
									}}
								/>
							</div>

							<div className="Form-group">
								<label>Telefono 3</label>
								<NumberFormat
									className="form-control"
									value={telefono3}
									format="(###) ###-####"
									onValueChange={values => {
										const { formattedValue, value } = values;
										// formattedValue = $2,223
										// value ie, 2223
										setFormData({ ...formData, telefono3: value });
									}}
								/>
							</div>

							<div className="Form-group">
								<label>Dirreccion</label>
								<input
									onChange={handleChange}
									value={dirreccion}
									name="dirreccion"
									type="text"
									className="form-control"
								/>
							</div>
							<div className="Form-group">
								<label>Referencia</label>
								<input
									onChange={handleChange}
									value={DirReferencia}
									name="DirReferencia"
									type="text"
									className="form-control"
								/>
							</div>
							<div className="Form-group">
								<label>Ciudad</label>
								<select className="form-control" name="ciudad" value={ciudad} onChange={handleChange}>
									{cities.map(city => (
										<option key={city._id} value={city.name}>
											{city.name}
										</option>
									))}
								</select>
							</div>
							<div className="mt-3">
								<button className="btn btn-block btn-outline-info"> Crear Nuevo Cliente</button>
							</div>
						</form>
						{fireRedirect && <Redirect to="/clients" />}
					</div>
				</div>
			):(<Loading/>)}
		</div>
	);
};

NewClient.prototype = {
	registerClient: PropTypes.func.isRequired,
	cities: PropTypes.array.isRequired,
	cityLoading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
	cities: state.city.cities,
	cityLoading: state.city.loading
});
export default connect(mapStateToProps, { registerClient })(NewClient);
