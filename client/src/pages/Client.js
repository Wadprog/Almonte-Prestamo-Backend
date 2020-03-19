import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { loadLoans, addLoan } from '../redux/actions/loans';

import { connect } from 'react-redux';
import Accordion from '../component/Accordion';
import Loading from '../component/layout/Loading';

import ExpandableRow from '../component/layout/ExpandableRow';
import './Client.css';
const Client2 = ({ addLoan, profiles, loans, loanLoading, profileLoading, authLoading, match: { params: { id } } }) => {
	const [ client ] = profiles.filter(profile => profile._id === id);
	const clientLoans = loans.filter(loan => loan.client === id);
	const paidLoans = clientLoans.filter(loan => loan.paidStatus);
	const [ unpaidLoan ] = clientLoans.filter(loan => !loan.paidStatus);

	const [ fields, setFields ] = useState({
		fName: false,
		fLName: false,
		fDirreccion: false,
		fTelefono: false,
		fTelefonadd: false,
		fTelefono2: false,
		fTelefon2add: false,
		fCity: false
	});
	const [ page, setPage ] = useState({
		modifyProfile: false
	});
	const [ formData, setFormData ] = useState({
		name: ''
	});
	const { name } = formData;
	const { fName, fLName, fDirreccion, fTelefono, fTelefonadd, fTelefono2, fTelefon2add, fCity } = fields;
	const { modifyProfile } = page;

	const handleDataChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleChange = e => {
		console.log(e.target.name);
		setFields(
			{ ...fields, [e.target.name]: e.target.checked },
			setPage({ ...page, modifyProfile: fName || fLName || fDirreccion || fTelefono || fTelefono2, fCity })
		);
	};

	const { Fragment } = React;

	const closeModals = () => {};

	return (
		<Fragment>
			{loanLoading || profileLoading || authLoading ? (
				<Loading />
			) : (
				<Fragment>
					<div className="container pt-5">
						<div className=" pb-5 border-bottom ">
							{client !== undefined &&
							client && (
								<div className=" mt-5 ">
									<div className="my-info  mb-4 p-0 rounded-0">
										<div className="  ">
											<a
												href={`/newLoan/${client._id}`}
												className=" text-white btn btn-outline-secondary btn-block "
											>
												Crear nuevo Prestamo
											</a>
										</div>
									</div>
									<ul className="list-group my-info-list">
										<li name="fName" className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Nombre</h6>
												<div className="d-flex justify-content-between">
													<span className={`text-${fName ? 'white' : 'muted'}`}>
														{!fName ? (
															<span>
																{client.name.charAt(0).toUpperCase() +
																	client.name.slice(1)}
															</span>
														) : (
															<span>
																<input
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
													<span className={`text-${fLName ? 'white' : 'muted'}`}>
														{!fLName ? (
															<span>
																{client.apellido.charAt(0).toUpperCase() +
																	client.apellido.slice(1)}
															</span>
														) : (
															<span>
																<input
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

										<li name="fTelefono" className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Telefono </h6>
												<div className="d-flex justify-content-between">
													<span className={`text-${fTelefono ? 'white' : 'muted'}`}>
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
										</li>

										{(client.telefono2 || fTelefonadd) && (
											<li
												name="fTelefono2"
												className="my-info list-group-item mb-2 p-0 rounded-0"
											>
												<div className=" py-2 pl-2">
													<h6 className="text-bold">Telefono 2</h6>
													<div className="d-flex justify-content-between">
														<span className={`text-${fTelefono2 ? 'white' : 'muted'}`}>
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
																		className="border-0 pl-2 form-control text-success text-bold"
																		placeholder={client.telefono2}
																	/>
																</span>
															)}
														</span>

														<div className="pr-3 modifier d-flex">
															<div className="mr-3">
																<button
																	name="fTelefon2trash"
																	onClick={console.log('hey')}
																	className=" border-0  "
																	type="checkbox"
																	checked={fTelefon2add}
																>
																	<i className="fa fa-trash" />
																</button>
															</div>
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

										{client.telefono3 && (
											<li
												name="fTelefono3"
												className="my-info list-group-item mb-2 p-0 rounded-0"
											>
												<div className=" py-2 pl-2">
													<h6 className="text-bold">Telefono 2</h6>
													<div className="d-flex justify-content-between">
														<span className={`text-${fTelefono2 ? 'white' : 'muted'}`}>
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
																		className="border-0 pl-2 form-control text-success text-bold"
																		placeholder={client.telefono2}
																	/>
																</span>
															)}
														</span>

														<div className="pr-3 modifier d-flex">
															<div className="mr-3">
																<button
																	name="fTelefon2trash"
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
										)}

										<li name="fDirreccion" className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Dirreccion</h6>
												<div className="d-flex justify-content-between">
													<span className={`text-${fDirreccion ? 'white' : 'muted'}`}>
														{!fDirreccion ? (
															<span>
																{client.dirreccion.charAt(0).toUpperCase() +
																	client.dirreccion.slice(1)}
															</span>
														) : (
															<span>
																<input
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

										<li name="fCity" className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Ciudad</h6>
												<div className="d-flex justify-content-between">
													<span className={`text-${fCity ? 'white' : 'muted'}`}>
														{!fCity ? (
															<span>
																{client.ciudad.charAt(0).toUpperCase() +
																	client.ciudad.slice(1)}
															</span>
														) : (
															<span>
																<select value={'city'} onChange={handleChange}>
																	<option value="grapefruit">Grapefruit</option>
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

										<li className="my-info list-group-item mb-2 p-0 rounded-0">
											<div className=" py-2 pl-2">
												<h6 className="text-bold">Ciudad</h6>
												<span className="text-muted">
													{client.ciudad.charAt(0).toUpperCase() + client.ciudad.slice(1)}
												</span>
											</div>
										</li>
										<div className="row">
											<div className="col-md-6" />
											<div
												className={` col-md-6 justify-content-end pr-5 ${!modifyProfile
													? 'd-none'
													: 'd-flex'}`}
											>
												<button className="btn btn-primary">Guardar</button>
											</div>
										</div>
									</ul>
									<div className="my-info  mt-4 mb-2 p-0 rounded-0">
										<div className="  ">
											<a
												href={`/newLoan/${client._id}`}
												className=" text-white btn btn-outline-secondary btn-block "
											>
												Ver los Prestamo de este cliente
											</a>
										</div>
									</div>
									Aqui aparecera los prestamo si hay
								</div>
							)}
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};
Client2.prototype = {
	profiles: PropTypes.array.isRequired,
	loans: PropTypes.array.isRequired,
	loanLoading: PropTypes.bool.isRequired,
	profileLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired,
	cityLoading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
	profiles: state.profile.profiles,
	loans: state.loan.loans,
	loanLoading: state.loan.loading,
	profileLoading: state.profile.isLoading,
	authLoading: state.auth.loading,
	cityLoading: state.city.loading
});
export default connect(mapStateToProps, { loadLoans, addLoan })(Client2);
