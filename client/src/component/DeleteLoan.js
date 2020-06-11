import React, { useState, useEffect, Fragment } from "react";
import { Button, Modal, Form, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { removeLoan, getLoanById } from "../redux/actions/loans";
import { getPaymentsById } from "../redux/actions/payment";
function DeleteLoan({
  PaymentLoading,
  removeLoan,
  onHide,
  show,
  getPaymentsById,
  loan,
  selectedPayment,
  redirect = "",
}) {
  const hasPayment = () => {
    return selectedPayment > 0;
  };

  const [confirm, setConfirm] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    fireRedirect: false,
  });

  useEffect(() => {
    console.log(show);
    if (show) {
      getPaymentsById(loan._id);
    }
  }, [show]);

  const handleSubmit = e => {
    e.preventDefault();
    removeLoan(loan._id);
    if (redirect !== "") setFormData({ ...formData, fireRedirect: true });
    else window.location.reload();
    onHide();
  };

  return (
    <Modal
      show={show}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Borrar un prestamo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {PaymentLoading ? (
          <Spinner animation='grow' />
        ) : (
          <Fragment>
            <p>
              Intentas borrar a un prestamo de{" "}
              <b>{loan.client.name + "" + loan.client.apellido}</b> confima esta
              accion escribiendo <b className='text-danger'>{loan._id} </b>
              abajo y presiona al boton
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Row>
                  {hasPayment() && (
                    <Fragment>
                      <p className='text-danger'>
                        Nota que ya hay pagos realizado por este Prestamo. Al
                        cancelarla tambien sera considerado Pagado{" "}
                        <a href={`/loan/${loan._id}`}>Mas detalles</a>
                      </p>
                    </Fragment>
                  )}
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Control
                      type='text'
                      value={confirm}
                      onChange={e => {
                        setConfirm(e.target.value.trim());
                      }}
                    />
                  </Col>
                  <Col>
                    <Button
                      disabled={!(confirm === loan._id)}
                      variant='danger'
                      type='submit'
                    >
                      <i className='fa fa-trash'></i>
                    </Button>
                  </Col>
                </Form.Row>

                {confirm !== "" && (
                  <Form.Text className='text-muted text-danger'>
                    Nota que este accion es irreversible
                  </Form.Text>
                )}
              </Form.Group>
            </Form>

            <p className='text-warning'></p>
          </Fragment>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cerrar</Button>
      </Modal.Footer>

      {formData.fireRedirect && <Redirect to={redirect} />}
    </Modal>
  );
}
const mapStateToProps = state => ({
  loanLoading: state.loan.loading,
  PaymentLoading: state.payment.loading,
  selectedPayment: state.payment.selectedPayment.length,
});
export default connect(mapStateToProps, { getPaymentsById, removeLoan })(
  DeleteLoan
);
