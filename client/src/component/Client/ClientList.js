import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { Row, Col } from "react-bootstrap";
const ClientList = ({ profiles, setSelectedClient, setModalShow }) => {
  return (
    <Row>
      {profiles.map(client => (
        <Col sm={6} md={4} lg={3}>
          <li key={client._id} className='my-item list-group-item mb-2 p-0'>
            <div className=' bg-light  rounded p-4'>
              <h5 className='text-dark'>{`${client.name} ${client.apellido}`}</h5>

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
                  client.ciudad.charAt(0).toUpperCase() + client.ciudad.slice(1)
                } `}</span>
              </div>
              <div className='row'>
                <div className='col-sm-12 col-md-6 mb-2'>
                  <a
                    href={`/client/${client._id}`}
                    className='btn btn-outline-info btn-block'
                  >
                    <span className='d-none d-sm-block'>Detalle </span>
                    <span className='d-sm-none'>
                      <i className='fa fa-info-circle'></i>
                    </span>
                  </a>
                </div>

                <div className='col-sm-12 col-md-6'>
                  <a
                    href={`newloan/${client._id}`}
                    className='btn btn-outline-info btn-block '
                  >
                   <span className='d-none d-sm-block'>Nuevo Prestamo </span>
                    <span className='d-sm-none'>
                      <i className='fa fa-plus'></i>
                    </span>
                  </a>
                </div>

                <div className='col-sm-12 mt-2'>
                  <Button
                    variant='outline-danger'
                    block
                    size='sm'
                    onClick={() => {
                      setSelectedClient(client);
                      setModalShow(true);
                    }}
                  >
                    <span className='d-none d-sm-block'>Borrar</span>
                    <span className='d-sm-none'>
                      <i className='fa fa-trash'></i>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </li>
        </Col>
      ))}
    </Row>
  );
};

export default ClientList;
