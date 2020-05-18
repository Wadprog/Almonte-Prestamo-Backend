import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router";
import NumberFormat from "react-number-format";

import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { updateClient } from "../redux/actions/profile";
import LoanDescription from "../component/LoanDescription";
import { loadSelectedProfile } from "../redux/actions/profile";
import { loadClientLoan } from "../redux/actions/loans";
import Profile from "../component/Profile";
import "./Client.css";
const Client = ({
  client,
  selectedLoans,
  profileLoading,
  loanLoading,
  loadSelectedProfile,
  loadClientLoan,
  match: {
    params: { id },
  },
}) => {
  useEffect(() => {
    loadSelectedProfile(id);
    loadClientLoan(id);
  }, []);
  return (
    <div>
      {profileLoading && loanLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="row">
            <div className="col col-xs-12 col-sm-4">
              <div className="card bg-transparent card-secondary ">
                <div className="card-body">
                  {!profileLoading ? (
                    <Fragment>
                      <h5 className=" text-left">Cliente</h5>
                      {client != null && <Profile client={client} />}
                    </Fragment>
                  ) : (
                    <div className="spinner-border">
                      <span className="sr-only">Cargando</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col col-xs-12 col-sm-8">
              <div className="card bg-transparent h-100">
                <div className="card-body">
                  {!loanLoading ? (
                    <Fragment>
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <a clasName="ml-2" href="">
                            <h5>
                              Pestamos
                              <i className="ml-2 fa fa-plus"></i>
                            </h5>
                          </a>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <form action="">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <button
                                  className=" text-white btn btn-outline-secondary dropdown-toggle"
                                  type="button"
                                  data-toggle="dropdown"
                                >
                                  Categoria
                                </button>
                                <div className="dropdown-menu">
                                  <a className="dropdown-item" href="#">
                                    plan
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Monto
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Fecha
                                  </a>
                                </div>
                              </div>
                              <input
                                type="text"
                                type="text"
                                className="form-control"
                                disabled={true}
                              />
                              <div className="input-group-append">
                                <button className="btn btn-secondary">
                                  <i className="fa fa-search"></i>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>

                      {selectedLoans &&
                      selectedLoans != null &&
                      selectedLoans.length > 0 ? (
                        <table className="table table-borderless table-sm table-responsive-md table-hover text-white">
                          <thead>
                            <tr>
                              <td scope="col">Fecha</td>
                              <td scope="col">Monto</td>
                              <td scope="col">Plan</td>
                              <td scope="col">Estado</td>
                              <td scope="col">Actiones</td>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedLoans.map((loan) => (
                              <tr
                                key={loan._id}
                                className="shadow-box effect1 "
                              >
                                <td
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  data-animation="true"
                                  title={"Fecha creada"}
                                >
                                  {loan.date}
                                </td>
                                <td> RD${loan.amount}</td>
                                <td
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  data-html="true"
                                  data-animation="true"
                                  title={`
								  <div> interest ${loan.plan.interest} %</div> 
								  <div> Cada${loan.plan.interval} Dias</div> 
								  <div>Con ${loan.plan.steps} pasos</div>`}
                                >
                                  <a href="/plan">
                                    <u>{loan.plan.name}</u>
                                  </a>
                                </td>
                                <td
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  data-html="true"
                                  title={`<span>Fecha del ${
                                    loan.status ? "ultimo" : "proximo"
                                  } pago</span>
								  <span>${loan.nextpaymentDate}</span>`}
                                >
                                  <i
                                    className={` fa fa-${
                                      loan.status
                                        ? "check text-success"
                                        : "times text-danger"
                                    }`}
                                  ></i>
                                </td>
                                <td>
                                  <div>
                                    <a className="p-0  btn btn-sm btn-outline-primary">
                                      Pagar
                                    </a>
                                    <a className=" ml-2 p-0 btn btn-sm btn-outline-info">
                                      Info
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                          <a
                            href="/"
                            className="btn btn-outline-primary border border-0"
                          >
                            <i className="fa fa-plus fa-5x"></i>
                            <div>Agregar un prestamo</div>
                          </a>
                        </div>
                      )}
                    </Fragment>
                  ) : (
                    <div className="spinner-border">
                      <span className="sr-only">cargando</span>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <a href="" className="btn btn-block btn-outline-primary">
                    Nuevo prestamo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  client: state.profile.profile,
  selectedLoans: state.loan.selectedLoans,
  loanLoading: state.loan.loading,
  profileLoading: state.profile.isLoading,
});
export default connect(mapStateToProps, {
  updateClient,
  loadSelectedProfile,
  loadClientLoan,
})(Client);
