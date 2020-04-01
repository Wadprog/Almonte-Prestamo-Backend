import React from 'react';
import { connect } from 'react-redux';

const CardsContainer = ({payments,loans, profiles, cities, loanLoading, profileLoading, paymentLoading, cityLoading }) => {

	const cards = [
		{ icon: 'fa-road', title: ' Cantidad de ciuades', amount: cities.length },
		{ icon: 'fa-money', title: ' Cantidad de prestamos hecho', amount: loans.length },
		{ icon: 'fa-pied-piper-pp', title: 'Cantidad de Pagos recibidos', amount: payments.length },
		{ icon: 'fa-users', title: ' Cantidad total de clientes', amount: profiles.length }
	];
	return (
		<div>
			<div className="row justify-content-center">
        {
        !loanLoading && !cityLoading && !profileLoading && !paymentLoading ? (
					cards.map(card => (
						<div className="col-xs-12 col-sm-6 col-md-3 ">
							<div className=" card card-chart mb-4 ">
								<div className="card-body d-flex justify-content-between text-white">
									<div className="mb-2">
										<i className={`h4 fa ${card.icon} fa-2x`} />
									</div>
									<h4 className="card-text text-black">{card.amount}</h4>
								</div>
								<div className="card-footer text-white text-left p-2">
									<span className="h6 card-title">{card.title}</span>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="spinner-border text-primary">
						<span className="sr-only">Loading...</span>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	cityLoading: state.city.loading,
	cities: state.city.cities,
	profileLoading: state.profile.isLoading,
	profiles: state.profile.profiles,
	paymentLoading: state.payment.loading,
	payments: state.payment.payments,
	loanLoading: state.loan.loading,
	loans: state.loan.loans
});
export default connect(mapStateToProps, {})(CardsContainer);
