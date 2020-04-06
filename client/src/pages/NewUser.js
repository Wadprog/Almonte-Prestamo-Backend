import React, { useState } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import { register } from '../redux/actions/user';

const NewUser = ({ register, userLoading }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		nombreUsuarios: '',
		password: '',
		password2: '',
		fireRedirect: false,
		passwordSame: true
	});

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
			passwordSame: formData.password == formData.password2
		});
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (password2 == password) {
			register(formData);
			setFormData({ ...formData, fireRedirect: true });
		}
		else
		setFormData({...formData,passwordSame:false})
	};
	const { passwordSame, fireRedirect, name, nombreUsuarios, password, password2 } = formData;

	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			{!userLoading? (
				<Fragment>
					<form onSubmit={handleSubmit}>
						<div className="Form-group">
							<label className="text-white h6">Nombre del usuario *</label>
							<input
								required="true"
								name="name"
								type="text"
								value={name}
								onChange={handleChange}
								className="form-control"
							/>
						</div>

						<div className="Form-group">
							<label className="text-white h6">Usuario</label>
							<input
								required="true"
								name="nombreUsuarios"
								type="text"
								value={nombreUsuarios}
								onChange={handleChange}
								className="form-control"
							/>
						</div>

						<div className="Form-group">
							<label className="text-white h6">Contrasena</label>
							<input
								required="true"
								name="password"
								type="password"
								value={password}
								onChange={handleChange}
								className="form-control"
							/>
						</div>
						<div className="Form-group">
							<label className="text-white h6">Verificar contrasena</label>
							<input
								required="true"
								name="password2"
								type="password"
								value={password2}
								onChange={handleChange}
								className="form-control"
							/>
						</div>
						<span className={` mt-2 text-danger d-${!passwordSame && 'none'}`}>
							{' '}
							Verifique con las contrasena sean igual
						</span>

						<div className="mt-3">
							<button className="btn btn-block btn-outline-info" type="sumbit">
								Crear nuevo usuario
							</button>
						</div>
					</form>
					{fireRedirect && <Redirect to={`/users/`} />}
				</Fragment>
			) : (
				<Loading />
			)}
		</div>
	);
};

NewUser.prototype = {
	userLoading: PropTypes.bool.isRequired,
	register: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	userLoading: state.user.lodaing,
});
export default connect(mapStateToProps, { register })(NewUser);
