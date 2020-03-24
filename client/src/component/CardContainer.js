import React from 'react';
import { connect } from 'react-redux';

const CardsContainer = ({payments,loans, profiles, cities, loanLoading, profileLoading, paymentLoading, cityLoading }) => {

	const cards = [
		{ icon: 'fa-road', title: 'Ciuades', amount: cities.length },
		{ icon: 'fa-money', title: 'Prestamos', amount: loans.length },
		{ icon: 'fa-pied-piper-pp', title: 'Pagos', amount: payments.length },
		{ icon: 'fa-users', title: 'Clientes', amount: profiles.length }
	];
	return (
		<div className="container">
			<div className="row justify-content-center">
        {
        !loanLoading && !cityLoading && !profileLoading && !paymentLoading ? (
					cards.map(card => (
						<div className="col-xs-12 col-sm-6 col-md-3 ">
							<div className=" text-center  text-muted">
								<div className="card-body">
									<div className="mb-2">
										<i className={`fa ${card.icon} fa-2x`} />
									</div>
									<p className="card-text text-white">{card.amount}</p>
								</div>
								<div className="card-footer text-center p-2">
									<span className="h6 card-title  text-white">{card.title}</span>
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
