import React, { useState, useEffect, Fragment } from "react";
import { Button, Modal, Form, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { removeCity } from "../redux/actions/city";
function DeleteLastPayment({ city, onHide, show, redirect = "", removeCity }) {
  const [confirm, setConfirm] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    fireRedirect: false,
  });

  let payment = payments.filter(pay => pay.quota === loan.quota);
  payment = payment[payment.length - 1];
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
        <Button onClick={onHide}>Cerrar</Button>
        <Modal.Title id='contained-modal-title-vcenter'>
          Borrar un ciudad
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {PaymentLoading ? (
          <Spinner animation='grow' />
        ) : (
          <Fragment>
            <p>Intentas borrar una ciudad confirma lo abajo</p>
            <Form>
              <Button variant='danger'>Confirmar Borara</Button>
            </Form>
          </Fragment>
        )}
      </Modal.Body>

      {formData.fireRedirect && <Redirect to={redirect} />}
    </Modal>
  );
}
const mapStateToProps = state => ({
  loading: state.city.loading,
  cities: state.city.cities,
  selectedCity: state.city.city,
});
export default connect(mapStateToProps, { removeCity })(DeleteLastPayment);
