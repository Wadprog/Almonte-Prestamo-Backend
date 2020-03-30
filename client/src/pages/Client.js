import React, { useState } from 'react';
import { Redirect } from 'react-router';
import NumberFormat from 'react-number-format';

import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import { updateClient } from '../redux/actions/profile';
import LoanDescription from '../component/LoanDescription';

import './Client.css';
const Client = ({
	updateClient,
	cityLoading,
	profiles,
	loans,
	cities,
	loanLoading,
	profileLoading,
	authLoading,
	match: { params: { id } }
}) => {
	const [ fields, setFields ] = useState({
		fName: false,
		fCedula: false,
		fLName: false,
		fDirreccion: false,
		fDirReferencia:false,
		fTelefono: false,
		fTelefonadd: false,
		fTelefono2: false,
		fTelefon2add: false,
		fCity: false,
		modifyProfile: false,
		loanView: false,
		fireRedirect: false
	});

	const [ toggle, setToggle ] = useState({
		loanView: false
	});

	const [ formData, setFormData ] = useState({
		id,
		name: '',
		apellido: '',
		cedula: '',
		telefono: '',
		telefono2: '',
		telefono3: '',
		dirreccion: '',
		ciudad: '',
		DirReferencia: ''
	});
	const { name, apellido, cedula, telefono, telefono2, telefono3, dirreccion, ciudad, DirReferencia } = formData;

	const {
		fName,
		fLName,
		fDirreccion,
		fDirReferencia,
		fTelefono,
		fTelefonadd,
		fTelefono2,
		fTelefono3,
		fTelefon2add,
		fCity,
		modifyProfile,
		fireRedirect
	} = fields;
	const { loanView } = toggle;

	const handleToggle = e => {
		setToggle({ ...toggle, [e.target.name]: e.target.checked });
	};
	const handleDataChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		console.log(formData);
		formData.cedula = client.cedula;
		updateClient(formData);
		setFields({ ...fields, fireRedirect: true });
	};

	const handleChange = e => {
		console.log(loans.filter(loan => loan.client._id === id));
		setFields({ ...fields, [e.target.name]: e.target.checked, modifyProfile: true });
	};

	const [ client ] = profiles.filter(profile => profile._id === id);
	let clientLoans = [];
	if (loans.length > 0) clientLoans = loans.filter(loan => loan.client._id == id);

	const { Fragment } = React;
	return (
		<Fragment>
			{cityLoading || loanLoading || profileLoading || authLoading ? (
				<Loading />
			) : (
				<Fragment>
					<div className="container pt-5">
						<div className=" pb-5 border-bottom ">
							{client &&
							client !== undefined &&
							client !== null && (
								<div className=" mt-5 ">
									<div className="my-info  mb-2 p-0 rounded-0">
										<div className="  ">
											<a
												href="/newclient"
												className="  btn btn-outline-secondary btn-block "
											>
												Crear nuevo cliente
											</a>
										</div>
									</div>
									<div className="my-info  mb-4 p-0 rounded-0">
										<div className="  ">
											<a
												href={`/newloan/${client._id}`}
												className="   btn btn-outline-secondary btn-block "
											>
												Crear nuevo Prestamo
											</a>
										</div>
									</div>
									<form onSubmit={handleSubmit}>
										<ul className="list-group my-info-list">
											<li name="fName" className="my-info list-group-item mb-2 p-0 rounded-0">
												<div className=" py-2 pl-2">
													<h6 className="text-bold">Nombre</h6>
													<div className="d-flex justify-content-between">
														<span>
															{!fName ? (
																<span>
																	{client.name.charAt(0).toUpperCase() +
																		client.name.slice(1)}
																</span>
															) : (
																<span>
																	<input
																		name="name"
																		value={name}
																		onChange={handleDataChange}
																		className="border-0 pl-2 form-control text-success text-bold"
																		placeholder={
																			client.name.charAt(0).toUpperCase() +
																			client.name.slice(1)
																		}
																	/>
																</span>
															)}
														</span>
														<div className="pr-3 modifier">
															<label htmlFor="fName">
																<i className="fa fa-pencil" />
															</label>
															<input
																id="fName"
																name="fName"
																onChange={handleChange}
																className=" d-none "
																type="checkbox"
																checked={fName}
															/>
														</div>
													</div>
												</div>
											</li>

											<li name="fLName" className="my-info list-group-item mb-2 p-0 rounded-0">
												<div className=" py-2 pl-2">
													<h6 className="text-bold">Apellido</h6>
													<div className="d-flex justify-content-between">
														<span>
															{!fLName ? (
																<span>
																	{client.apellido.charAt(0).toUpperCase() +
																		client.apellido.slice(1)}
																</span>
															) : (
																<span>
																	<input
																		name="apellido"
																		value={apellido}
																		onChange={handleDataChange}
																		className="border-0 pl-2 form-control text-success text-bold"
																		placeholder={
																			client.apellido.charAt(0).toUpperCase() +
																			client.apellido.slice(1)
																		}
																	/>
																</span>
															)}
														</span>
														<div className="pr-3 modifier">
															<label htmlFor="fLName">
																<i className="fa fa-pencil" />
															</label>
															<input
																id="fLName"
																name="fLName"
																onChange={handleChange}
																className=" d-none "
																type="checkbox"
																checked={fLName}
															/>
														</div>
													</div>
												</div>
											</li>

											<li name="fCedula" className="my-info list-group-item mb-2 p-0 rounded-0">
												<div className=" py-2 pl-2">
													<h6 className="text-bold">Cedula</h6>
													<div className="d-flex justify-content-between">
														<span>
															<span>
																<NumberFormat
																	value={client.cedula}
																	displayType={'text'}
																	format="###-#######-#"
																/>
															</span>
														</span>
													</div>
												</div>
											</li>

											<div
												name="fTelefono"
												className="my-info list-group-item mb-2 p-0 rounded-0"
											>
												<div className=" py-2 pl-2">
													<h6 className="text-bold">Telefono </h6>
													<div className="d-flex justify-content-between">
														<span>
															{!fTelefono ? (
																<span>
																	<NumberFormat
																		value={client.telefono}
																		displayType={'text'}
																		format="(###) ###-####"
																	/>
																</span>
															) : (
																<span>
																	<input
																		name="telefono"
																		value={telefono}
																		onChange={handleDataChange}
																		className="border-0 pl-2 form-control text-success text-bold"
																		placeholder={client.telefono}
																	/>
																</span>
															)}
														</span>

														<div className="pr-3 modifier d-flex">
															{!client.telefono2 && (
																<div className="mr-3">
																	<label htmlFor="fTelefonadd">
																		<i className="fa fa-plus" />
																	</label>
																	<input
																		id="fTelefonadd"
																		name="fTelefonadd"
																		onChange={handleChange}
																		className=" d-none  "
																		type="checkbox"
																		checked={fTelefonadd}
																	/>
																</div>
															)}

															<label htmlFor="fTelefono">
																<i className="fa fa-pencil" />
															</label>
															<input
																id="fTelefono"
																name="fTelefono"
																onChange={handleChange}
																className=" d-none "
																type="checkbox"
																checked={fTelefono}
															/>
														</div>
													</div>
												</div>
											</div>

											{(client.telefono2 || fTelefonadd) && (
												<li
													name="fTelefono2"
													className="my-info list-group-item mb-2 p-0 rounded-0"
												>
													<div className=" py-2 pl-2">
														<h6 className="text-bold">Telefono 2</h6>
														<div className="d-flex justify-content-between">
															<span>
																{!fTelefono2 ? (
																	<span>
																		<NumberFormat
																			value={client.telefono2}
																			displayType={'text'}
																			format="(###) ###-####"
																		/>
																	</span>
																) : (
																	<span>
																		<input
																			name="telefono2"
																			value={telefono2}
																			onChange={handleDataChange}
																			className="border-0 pl-2 form-control text-success text-bold"
																			placeholder={client.telefono2}
																		/>
																	</span>
																)}
															</span>

															<div className="pr-3 modifier d-flex">
																{!client.telefono3 && (
																	<div className="mr-3">
																		<label htmlFor="fTelefon2add">
																			<i className="fa fa-plus" />
																		</label>
																		<input
																			id="fTelefon2add"
																			name="fTelefon2add"
																			onChange={handleChange}
																			className=" d-none  "
																			type="checkbox"
																			checked={fTelefon2add}
																		/>
																	</div>
																)}

																<div>
																	<label htmlFor="fTelefono2">
																		<i className="fa fa-pencil" />
																	</label>
																	<input
																		id="fTelefono2"
																		name="fTelefono2"
																		onChange={handleChange}
																		className=" d-none "
																		type="checkbox"
																		checked={fTelefono2}
																	/>
																</div>
															</div>
														</div>
													</div>
												</li>
											)}

											{client.telefono3 ||
												(fTelefon2add && (
													<li
														name="fTelefono3"
														className="my-info list-group-item mb-2 p-0 rounded-0"
													>
														<div className=" py-2 pl-2">
															<h6 className="text-bold">Telefono 3</h6>
															<div className="d-flex justify-content-between">
																<span>
																	{!fTelefono3 ? (
																		<span>
																			<NumberFormat
																				value={client.telefono3}
																				displayType={'text'}
																				format="(###) ###-####"
																			/>
																		</span>
																	) : (
																		<span>
																			<input
																				name="telefono3"
																				value={telefono3}
																				onChange={handleDataChange}
																				className="border-0 pl-2 form-control text-success text-bold"
																				placeholder={client.telefono2}
																			/>
																		</span>
																	)}
																</span>

																<div className="pr-3 modifier d-flex">
																	<div className="mr-3">
																		<button
																			name="fTelefon3trash"
																			onClick={console.log('hey')}
																			className=" border-0  "
																			type="checkbox"
																			checked={fTelefon2add}
																		>
																			<i className="fa fa-trash" />
																		</button>
																	</div>

																	<div>
																		<label htmlFor="fTelefono3">
																			<i className="fa fa-pencil" />
																		</label>
																		<input
																			id="fTelefono3"
																			name="fTelefono3"
																			onChange={handleChange}
																			className=" d-none "
																			type="checkbox"
																			checked={fTelefono2}
																		/>
																	</div>
																</div>
															</div>
														</div>
													</li>
												))}

											<li
												name="fDirreccion"
												className="my-info list-group-item mb-2 p-0 rounded-0"
											>
												<div className=" py-2 pl-2">
													<h6 className="text-bold">Dirreccion</h6>
													<div className="d-flex justify-content-between">
														<span>
															{!fDirreccion ? (
																<span>
																	{client.dirreccion.charAt(0).toUpperCase() +
																		client.dirreccion.slice(1)}
																</span>
															) : (
																<span>
																	<textarea
																	rows={7}
																		name="dirreccion"
																		value={dirreccion}
																		onChange={handleDataChange}
																		className="border-0 pl-2 form-control text-success text-bold"
																		placeholder={
																			client.dirreccion.charAt(0).toUpperCase() +
																			client.dirreccion.slice(1)
																		}
																	/>
																</span>
															)}
														</span>
														<div className="pr-3 modifier">
															<label htmlFor="fDirreccion">
																<i className="fa fa-pencil" />
															</label>
															<input
																id="fDirreccion"
																name="fDirreccion"
																onChange={handleChange}
																className=" d-none "
																type="checkbox"
																checked={fDirreccion}
															/>
														</div>
													</div>
												</div>
											</li>



												<li
												name="fDirReferencia"
												className="my-info list-group-item mb-2 p-0 rounded-0"
											>
												<div className=" py-2 pl-2">
													<h6 className="text-bold"> Referencia Dirreccion</h6>
													<div className="d-flex justify-content-between">
														<span>
															{!fDirReferencia ? (
																<span>
																	{client.DirReferencia.charAt(0).toUpperCase() +
																		client.DirReferencia.slice(1)}
																</span>
															) : (
																<span>
																	<textarea
																	rows={7}
																		name="DirReferencia"
																		value={DirReferencia}
																		onChange={handleDataChange}
																		className="border-0 pl-2 form-control text-success text-bold"
																		placeholder={
																			client.DirReferencia.charAt(0).toUpperCase() +
																			client.DirReferencia.slice(1)
																		}
																	/>
																</span>
															)}
														</span>
														<div className="pr-3 modifier">
															<label htmlFor="fDirReferencia">
																<i className="fa fa-pencil" />
															</label>
															<input
																id="fDirReferencia"
																name="fDirReferencia"
																onChange={handleChange}
																className=" d-none "
																type="checkbox"
																checked={fDirReferencia}
															/>
														</div>
													</div>
												</div>
											</li>


											<li name="fCity" className="my-info list-group-item mb-2 p-0 rounded-0">
												<div className=" py-2 pl-2">
													<h6 className="text-bold">Ciudad</h6>
													<div className="d-flex justify-content-between">
														<span>
															{!fCity ? (
																<span>
																	{client.ciudad.charAt(0).toUpperCase() +
																		client.ciudad.slice(1)}
																</span>
															) : (
																<span>
																	<select
																		className="form-control"
																		name="ciudad"
																		value={ciudad}
																		onChange={handleDataChange}
																	>
																		{cities.map(city => (
																			<option key={city._id} value={city.name}>
																				{city.name}
																			</option>
																		))}
																	</select>
																</span>
															)}
														</span>
														<div className="pr-3 modifier">
															<label htmlFor="fCity">
																<i className="fa fa-pencil" />
															</label>
															<input
																id="fCity"
																name="fCity"
																onChange={handleChange}
																className=" d-none "
																type="checkbox"
																checked={fCity}
															/>
														</div>
													</div>
												</div>
											</li>

											<div className="row">
												<div className="col-md-6" />
												<div
													className={` col-md-6 justify-content-end pr-5 ${!modifyProfile
														? 'd-none'
														: 'd-flex'}`}
												>
													<button type="submit" className="btn btn-primary">
														Guardar
													</button>
												</div>
											</div>
										</ul>
									</form>
									<div className="my-info  mt-4 mb-2 p-0 rounded-0">
										<div className="  ">
											<label className="btn btn-outline-secondary btn-block    ">
												{clientLoans.length > 0 && clientLoans !== null ? (
													<Fragment>
														<input
															name="loanView"
															onChange={handleToggle}
															checked={loanView}
															type="checkBox"
															href={`/newLoan/${client._id}`}
															className="d-none"
														/>

														<span>Ver los prestamos de este cliente</span>
													</Fragment>
												) : (
													<h1>Este cliente no tiene historial de prestamo</h1>
												)}
											</label>
										</div>
									</div>
									<div className={`d-${!loanView && 'none'}`}>
										<Fragment>
											{clientLoans &&
											clientLoans !== null &&
											clientLoans.length > 0 && (
												<Fragment>
													{clientLoans.map(loan => (
														<li
															key={loan._id}
															className=" my-item list-group-item mb-2 p-0"
														>
															<LoanDescription
																loan={loan}
																noPaymentBtn={loan.status}
																noClientDetails={true}
															/>
														</li>
													))}
												</Fragment>
											)}
										</Fragment>
									</div>
								</div>
							)}
						</div>
					</div>
					{fireRedirect && <Redirect to={`/client/${id}`} />}
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = state => ({
	profiles: state.profile.profiles,
	loans: state.loan.loans,
	loanLoading: state.loan.loading,
	profileLoading: state.profile.isLoading,
	authLoading: state.auth.loading,
	cityLoading: state.city.loading,
	cities: state.city.cities
});
export default connect(mapStateToProps, { updateClient })(Client);
