import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { addpay } from "../redux/actions/loans";
import { getLoanById } from "../redux/actions/loans";
import { Button, Modal, Form, Col, ProgressBar } from "react-bootstrap";

const LatePay = ({
  onHide,
  show,
  redirect = "",
  addpay,
  loan,
  loanLoading,
}) => {
  const [formData, setFormData] = useState({
    id: loan._id,
    amount: "",
    interest: "",
    fireRedirect: false,
    interestPayment: false,
    interestPayment: false,
    date: new Date(),
  });

  const handleToggle = e => {
    e.preventDefault();
    setFormData({ ...formData, interestPayment: !formData.interestPayment });
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    addpay(formData);
    onHide();
    if (redirect != "") setFormData({ ...formData, fireRedirect: true });
    else window.location.reload();
  };
  const { date, amount, interest, fireRedirect, interestPayment } = formData;

  const { Fragment } = React;

  return (
    <Modal
      show={show}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      {!loanLoading ? (
        <Fragment>
          <Modal.Header>
            <Modal.Title id='contained-modal-title-vcenter'>
              Pagar un prestamo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loan && loan != null && (
              <div className=''>
                <h3 className=' text-center card-header'>{` Pago para ${loan.client.name} ${loan.client.apellido} `}</h3>
                <div className='my-4'>
                  <h6 className='text-center'>Informaciones del prestamo</h6>
                  <h5>
                    <div className='d-flex justify-content-between'>
                      <div>Monto del Prestamo </div>
                      <NumberFormat
                        value={loan.amount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"RD$"}
                      />
                    </div>
                  </h5>
                  <h5>
                    <div className='d-flex justify-content-between'>
                      <div>Numero de pago</div>
                      <div>{loan.quota}</div>
                    </div>
                  </h5>

                  <h5>
                    <div className='d-flex justify-content-between'>
                      <div>Cuota a pagar</div>
                      <div>
                        <NumberFormat
                          value={loan.amountPerQuota}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"RD$"}
                        />
                      </div>
                    </div>
                  </h5>
                  <div>
                    <div className='d-flex justify-content-between'>
                      <small>Mora</small>
                      <small>
                        <NumberFormat
                          value={loan.interestPerQuota}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"RD$"}
                        />
                      </small>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className='mb-2 d-flex justify-content-between'>
                    <span>
                      {`${interestPayment ? "Con" : "Sin"} Mora`}
                      <button
                        onClick={handleToggle}
                        className='ml-2 btn btn-sm btn-outline-se'
                      >
                        <i
                          className={`fa ${
                            interestPayment
                              ? " fa-check text-success"
                              : "fa-times text-danger"
                          } `}
                        />
                      </button>
                    </span>
                    <span />
                  </div>
                  <div className={`Form-group `}>
                    <span>Cantidad</span>
                    <NumberFormat
                      placeholder='Cuota'
                      className='form-control'
                      value={amount}
                      thousandSeparator={true}
                      prefix={"$"}
                      onValueChange={values => {
                        const { formattedValue, value } = values;
                        setFormData({ ...formData, amount: value });
                      }}
                    />
                  </div>
                  <div
                    className={`mt-2 Form-group d-${
                      !interestPayment && "none"
                    }`}
                  >
                    <span>Mora</span>
                    <NumberFormat
                      placeholder='Mora'
                      className='form-control'
                      value={interest}
                      thousandSeparator={true}
                      prefix={"$"}
                      onValueChange={values => {
                        const { formattedValue, value } = values;

                        setFormData({ ...formData, interest: value });
                      }}
                    />
                  </div>
                  <div className='Form-group mt-2'>
                    <label>Fecha</label>
                    <input
                      type='date'
                      className='form-control'
                      onChange={handleChange}
                      value={date}
                      name='date'
                      className='form-control'
                    />
                  </div>
                  <div className='mt-3'>
                    <button
                      className='btn btn-block btn-outline-info'
                      type='sumbit'
                    >
                      Pagar
                    </button>
                  </div>
                </form>
                {fireRedirect && <Redirect to={`/loan/${loan._id}`} />}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Cerrar</Button>
          </Modal.Footer>
        </Fragment>
      ) : (
        <Loading />
      )}
    </Modal>
  );
};

LatePay.prototype = {
  loanLoading: PropTypes.bool.isRequired,
  addpay: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  loanLoading: state.loan.loading,
});
export default connect(mapStateToProps, { addpay, getLoanById })(LatePay);
