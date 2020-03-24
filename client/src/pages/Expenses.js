import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';

const Expense = ({ expenses, expenseLoading }) => {
	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			<div className="my-info  mb-2 p-0 rounded-0">
				<div className="  ">
					<a href="/newexpense" className=" text-white btn btn-outline-secondary btn-block ">
						Agregar nuevo gasto
					</a>
				</div>
			</div>
			{!expenseLoading ? (
				<ul className="list-group">
					<li className="list-group-item disabled">Gatos</li>
					{expenses &&
						expenses !== null &&
						expenses.length > 0 &&
						expenses.map(expense => (
							<li className="list-group-item">
								<div>
									<span className="mr-2"> Description :</span>
									<span>{expense.description}</span>
								</div>

								<div>
									<span className="mr-2"> Cantidad :</span>
									<span>
										<NumberFormat
											value={expense.amount}
											displayType={'text'}
											thousandSeparator={true}
											prefix={'RD$'}
										/>
									</span>
								</div>
							</li>
						))}
				</ul>
			) : (
				<Loading />
			)}
		</div>
	);
};

Expense.prototype = {
	expenseLoading: PropTypes.bool.isRequired,
	expenses: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
	expenseLoading: state.expense.loading,
	expenses: state.expense.expenses
});
export default connect(mapStateToProps, {})(Expense);
