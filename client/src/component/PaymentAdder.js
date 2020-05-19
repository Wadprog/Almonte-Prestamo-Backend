import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import Loading from "../component/layout/MiniLoading";
import { loadPlan } from "../redux/actions/plan";
import { setAlert } from "../redux/actions/alert";
const moment = require("moment");
const PaymentAdder = ({ plans, planLoading, addLoan, setAlert }) => {
  useEffect(() => {
    loadPlan();
  }, []);
  const [formData, setFormData] = useState({
    amount: "",
    plan: "",
    date: "",
  });
  const emptyPlan = {
    id: "",
    name: "",
    steps: "",
    interval: "",
  };
  const { amount, plan, date } = formData;
  const send = () => {};
  const maySend = () => {
    if (amount > 0 && formData.plan != "") {
      if (date == "") formData.date = moment().format("l");
      addLoan(formData);
    } else {
      if (amount === "")
        setAlert("Favor agregar el monto del prestamo ", "danger");
      if (plan === "")
        setAlert("Favor seleccionar un plan por este prestamo ", "danger");
    }
  };
  return (
    <div className="border py-0">
      {planLoading ? (
        <Loading />
      ) : (
        <div className="pl-2 pt-2 px-md-5 text-white container-md ">
          <h6 className="mb-4">Agregar Prestamo</h6>
          <div className="row no-gutters px-md-5 ">
            <div className="col-sm-4 ">
              <div className="form-group ">
                <div>
                  <label className="h6 text-white" htmlFor="">
                    Cantidad
                  </label>
                </div>

                <NumberFormat
                  className="form-control-sm p-0"
                  value={amount}
                  thousandSeparator={true}
                  prefix={"$"}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    //formattedValue = $2,223
                    //value ie, 2223
                    setFormData({ ...formData, amount: value });
                  }}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-group ">
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
            </div>
            <div className="col-sm-4">
              <div className="form-group ">
                <div>
                  <label className="h6 text-white" htmlFor="">
                    Fecha
                  </label>
                </div>

                <input
                  value={date}
                  onChange={(e) => {
                    let formattedDate = moment(e.target.value).format("l");
                    setFormData({ ...formData, date: formattedDate });
                  }}
                  type="date"
                  className="form-control-sm px-0"
                />
              </div>
            </div>
            <div className="col-sm-1">
              <div className="form-group ">
                <div>
                  <label className="h6 text-transparent ">Agregar</label>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(formData);
                    maySend();
                    setFormData({ amount: "", plan: "", date: "" });
                  }}
                  className="btn btn-sm btn-outline-primary btn-sm form-control-sm"
                >
                  <i className="text-success fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
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
  setAlert,
})(PaymentAdder);
