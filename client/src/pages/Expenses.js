import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { loadExpenses } from "../redux/actions/expenses";

const Expense = ({ loadExpenses, expenses, expenseLoading }) => {
  useEffect(() => {
    loadExpenses();
    return () => {
      console.log("out of here");
    };
  }, [loadExpenses, loadExpenses]);
  const { Fragment } = React;
  return (
    <div className="container mt-5 pt-5">
      {!expenseLoading ? (
        <Fragment>
          <div className="my-info  mb-2 p-0 rounded-0">
            <div className="  ">
              <a
                href="/newexpense"
                className=" text-white btn btn-outline-secondary btn-block "
              >
                Agregar nuevo gasto
              </a>
            </div>
          </div>
          {expenses.length > 0 ? (
            <ul className="list-group">
              <li className="list-group-item disabled">Gatos</li>
              {expenses &&
                expenses !== null &&
                expenses.length > 0 &&
                expenses.map((expense) => (
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
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"RD$"}
                          className="h6 text-info"
                        />
                      </span>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="btn btn-sm btn-outline-danger">
                        Eliminar gasto
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <h4 className=" text-center text-white mt-2">
              {" "}
              **Aun no hay gastos registrado**
            </h4>
          )}
        </Fragment>
      ) : (
        <Loading />
      )}
    </div>
  );
};

Expense.prototype = {
  expenseLoading: PropTypes.bool.isRequired,
  expenses: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  expenseLoading: state.expense.loading,
  expenses: state.expense.expenses,
});
export default connect(mapStateToProps, { loadExpenses })(Expense);
