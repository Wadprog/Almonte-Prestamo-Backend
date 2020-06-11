import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { filterLoans } from "../redux/actions/loans";
import LoanDescription from "../component/LoanDescription";
import { loadLoans } from "../redux/actions/loans";

const Loans = ({
  loadLoans,
  loans,
  loanLoading,
  filteredLoans,
  filterLoans,
}) => {
  useEffect(() => {
    loadLoans();
  }, []);

  const handleFilter = e => {
    filterLoans(e.target.value, loans);
  };
  return (
    <Fragment>
      <Fragment className='container mt-5'>
        <Fragment>
          {loanLoading ? (
            <Loading />
          ) : (
            <Fragment>
              <div className='row'>
                <div className='col-md-6 ' />
                <div className='col-md-6 col-sm-12 '>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <i className='fa fa-filter' />
                        <i className='fa fa-user mx-2 text-muted' />
                      </span>
                    </div>
                    <input
                      onChange={handleFilter}
                      type='text'
                      className='form-control'
                    />
                  </div>
                </div>
              </div>
              <div classNamee='card p-2'>
                <div className='card-header'>
                  <h5 className=' text-white'>Lista de los prestamos</h5>
                </div>
                <div className=' row'>
                  {filteredLoans.map(loan => (
                    <div
                      key={loan._id}
                      className={` col-12 col-sm-6 col-md-4 mb-4
                      `}
                    >
                      <LoanDescription loan={loan} noPaymentBtn={loan.status} />
                    </div>
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
});
export default connect(mapStateToProps, { filterLoans, loadLoans })(Loans);
