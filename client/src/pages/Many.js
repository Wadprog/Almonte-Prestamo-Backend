import React, { useState, useEffect } from "react";
import { setAlert } from "../redux/actions/alert";
import NumberFormat from "react-number-format";
import { addLoan } from "../redux/actions/loans";
import { Redirect } from "react-router";

import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { loadSelectedProfile } from "../redux/actions/profile";
import { loadPlan } from "../redux/actions/plan";
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

  return (
    <div>
      <h1 className="text-white text-center "> Agregar Pretamo </h1>
      <form className="form w-100">
        <div className="d-flex w-100">
          <div className="form-group w-100">
            <div>
              <label className="h6 text-white" htmlFor="">
                Cantidad
              </label>
            </div>

            <input type="text" className="form-control-sm" />
          </div>

          <div className="form-group w-100">
            <div>
              {" "}
              <label className="h6 text-white" htmlFor="">
                Plan
              </label>
            </div>

            <select className="form-control-sm" name="" id=""></select>
          </div>
          <div className="form-group w-100">
            <div>
              <label className="h6 text-white" htmlFor="">
                Fecha
              </label>
            </div>

            <input type="date" className="form-control-sm" />
          </div>
          <div className="form-group w-100">
            <div>
              <label></label>
            </div>
            <button className="btn  btn-outline-primary btn-sm form-control">
              <i className="text-success fa fa-plus"></i>
            </button>
          </div>
        </div>
      </form>
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
