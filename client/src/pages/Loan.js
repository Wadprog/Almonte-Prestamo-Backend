import React from 'react';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';
import { filterLoans } from '../redux/actions/loans';
import LoanDescription from '../component/LoanDescription';

const Loans = ({ loans, loanLoading, filteredLoans, filterLoans }) => {
	const { Fragment } = React;

	const handleFilter = e => {
		console.log(e.target.value);
		filterLoans(e.target.value, loans);
	};
	return (
		<Fragment>
			<Fragment className="container mt-5">
				<Fragment>
					{loanLoading ? (
						<Loading />
					) : (
						<Fragment>
							<div className="row">
								<div className="col-md-6 " />
								<div className="col-md-6 col-sm-12 ">
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fa fa-filter" />
												<i className="fa fa-user mx-2 text-muted" />
											</span>
										</div>
										<input onChange={handleFilter} type="text" className="form-control" />
									</div>
								</div>
							</div>
							<div classNamee="card p-2">
								<div className="card-header">
									<h5 className=" text-white">Lista de los prestamos</h5>
								</div>
								<div className="card-body">
									<div className="list-group" />
									{filteredLoans.map(loan => (
										<li key={loan._id} className=" my-item list-group-item mb-2 p-0">
											<LoanDescription loan={loan}  noPaymentBtn={loan.status} />
										</li>
									))}
								</div>
							</div>
						</Fragment>
					)}
				</Fragment>
			</Fragment>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	loans: state.loan.loans,
	filteredLoans: state.loan.filteredLoans,
	loanLoading: state.loan.loading,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, { filterLoans })(Loans);
