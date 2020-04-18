import React, { useState, Fragment } from 'react';
import NumberFormat from 'react-number-format';
import { filterProfiles } from '../redux/actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../component/layout/Loading';

const Clients = ({ profiles, profilesFiltered, filterProfiles, porfileLoading, authLoading }) => {
	const [ pageState, setPageState ] = useState({
		modifyProfile: false,
		newPayment: false,
		newLoan: false,
		id: ''
	});

	const { id, pofileLoading, newLoan } = pageState;

	const openModal = e => {
		console.log(id);
		setPageState({ ...pageState, [e.target.name]: true, id: e.target.id });
	};
	const closeModals = () => {
		setPageState({ modifyProfile: false, newPayment: false, newLoan: false, newClient: false });
	};

	const handleFilter = e => {
		filterProfiles(e.target.value, profiles);
	};
	return (
		<div className="container mt-5">
			{!authLoading && !porfileLoading ? (
				<Fragment>
					<div className="row">
						<div className="col-md-6 " />
						<div className="col-md-6 col-sm-12 ">
							<div className="input-group mb-3">
								<input onChange={handleFilter} type="text" className="form-control" />
								<div class="input-group-append">
									<span class="input-group-text">
										<i className="fa fa-user" />
									</span>
								</div>
							</div>
						</div>
					</div>
					<div classNamee="card p-2">
						<div className="card-header">
							<div className="d-flex justify-content-between text-white">
								<h5>Lista de los clientes</h5>
								<div>
									<a href="/newclient" className="btn btn-info">
										Crear nuevo Cliente
									</a>
								</div>
							</div>
						</div>
						<div className="card-body">
							<div className="list-group">
								{profiles && profiles !== null && profiles.length > 0 ? (
									profilesFiltered.map(client => (
										<li key={client._id} className="my-item list-group-item mb-2 p-0">
											<div className=" bg-light  rounded p-4">
												<div className="d-flex justify-content-between text-bold ">
													<h5 className="">{`${client.name} ${client.apellido}`}</h5>

													<h5
														className={`text-bold text-${client.punto > 700
															? 'success'
															: 'warning'}`}
													>{` `}</h5>
												</div>

												<div className="mb-1">
													<span className="text-muted mr-4">Cedula</span>

													<span className="text-muted mr-4 ">
														{client.cedula.split().length == 11 ? (
															<NumberFormat
																value={client.cedula}
																displayType={'text'}
																format="###-#######-#"
															/>
														) : (
															client.cedula
														)}
													</span>
												</div>
												<div className="mb-1">
													<span className=" text-muted mr-4"> Telefono</span>

													<span className="text-muted mr-4  ">
														<NumberFormat
															value={client.telefono}
															displayType={'text'}
															format="(###) ###-####"
														/>
													</span>
												</div>

												{client.telefono2 && (
													<div className="mb-1">
														<span className="text-muted mr-4">Telefono 2:</span>

														<span className="text-muted ">
															<NumberFormat
																value={client.telefono2}
																displayType={'text'}
																format="(###) ###-####"
															/>
														</span>
													</div>
												)}
												{client.telefono3 && (
													<div className="mb-1">
														<span className="text-muted mr-4">Telefono 3</span>

														<span className="text-muted ">
															<NumberFormat
																value={client.telefono3}
																displayType={'text'}
																format="(###) ###-####"
															/>
														</span>
													</div>
												)}
												<div className="mb-1">
													<span className="text-muted ">{`${client.dirreccion} `}</span>
												</div>

												<div className="mb-3">
													<span className="text-muted ">{`${client.ciudad
														.charAt(0)
														.toUpperCase() + client.ciudad.slice(1)} `}</span>
												</div>
												<div className="row">
													<div className="col-sm-12 col-md-6 mb-2">
														<a
															href={`/client/${client._id}`}
															className="btn btn-outline-info btn-block"
														>
															Detalle
														</a>
													</div>

													<div className="col-sm-12 col-md-6">
														<a
															href={`newloan/${client._id}`}
															className="btn btn-outline-info btn-block "
														>
															Nuevo Prestamo
														</a>
													</div>
												</div>
											</div>
										</li>
									))
								) : (
									<h1 className="text-white"> No Existe clientes</h1>
								)}
							</div>
						</div>
					</div>
				</Fragment>
			) : (
				<Loading />
			)}
		</div>
	);
};
Clients.propTypes = {
	profiles: PropTypes.array.isRequired,
	porfileLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
	authLoading: state.auth.loading,
	porfileLoading: state.profile.isLoading,
	profilesFiltered: state.profile.filteredProfiles,
	profiles: state.profile.profiles
});
export default connect(mapStateToProps, { filterProfiles })(Clients);
