import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import LoanDescription from "../component/LoanDescription";
import {loadRoutina} from'../redux/actions/routina'
const LateLoan = ({ loadRoutina,loans: { count, cities, response }, loanLoanding }) => {
  useEffect(() => {
    loadRoutina();
  }, []);
  return (
    <div className="container mt-5">
      {!loanLoanding ? (
        <div>
          {response && response !== null && response.length > 0 ? (
            <div>
              {response.map((resp) => (
                <div>
                  <div className="mb-2 card-header h6 text-white">
                    {resp.city[0].client.ciudad.trim().charAt(0).toUpperCase() +
                      resp.city[0].client.ciudad.trim().slice(1)}
                  </div>
                  {resp.city.map((loan) => (
                    <div>
                      {
                        <li
                          key={loan._id}
                          className=" my-item list-group-item mb-2 p-0"
                        >
                          <LoanDescription
                            loan={loan}
                            noPaymentBtn={loan.status}
                          />
                        </li>
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-white">No hay deudas a cobrar</h1>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
LateLoan.propTypes = {
  loans: PropTypes.object.isRequired,
  loanLoanding: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  loans: state.routina.loans,
  loanLoanding: state.routina.loading,
});
export default connect(mapStateToProps, {loadRoutina})(LateLoan);
