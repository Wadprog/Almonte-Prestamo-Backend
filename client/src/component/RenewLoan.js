import React, { useState, Fragment } from "react";
import { Button, Modal, Form, Col, ProgressBar } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { renewLoan } from "../redux/actions/loans";
import NumberFormat from "react-number-format";
function RenewLoan({ renewLoan, onHide, show, loan, redirect = "" }) {
  const [formData, setFormData] = useState({
    id: loan._id,
    amount: loan.amount,
    plan: loan.plan._id,
    fireRedirect: false,
  });

  const handleSubmit = e => {
    e.preventDefault();
    renewLoan(formData);
    if (redirect !== "") setFormData({ ...formData, fireRedirect: true });
    onHide();
  };
  const { amount } = formData;
  return (
    <Modal
      show={show}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Renovar un prestamo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Fragment>
          <p>
            Intentas renovar a un prestamo de{" "}
            <b className='text-success'>
              <NumberFormat
                value={loan.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"RD$"}
                className='h6 text-info'
              />
            </b>{" "}
            de <b>{loan.client.name + "" + loan.client.apellido}</b>
          </p>
          <p>
            Este prestamo ha completado {loan.quota}/ {loan.plan.steps} de sus
            pagos.
            <ProgressBar
              now={(loan.quota / loan.plan.steps) * 100}
              label={`${(loan.quota / loan.plan.steps) * 100}%`}
            />
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Row>
                <Form.Label>Monto</Form.Label>
                <Col>
                  <NumberFormat
                    className='form-control'
                    value={amount}
                    thousandSeparator={true}
                    prefix={"$"}
                    onValueChange={values => {
                      const { formattedValue, value } = values;

                      setFormData({ ...formData, amount: value });
                    }}
                  />
                </Col>
                <Col>
                  <Button variant='outline-success' type='submit'>
                    <i className='fa fa-paper-plane'></i>
                  </Button>
                </Col>
              </Form.Row>
            </Form.Group>
          </Form>

          <p className='text-warning'></p>
        </Fragment>
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
});
export default connect(mapStateToProps, { renewLoan })(RenewLoan);
