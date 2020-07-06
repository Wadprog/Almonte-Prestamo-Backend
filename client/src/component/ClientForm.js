import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

import NumberFormat from "react-number-format";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerClient } from "../redux/actions/profile";
import Loading from "../component/layout/Loading";
import { loadCities } from "../redux/actions/city";

const ClientForm = ({
  client = null,
  submit,
  loadCities,
  cityLoading,
  cities,
}) => {
  useEffect(() => {
    loadCities();
  }, []);
  const clientDetails = {
    name: "",
    apellido: "",
    cedula: "",
    telefono: "",
    telefono2: "",
    telefono3: "",
    dirreccion: "",
    ciudad: "",
    DirReferencia: "",
  };
  const State = client ? client : clientDetails;
  const [state, setstate] = useState({ ...State });

  const handleSubmit = e => {
    e.preventDefault();
    submit(state);
  };
  const handleChange = e => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      {!cityLoading ? (
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={state.name}
                  name='name'
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name='apellido'
                  value={state.apellido}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Cedula</Form.Label>

                {client === null ? (
                  <Form.Control
                    onChange={handleChange}
                    value={state.cedula}
                  ></Form.Control>
                ) : (
                  <Form.Control value={state.cedula} disabled></Form.Control>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  as='select'
                  name='ciudad'
                  value={state.ciudad}
                  onChange={handleChange}
                >
                  <option disable={true} />
                  {cities.map(city => (
                    <option key={city._id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Dirreccion</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name='dirreccion'
                  value={state.dirreccion}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Referencia</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name='DirReferencia'
                  value={state.DirReferencia}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Telefono1</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name='telefono'
                  value={state.telefono}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Telefono2</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name='telefono2'
                  value={state.telefono2}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Telefono3</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name='telefono3'
                  value={state.telefono3}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Button block type='submit'>
                {" "}
                Guardar
              </Button>
            </Col>
          </Form.Row>
        </Form>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

ClientForm.prototype = {
  cities: PropTypes.array.isRequired,
  cityLoading: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  cities: state.city.cities,
  cityLoading: state.city.loading,
});
export default connect(mapStateToProps, { loadCities })(ClientForm);
