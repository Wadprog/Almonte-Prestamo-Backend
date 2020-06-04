import React, { useState, useEffect, Fragment } from "react";
import { Button, Modal, Form, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { loadClientLoan } from "../redux/actions/loans";
import { deleteClient } from "../redux/actions/profile";
import { Redirect } from "react-router";
function DeleteClient({
  deleteClient,
  onHide,
  show,
  client,
  loadClientLoan,
  selectedLoans,
  loanLoading,
  redirect = "",
}) {
  const hasLoan = () => {
    return selectedLoans > 0;
  };

  const [confirm, setConfirm] = useState("");
  const [formData, setFormData] = useState({
    id: client._id,
    ensureDelete: hasLoan() ? false : true,
    fireRedirect: false,
  });

  useEffect(() => {
    if (show) {
      loadClientLoan(client._id);
      setFormData({ ...formData, id: client._id });
    }
    /*if (selectedLoans > 0) {
      console.log("I should toogle");
      toogleEnsureDelete();
    }
    return () => {
      setFormData({ ...formData, ensureDelete: true });
    };*/
  }, [show]);

  const toogleEnsureDelete = () => {
    setFormData({ ...formData, ensureDelete: !ensureDelete });
  };
  const handleSubmit = e => {
    e.preventDefault();
    deleteClient(formData);
    if (redirect !== "") setFormData({ ...formData, fireRedirect: true });
    onHide();
  };
  const { ensureDelete } = formData;
  return (
    <Modal
      show={show}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Borror un cliente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loanLoading ? (
          <Spinner animation='grow' />
        ) : (
          <Fragment>
            <p>
              Borraras a{" "}
              <b>
                {client.name} {client.apellido}.
              </b>{" "}
              Por seguridad escriba{" "}
              <b className='text-danger'>{client.cedula}</b> en la caja abajo y
              presiona al botton
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Row>
                  {hasLoan() && (
                    <Fragment>
                      <Form.Check
                        checked={ensureDelete}
                        type='checkbox'
                        label='Forzar borar'
                        onChange={toogleEnsureDelete}
                      />
                      <p className='text-danger'>
                        Este cliente tiene prestamos esta option borrara sus
                        prestamos y pagos
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
                      disabled={
                        confirm === client.cedula && ensureDelete ? false : true
                      }
                      variant='danger'
                      type='submit'>
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
  selectedLoans: state.loan.selectedLoans.length,
  loanLoading: state.loan.loading,
  profileLoading: state.profile.isLoading,
});
export default connect(mapStateToProps, { loadClientLoan, deleteClient })(
  DeleteClient
);
