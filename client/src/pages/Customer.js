import React, { useState } from 'react';
import { Redirect } from 'react-router';
import NumberFormat from 'react-number-format';
import ClientInfo from '../component/ClientInfo';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import { updateClient } from '../redux/actions/profile';
import LoanDescription from '../component/LoanDescription';

const Customer = ({}) => {
	const { Fragment } = React;
	return (
		<div>
			<div className="">
				<div className=" row  ">
					<div className="col col-md-4 ">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-center my-4">
									<div>
										<i className="fa fa-user fa-5x text-muted" />
									</div>
								</h5>
								<ClientInfo title={'Nombre'} data={'Wadson'} />
								<ClientInfo title={'Nombre'} data={'Wadson'} />
								<a href="#" className="btn btn-sm  btn-primary">
									Modificar
								</a>
							</div>
						</div>
					</div>
					<div className="col col-md-8 ">
						<div className="information h-100">
							<div className="card h-100 d-flex 
       align-content-center align-items-center">
								<h5 className="card-title pt-2 text-left"> Prestamos</h5>

								<div className="card-body h-100 d-flex 
        align-items-center justify-content-center">
									<div className=" ">
										<button className=" btn btn-outline-secondary text-center">
											<i className="fa fa-plus fa-5x text-info" />
										</button>
									</div>
								</div>
								<div className="card-footer w-100 d-flex align-items-center">
									<button className=" btn btn-block btn-outline-primary ">Crear nuevo pretamo</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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
export default connect(mapStateToProps, { updateClient })(Customer);
