import React, { useState, useEffect, Fragment } from "react";
import NumberFormat from "react-number-format";
import { filterProfiles } from "../redux/actions/profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../component/layout/Loading";
import { loadProfiles } from "../redux/actions/profile";
import { Button, Modal } from "react-bootstrap";
import DeleteClient from "../component/DeleteClientModal";
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
    <div className='container mt-5'>
      {!porfileLoading ? (
        <Fragment>
          <div className='row'>
            <div className='col-md-6 ' />
            <div className='col-md-6 col-sm-12 '>
              <div className='input-group mb-3'>
                <input
                  onChange={handleFilter}
                  type='text'
                  className='form-control'
                />
                <div class='input-group-append'>
                  <span class='input-group-text'>
                    <i className='fa fa-user' />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div classNamee='card p-2'>
            <div className='card-header'>
              <div className='d-flex justify-content-between text-white'>
                <h5>Lista de los clientes</h5>
                <div>
                  <a href='/newclient' className='btn btn-info'>
                    Crear nuevo Cliente
                  </a>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <div className='list-group'>
                {profiles && profiles !== null && profiles.length > 0 ? (
                  profilesFiltered.map(client => (
                    <li
                      key={client._id}
                      className='my-item list-group-item mb-2 p-0'>
                      <div className=' bg-light  rounded p-4'>
                        <div className='d-flex justify-content-between text-bold '>
                          <h5 className=''>{`${client.name} ${client.apellido}`}</h5>

                          <h5
                            className={`text-bold text-${
                              client.punto > 700 ? "success" : "warning"
                            }`}>{` `}</h5>
                        </div>

                        <div className='mb-1'>
                          <span className='text-muted mr-4'>Cedula</span>

                          <span className='text-muted mr-4 '>
                            {client.cedula.split().length == 11 ? (
                              <NumberFormat
                                value={client.cedula}
                                displayType={"text"}
                                format='###-#######-#'
                              />
                            ) : (
                              client.cedula
                            )}
                          </span>
                        </div>
                        <div className='mb-1'>
                          <span className=' text-muted mr-4'> Telefono</span>

                          <span className='text-muted mr-4  '>
                            <NumberFormat
                              value={client.telefono}
                              displayType={"text"}
                              format='(###) ###-####'
                            />
                          </span>
                        </div>

                        {client.telefono2 && (
                          <div className='mb-1'>
                            <span className='text-muted mr-4'>Telefono 2:</span>

                            <span className='text-muted '>
                              <NumberFormat
                                value={client.telefono2}
                                displayType={"text"}
                                format='(###) ###-####'
                              />
                            </span>
                          </div>
                        )}
                        {client.telefono3 && (
                          <div className='mb-1'>
                            <span className='text-muted mr-4'>Telefono 3</span>

                            <span className='text-muted '>
                              <NumberFormat
                                value={client.telefono3}
                                displayType={"text"}
                                format='(###) ###-####'
                              />
                            </span>
                          </div>
                        )}
                        <div className='mb-1'>
                          <span className='text-muted '>{`${client.dirreccion} `}</span>
                        </div>

                        <div className='mb-3'>
                          <span className='text-muted '>{`${
                            client.ciudad.charAt(0).toUpperCase() +
                            client.ciudad.slice(1)
                          } `}</span>
                        </div>
                        <div className='row'>
                          <div className='col-sm-12 col-md-6 mb-2'>
                            <a
                              href={`/client/${client._id}`}
                              className='btn btn-outline-info btn-block'>
                              Detalle
                            </a>
                          </div>

                          <div className='col-sm-12 col-md-6'>
                            <a
                              href={`newloan/${client._id}`}
                              className='btn btn-outline-info btn-block '>
                              Nuevo Prestamo
                            </a>
                          </div>

                          <div className='col-sm-12 '>
                            <Button
                              variant='outline-danger'
                              block
                              size='sm'
                              onClick={() => {
                                setSelectedClient(client);
                                setModalShow(true);
                              }}>
                              Borrar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <h1 className='text-white'> Aun no has agregado clientes</h1>
                )}
              </div>
            </div>
          </div>

          <DeleteClient
            show={modalShow}
            onHide={() => setModalShow(false)}
            client={selectedClient}
          />
        </Fragment>
      ) : (
        <Loading />
      )}
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
