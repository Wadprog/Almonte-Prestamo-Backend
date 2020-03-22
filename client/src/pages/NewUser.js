import React, { useState } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import { addUser } from '../redux/actions/user';

const NewUser = ({ addUser, users, userLoading, authLoading }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		nombreUsuarios: '',
		password: '',
		password2: '',
		fireRedirect: false
	});

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		console.log(formData);
		addUser(formData);
		setFormData({ ...formData, fireRedirect: true });
	};
	const { fireRedirect, name, nombreUsuarios, password, password2 } = formData;

	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			{!userLoading && !authLoading ? (
				<Fragment>
					<form onSubmit={handleSubmit}>
						<div className="Form-group">
							<label className="text-white h6">Nombre del usuario</label>
							<input
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
								name="password2"
								type="password"
								value={password2}
								onChange={handleChange}
								className="form-control"
							/>
						</div>

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
	authLoading: PropTypes.bool.isRequired,
	addUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	userLoading: state.user.lodaing,
	users: state.user.users,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, { addUser })(NewUser);
