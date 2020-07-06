import React, { useState, useEffect, Fragment } from "react";
import NumberFormat from "react-number-format";
import { filterProfiles } from "../redux/actions/profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../component/layout/Loading";
import { loadProfiles } from "../redux/actions/profile";
import { Button, Form, Col, Alert, Table } from "react-bootstrap";
import DeleteClient from "../component/DeleteClientModal";

import ClientList from "../component/Client/ClientList";

const Clients = ({
  loadProfiles,
  profiles,
  profilesFiltered,
  filterProfiles,
  porfileLoading,
}) => {
  useEffect(() => {
    loadProfiles();
  }, []);

  const [selectedClient, setSelectedClient] = useState({});
  const [modalShow, setModalShow] = React.useState(false);

  const handleFilter = e => {
    filterProfiles(e.target.value, profiles);
  };
  return (
    <div className='container-fluid text-white'>
      <div className='row mb-3'>
        <div className='col-12 d-flex justify-content-between'>
          <h6 className='text-bold text-white'>Lista de cliente</h6>
          <span>
            <Button
              href='/newclient'
              variant='secondary'
              type='submit'
              size='sm'
              className='mx-3'
            >
              <i className='fa fa-plus-circle mx-2 text-success'></i>
              Agregar nuevo cliente
            </Button>
          </span>
        </div>
      </div>

      <div className='row'>
        <div className='col-12 mb-2'>
          <Alert variant='warning' className='justify-content'>
            This page list your clients your <Link to='#'>clients</Link>,{" "}
            <Link to='#'>prospects</Link>, <Link to='#'>lead</Link>. Use{" "}
            <Link to='#'>Advanced Search</Link> above to sort by affiliate or
            team member. Use quick filter to sort by status (for followed-up).
            Click a client's name to access records, the pencil icon to edit a
            profile or click a status to change it. If you enable portal access
            or set an agreement in a new client profile, icons of envelopes or
            checkmarks will appear below. Mouse-over the icons below to see more
            details. To learn the system, use your{" "}
            <Link to='#'>Sample Client</Link>.
          </Alert>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6 '>Filtrar por nombre</div>
        <div className='col-md-6 col-sm-12 '>
          <div className='input-group mb-3'>
            <input
              onChange={handleFilter}
              type='text'
              className='form-control'
            />
            <div className='input-group-append'>
              <span className='input-group-text'>
                <i className='fa fa-user' />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col-12 d-flex justify-content-between'>
          <Form className='form-inline'>
            <Form.Group>
              <Form.Label column sm='6'>
                Quick Filter:
              </Form.Label>
              <Col sm='6'>
                <Form.Control
                  size='sm'
                  as='select'
                  name='search'
                  value={""}
                  onChange={""}
                >
                  <option>All</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Form>
          <div className='align-self-center'>
            <Link to='#' className='mx-2'>
              Import CSV
            </Link>
            <Link to='#' className='mx-2'>
              Export CSV
            </Link>
            <Link to='#' className='mx-2'>
              print
            </Link>
          </div>
        </div>
      </div>
      <div>
        {!porfileLoading ? (
          <Fragment>
            <div>
              {profiles && profiles !== null && profiles.length > 0 ? (
                <ClientList
                  profiles={profilesFiltered}
                  setModalShow={setModalShow}
                  setSelectedClient={setSelectedClient}
                />
              ) : (
                <h1 className='text-white'> Aun no has agregado clientes</h1>
              )}
            </div>

            <DeleteClient
              show={modalShow}
              onHide={() => setModalShow(false)}
              client={selectedClient}
            />
          </Fragment>
        ) : (
          <Loading message=' Cargando los clientes' />
        )}
      </div>
    </div>
  );
};
Clients.propTypes = {
  profiles: PropTypes.array.isRequired,
  porfileLoading: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  porfileLoading: state.profile.isLoading,
  profilesFiltered: state.profile.filteredProfiles,
  profiles: state.profile.profiles,
});
export default connect(mapStateToProps, { filterProfiles, loadProfiles })(
  Clients
);
