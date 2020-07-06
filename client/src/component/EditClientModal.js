import React, { useState, useEffect, Fragment } from "react";
import { Button, Modal, Form, Col, Spinner, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import ClientForm from "./ClientForm";
import { updateClient } from "../redux/actions/profile";
const EditClient = ({ updateClient, onHide, show, client, redirect = "" }) => {
  const [formData, setFormData] = useState(client);

  useEffect(() => {
    console.log(show);
    if (show) {
      console.log("I will edit  a client");
    }
  }, [show]);

  const updateClientData = data => {
    updateClient(data);

    if (redirect !== "") setFormData({ ...formData, fireRedirect: true });
    else window.location.reload();
    onHide();
  };

  return (
    <Modal show={show} size='lg' centered>
      <Modal.Header>
        <Modal.Title>
          <div className='text-left'>
            <i onClick={onHide} className='fa fa-times'></i>
          </div>
          <Row>
            <Col>Editar un cliente</Col>
          </Row>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ClientForm client={client} submit={updateClientData} />
      </Modal.Body>

      {formData.fireRedirect && <Redirect to={redirect} />}
    </Modal>
  );
};
const mapStateToProps = state => ({});
export default connect(mapStateToProps, { updateClient })(EditClient);
