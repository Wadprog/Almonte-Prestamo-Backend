import React, { useState, useEffect, Fragment } from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import LoanDescription from "../component/LoanDescription";
import { getLoanById } from "../redux/actions/loans";
import { getPaymentsById } from "../redux/actions/payment";
import { Button } from "react-bootstrap";
import DeleteLastPayment from "../component/DeleteLastpaymentModal";
const NewLoan = ({
  getLoanById,
  getPaymentsById,
  paymentLoading,
  loan,
  loanLoading,
  payments,
  match: {
    params: { id },
  },
}) => {
  useEffect(() => {
    getLoanById(id);
    getPaymentsById(id);
    return () => {
      console.log("Cleaned previous loan");
    };
  }, [getPaymentsById, getLoanById, id]);
  // const [loan] = loans.filter((loan) => loan._id === id);
  // const payments = payments.filter((payment) => payment.loan === id);
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className='container mt-5 pt-5'>
      {loanLoading || paymentLoading ? (
        <Loading />
      ) : (
        <Fragment>
          {loan !== null && (
            <LoanDescription
              loan={loan}
              noPaymentBtn={loan.status}
              noHistoryBtn={true}
            />
          )}

          {payments.length > 0 ? (
            <div>
              <Button
                variant='outline-danger'
                size='lg'
                block
                onClick={() => {
                  setModalShow(true);
                }}
              >
                <i className='fa fa-trash'></i>
              </Button>
              {
                <ul className='list-group'>
                  {payments.map(payment => (
                    <li className='list-group-item my-info'>
                      <div
                        className={`d-flex justify-content-between text-${
                          payment.status === "Pagado" ? "success" : "danger"
                        }`}
                      >
                        <span>Numero pago :</span>
                        <span>{payment.quota}</span>
                      </div>

                      <div
                        className={`d-flex justify-content-between text-${
                          payment.status === "Pagado" ? "success" : "danger"
                        }`}
                      >
                        <span>Estado:</span>
                        <span>{payment.status}</span>
                      </div>

                      <div>
                        <span className='mr-2'>Fecha a pagar:</span>
                        <span>{payment.dateToPay}</span>
                      </div>
                      <div>
                        <span className='mr-2'>Fecha que pago:</span>
                        <span>{payment.dateAmountPaid}</span>
                      </div>
                      <div>
                        <span className='mr-2'>Monto que pago:</span>
                        <span>
                          <NumberFormat
                            value={payment.amountPaid}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"RD$"}
                          />
                        </span>
                      </div>
                      <div>
                        <span className='mr-2'>Fecha que pago el interes:</span>
                        <span>{payment.dateInterestPaid}</span>
                      </div>
                      <div>
                        <span className='mr-2'>Monto de interes que pago:</span>
                        <span>
                          <NumberFormat
                            value={payment.interestPaid}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"RD$"}
                          />
                        </span>
                      </div>
                      <div />
                      {payment.comment &&
                        payment.comment != null &&
                        payment.comment !== "" && (
                          <div>
                            <span className='mr-2'>Comentario</span>
                            <span>{payment.dateInterestPaid}</span>
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              }
            </div>
          ) : (
            <h4 className=' mt-2  text-center text-white'>
              {" "}
              **Aun no hay pagos hechos para este prestamo**
            </h4>
          )}
        </Fragment>
      )}
      {loan !== null && payments.length > 0 && (
        <DeleteLastPayment
          show={modalShow}
          onHide={() => setModalShow(false)}
          loan={loan}
          payments={payments}
          redirect={`/loan/${loan._id}`}
        />
      )}
    </div>
  );
};

NewLoan.prototype = {
  loan: PropTypes.object.isRequired,
  loanLoading: PropTypes.bool.isRequired,
  payments: PropTypes.array.isRequired,
  paymentLoading: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  payments: state.payment.selectedPayment,
  paymentLoading: state.payment.loading,
  loanLoading: state.loan.loading,
  loan: state.loan.loan,
});
export default connect(mapStateToProps, { getPaymentsById, getLoanById })(
  NewLoan
);
