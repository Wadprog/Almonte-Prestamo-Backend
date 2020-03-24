import React from 'react';
import { connect } from 'react-redux';
import CardContainer from '../component/CardContainer';
import cards from '../Temp/cards';
import Loading from '../component/layout/Loading';
import { Months, createDataSet } from '../utils/graphData';

import ChartsPage from '../component/ChartsPage';
const Home = ({ expenseLoading,paymentLoading,loanLoading, loans, payments, expenses }) => {

	const dataLine = {
		labels: Months,
		datasets: createDataSet(loans, payments, expenses)
	};

	return (
		<div className="">
			{!expenseLoading && !paymentLoading && !loanLoading ? (
				<div id="main-content">
					<div className="container-fluid">
						<h4 className="text-white mt-4">inicio</h4>
						<div className="container-fluid">
							<CardContainer cards={cards} />
						</div>
					</div>
					<ChartsPage dataLine={dataLine} />
				</div>
			) : (
				<Loading/>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	loans: state.loan.loans,
	payments: state.payment.payments,
	expenses: state.expense.expenses,
loanLoading: state.loan.loading,
	paymentLoading: state.payment.loading,
	expenseLoading: state.expense.loading,
});

export default connect(mapStateToProps, {})(Home);
