import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { loadPlan } from "../redux/actions/plan";
const Plan = ({ loadPlan, addPlan, plans, planLoading, authLoading }) => {
  useEffect(() => {
    loadPlan();
  }, [loadPlan]);
  const { Fragment } = React;
  return (
    <div className="container mt-5 pt-5">
      {!planLoading ? (
        <Fragment>
          <div className="my-info  mb-2 p-0 rounded-0">
            <div className="  ">
              <a
                href="/newplan"
                className=" text-white btn btn-outline-secondary btn-block "
              >
                Crear nuevo plan
              </a>
            </div>
          </div>
          {plans.length > 0 ? (
            <ul className="list-group">
              <li className="list-group-item disabled">Planes</li>
              {plans.map((plan) => (
                <li className="list-group-item">
                  <div>
                    <span className="mr-2">Nombre:</span>
                    <span>{plan.name}</span>
                  </div>
                  <div>
                    <span className="mr-2">Interes:</span>
                    <span>{plan.interest} % </span>
                  </div>
                  <div>
                    <span className="mr-2">Intervalo:</span>
                    <span> cada {plan.interval} dias </span>
                  </div>
                  <div>
                    <span className="mr-2">Cantidad de pasos:</span>
                    <span> {plan.steps} </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h4 className="text-center text-white ">
              No hay definido ningun plan aun
            </h4>
          )}
        </Fragment>
      ) : (
        <Loading />
      )}
    </div>
  );
};

Plan.prototype = {
  planLoading: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
  plan: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  planLoading: state.plan.loading,
  authLoading: state.auth.loading,
  plans: state.plan.plans,
});
export default connect(mapStateToProps, { loadPlan })(Plan);
