import React, { useState } from 'react';

import { connect } from 'react-redux'
import {registerClient} from '../redux/actions/profile'

const NewClient = ({registerClient}) => {
	const [ formData, setFormData ] = useState({ name: '', cedula: '', address: '', addressRef: '', tel: '' });
	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
 };
const handleSubmit=e=>{
	e.preventDefault()
	console.log(formData)
	registerClient(formData);
}
	const { name, cedula, address, addressRef, tel } = formData;
	return (
		
			<div className="container mt-5 pt-5">
				<div className="card">
					<div className="card-header">Crear nuevo cliente</div>
					<div className="card-body">
						<form
						onSubmit={handleSubmit}
						>
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
								<label>Dirreccion</label>
								<input
									onChange={handleChange}
									value={address}
									name="address"
									type="text"
									className="form-control"
								/>
							</div>
							<div className="Form-group">
								<label>Dirreccion</label>
								<input
									onChange={handleChange}
									value={addressRef}
									name="addressRef"
									type="text"
									className="form-control"
								/>
							</div>
							<div className="Form-group">
								<label>tel</label>
								<input
									onChange={handleChange}
									value={tel}
									name="tel"
									type="text"
									className="form-control"
								/>
							</div>
							<div className="mt-3">
								<button 
								className="btn btn-block btn-outline-info"> Crear Nuevo Cliente</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		
	);
};


export default connect(null,{registerClient})(NewClient);
