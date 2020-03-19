import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ModifyProfile from '../component/Modals/ModifyProfile';

const Clients = ({ loans }) => {
	const [ pageState, setPageState ] = useState({
		modifyProfile: false,
		newPayment: false,
		newLoan: false,
		id: ''
	});
	const { id, modifyProfile, newPayment, newLoan } = pageState;

	const openModal = e => {
		console.log(id);
		setPageState({ ...pageState, [e.target.name]: true, id: e.target.id });
	};
	const closeModals = () => {
		setPageState({ modifyProfile: false, newPayment: false, newLoan: false, newClient: false });
	};

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-6 " />
				<div className="col-md-6 col-sm-12 ">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<button
								className="btn btn-outline-secondary dropdown-toggle"
								type="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Filtrar
							</button>
							<div className="dropdown-menu">
								<a className="dropdown-item" href="#">
									Todos
								</a>
								<a className="dropdown-item" href="#">
									Pagados action
								</a>
								<a className="dropdown-item" href="#">
									No Pagados
								</a>

								<a className="dropdown-item" href="#">
									Retrados
								</a>
							</div>
						</div>
						<input type="text" className="form-control" aria-label="Text input with dropdown button" />
					</div>
				</div>
			</div>
			<div classNamee="card p-2">
				<div className="card-header">
					<h5 className=" text-white">Lista de los prestamos</h5>
				</div>
				<div className="card-body">
					<div className="list-group">
						{loans.map(loan => (
							<li key={loan._id} className=" my-item list-group-item mb-2 p-0">
								<div className=" bg-light  rounded p-4">
									<div className="mb-2">
										<span className={`text-${loan.status ? 'success' : 'danger'}`}>
											{loan.status ? 'Pagado' : 'No Pagado'}
										</span>
									</div>
									<div className=" mb-1 d-flex justify-content-between  ">
										<h5 className="">{`${loan.client.name} ${loan.client.apellido}`}</h5>

										<h5 className={`text-bold text-${loan.status ? 'success' : 'danger'}`}>
											<NumberFormat
												value={loan.amount}
												displayType={'text'}
												thousandSeparator={true}
												prefix={'RD$'}
											/>
										</h5>
									</div>

									<div className="mb-1">
										<span className="text-muted mr-4 ">
											{loan.client.cedula.split().length == 11 ? (
												<NumberFormat
													value={loan.client.cedula}
													displayType={'text'}
													format="###-#######-#"
												/>
											) : (
												loan.client.cedula
											)}
										</span>

										<span className="text-muted">
											<NumberFormat
												value={loan.client.telefono}
												displayType={'text'}
												format="(###) ###-####"
											/>
										</span>
									</div>
									<div className="mb-1">
										<span className="text-muted">{loan.client.dirreccion}</span>
									</div>
									<div>
										<span className="text-muted mr-3">Ciudad :</span>
										<span className="text-muted">
											{loan.client.ciudad.charAt(0).toUpperCase() + loan.client.ciudad.slice(1)}
										</span>
									</div>
									<div className="mb-3">
										<span className="text-muted mr-3 ">
											{`Fecha ${loan.status ? 'ultimo :' : 'proximo'} pago `}
										</span>

										<span className="text-muted">{loan.nextpaymentDate}</span>
									</div>

									<div className="d-flex justify-content-between
          ">
										<a href={`/loan.client/${loan.client._id}`} className="btn btn-outline-info">
											Detalle
										</a>
										<a className="btn btn-outline-warning">Modificar</a>
										<a className="btn btn-outline-info">Nuevo Prestamo</a>
									</div>
								</div>
							</li>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
Clients.propTypes = {
	loans: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
	loans: state.loan.loans
});
export default connect(mapStateToProps, {})(Clients);
