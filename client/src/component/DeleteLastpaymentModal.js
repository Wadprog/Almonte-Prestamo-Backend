import React, { useState, useEffect, Fragment } from "react";
import { Button, Modal, Form, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { RemoveLastPayment } from "../redux/actions/loans";
function DeleteLastPayment({
  PaymentLoading,
  onHide,
  show,
  redirect = "",
  loan,
  payments,
  RemoveLastPayment,
}) {
  const [confirm, setConfirm] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    fireRedirect: false,
  });

  let payment = payments.filter(pay => pay.quota === loan.quota);
  payment=payment[payment.length-1]
  useEffect(() => {
    if (show) {
      console.log("we are back ");
      setFormData({ ...formData, id: payment._id });
    }
  }, [show]);

  const handleSubmit = e => {
    e.preventDefault();
    RemoveLastPayment(formData.id);
    console.log(formData, redirect);
    window.location.reload();
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
          Borrar un Pago
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {PaymentLoading ? (
          <Spinner animation='grow' />
        ) : (
          <Fragment>
            <p>
              Intentas borrar el ultimo pago de un prestamo de{" "}
              <b>{loan.client.name + "" + loan.client.apellido}</b> confima esta
              accion escribiendo <b className='text-danger'>{payment._id} </b>
              abajo y presiona al boton
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
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
                      disabled={!(confirm === payment._id)}
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
export default connect(mapStateToProps, { RemoveLastPayment })(
  DeleteLastPayment
);
