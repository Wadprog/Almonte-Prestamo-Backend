import React, { useState, useEffect } from "react";
import { setAlert } from "../redux/actions/alert";
import uuid from "uuid";
import { addLoan } from "../redux/actions/loans";
import { Redirect } from "react-router";

import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { loadSelectedProfile } from "../redux/actions/profile";
import { loadPlan } from "../redux/actions/plan";
import PaymentAdder from "../component/PaymentAdder";
import LoanDisPlayer from "../component/LoanDisPlayer";
const Many = ({
  plans,
  planLoading,
  client,
  loanLoading,
  profileLoading,
  addLoan,
  loadSelectedProfile,
  loadPlan,
  setAlert,
  match: {
    params: { id },
  },
}) => {
  useEffect(() => {
    console.log("in here hdfbvjfbjffbj;");
    loadSelectedProfile(id);
    loadPlan();
  }, []);
  const [loans, setLoans] = useState([]);
  const addone = (loan) => {
    loan.id = uuid.v4();
    console.log(loan.id + "given");
    setLoans([...loans, loan], console.log(loans));
  };
  const deleteOne = (id) => {
    const filteredLoans = loans.filter((loan) => {
      if (loan.id != id) return loan;
      else return;
    });
    setLoans(filteredLoans);
  };
  return (
    <div>
      <h1 className="text-white text-center "> Agregar Pretamo </h1>
      <PaymentAdder addLoan={addone} />
      <LoanDisPlayer loans={loans} deleteMe={deleteOne} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  client: state.profile.profile,
  profileLoading: state.profile.isLoading,
  plans: state.plan.plans,
  planLoading: state.plan.loading,
  loanLoading: state.loan.loading,
});

export default connect(mapStateToProps, {
  addLoan,
  loadSelectedProfile,
  setAlert,
  loadPlan,
})(Many);
