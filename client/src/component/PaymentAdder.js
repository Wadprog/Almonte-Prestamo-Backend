import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { loadPlan } from "../redux/actions/plan";
import { setAlert } from "../redux/actions/alert";
const PaymentAdder = ({ plans, planLoading, addLoan }) => {
  useEffect(() => {
    loadPlan();
  }, []);
  const [formData, setFormData] = useState({
    amount: "",
    plan: {},
    date: "",
  });

  const { amount, plan, date } = formData;
  const send = () => {};
  const maySend = () => {
    if (amount > 0 && plan.name !== {}) {
      if (date == "")
        setFormData(
          { ...formData, date: new Date().toString() },
          addLoan(formData)
        );
      else addLoan(formData);
    } else {
      console.log("falta");
      setAlert("Aggredar ", "danger");
    }
  };
  return (
    <div className="border">
      {planLoading ? (
        <div className="d-flex justify-content-center p-3">
          <div className="spinner-border" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : (
        <form className="form w-100 pt-2 px-2">
          <div className="d-flex w-100">
            <div className="form-group w-100">
              <div>
                <label className="h6 text-white" htmlFor="">
                  Cantidad
                </label>
              </div>

              <NumberFormat
                className="form-control-sm"
                value={amount}
                thousandSeparator={true}
                prefix={"$"}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  // formattedValue = $2,223
                  // value ie, 2223
                  setFormData({ ...formData, amount: value });
                }}
              />
            </div>

            <div className="form-group w-100">
              <div>
                {" "}
                <label className="h6 text-white" htmlFor="">
                  Plan
                </label>
              </div>

              <select
                value={formData.name}
                onChange={(e) => {
                  const [p] = plans.filter((pa) => pa._id === e.target.value);
                  setFormData({ ...formData, plan: p });
                }}
                className="form-control-sm"
                name=""
                id=""
              >
                <option></option>
                {plans.map((plan) => (
                  <option value={plan._id}>{plan.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group w-100">
              <div>
                <label className="h6 text-white" htmlFor="">
                  Fecha
                </label>
              </div>

              <input
                value={date}
                onChange={(e) => {
                  setFormData({ ...formData, date: e.target.value });
                }}
                type="date"
                className="form-control-sm"
              />
            </div>
            <div className="form-group w-">
              <div>
                <label className="h6 text-white">Agregar</label>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(formData);
                  maySend();
                  setFormData({ amount: "", plan: {}, date: "" });
                }}
                className="btn btn-sm btn-outline-primary btn-sm form-control"
              >
                <i className="text-success fa fa-plus"></i>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  plans: state.plan.plans,
  planLoading: state.plan.loading,
});
export default connect(mapStateToProps, {
  loadPlan,
})(PaymentAdder);
