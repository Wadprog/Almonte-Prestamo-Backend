import React, { useState } from 'react';

import { Redirect } from 'react-router'

import { connect } from 'react-redux';
import { registerClient } from '../redux/actions/profile';

const NewClient = ({ registerClient }) => {
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
		fireRedirect:false
	});

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		console.log(formData);
		registerClient(formData);
		setFormData({ ...formData, fireRedirect :true })
	};
	const { fireRedirect,name, apellido, cedula, telefono, telefono2, telefono3, dirreccion, ciudad, DirReferencia } = formData;

	return (
		<div className="container mt-5 pt-5">
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
							<input
								onChange={handleChange}
								value={telefono}
								name="telefono"
								type="text"
								className="form-control"
							/>
						</div>

						<div className="Form-group">
							<label>Telefono 2</label>
							<input
								onChange={handleChange}
								value={telefono2}
								name="telefono2"
								type="text"
								className="form-control"
							/>
						</div>

						<div className="Form-group">
							<label>Telefono 3</label>
							<input
								onChange={handleChange}
								value={telefono3}
								name="telefono3"
								type="text"
								className="form-control"
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
							<input
								onChange={handleChange}
								value={ciudad}
								name="ciudad"
								type="text"
								className="form-control"
							/>
						</div>
						<div className="mt-3">
							<button className="btn btn-block btn-outline-info"> Crear Nuevo Cliente</button>
						</div>
					</form>
					{fireRedirect && <Redirect to='/clients' />}
				</div>
			</div>
		</div>
	);
};

export default connect(null, { registerClient })(NewClient);
