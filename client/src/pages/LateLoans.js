import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';

const LateLoan = ({ loans: { count, cities, response }, loanLoanding }) => {
	return (
		<div className="container mt-5">
			{!loanLoanding ? (
				<div>
					{response && response !== null && response.length > 0 ? (
						<div>
							{response.map(resp => (
								<div>
									{resp.city.map(loan => (
										<div>
											{
												<li key={loan._id} className=" my-item list-group-item mb-2 p-0">
													<div className=" bg-light  rounded p-4">
														<div className="mb-2">
															<span
																className={`text-${loan.status ? 'success' : 'danger'}`}
															>
																{loan.status ? 'Pagado' : 'No Pagado'}
															</span>
														</div>
														<div className=" mb-1 d-flex justify-content-between  ">
															<h5 className="">{`${loan.client.name} ${loan.client
																.apellido}`}</h5>

															<h5
																className={`text-bold text-${loan.status
																	? 'success'
																	: 'danger'}`}
															>
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
																{loan.client.ciudad.charAt(0).toUpperCase() +
																	loan.client.ciudad.slice(1)}
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
															<a
																href={`/loan/${loan._id}`}
																className="btn btn-outline-info"
															>
																Detalle
															</a>

															<a
																href={`/newloan/${loan.client._id}`}
																className="btn btn-outline-info"
															>
																Nuevo Prestamo
															</a>
														</div>
													</div>
												</li>
											}
										</div>
									))}
								</div>
							))}
						</div>
					) : (
						<h1>No hay deudas a cobrar</h1>
					)}
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};
LateLoan.propTypes = {
	loans: PropTypes.object.isRequired,
	loanLoanding: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
	loans: state.routina.loans,
	loanLoanding: state.routina.loading
});
export default connect(mapStateToProps, {})(LateLoan);
