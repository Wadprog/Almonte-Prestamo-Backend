import React, { useEffect } from "react";
import { connect } from "react-redux";
import CardContainer from "../component/CardContainer";
import MainGraph from "../component/MainGraph";
import PerDayData from "../component/TransactionPerday";
import CitiesSummary from "../component/CitiesSummary";
import Loading from "../component/layout/Loading";

import { loadExpenses } from "../redux/actions/expenses";
import { loadPayment } from "../redux/actions/payment";
import { loadLoans } from "../redux/actions/loans";
import { loadProfiles } from "../redux/actions/profile";
import { loadCities } from "../redux/actions/city";

const Home = ({
  loadCities,
  loadProfiles,
  loadExpenses,
  loadPayment,
  loadLoans,
  expenseLoading,
  paymentLoading,
  loanLoading,
  cityLoading,
  cities,
  loans,
  payments,
  expenses,
}) => {
  useEffect(() => {
    loadExpenses();
    loadPayment();
    loadLoans();
    loadProfiles();
    loadCities();
  }, []);

  return (
    <div>
      {!cityLoading && !expenseLoading && !paymentLoading && !loanLoading ? (
        <div>
          Almonte 
          <div className='mt-5'>
            <CardContainer />
          </div>
          {/* Below goes the main graph and citiessummary */}
          <div
            className='row no-gutters border border-0  '
            style={{ backgroundColor: " #27293d " }}
          >
            <div className='col-sm-8'>
              <MainGraph
                loans={loans}
                payments={payments}
                expenses={expenses}
              />
            </div>
            <div className='col-md-4 h-100'>
              <div className='card card-chart'>
                <div className=' pl-4 py-4 text-white'>
                  <CitiesSummary
                    loans={loans}
                    payments={payments}
                    expenses={expenses}
                    cities={cities}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Below goes the calendar  */}
          <div className='row'>
            <div className='col-sm-12'>
              <PerDayData
                loans={loans}
                payments={payments}
                expenses={expenses}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  loans: state.loan.loans,
  payments: state.payment.payments,
  expenses: state.expense.expenses,
  cities: state.city.cities,
  cityLoading: state.city.loading,
  loanLoading: state.loan.loading,
  paymentLoading: state.payment.loading,
  expenseLoading: state.expense.loading,
});

export default connect(mapStateToProps, {
  loadCities,
  loadProfiles,
  loadExpenses,
  loadLoans,
  loadPayment,
})(Home);
