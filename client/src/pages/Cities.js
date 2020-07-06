import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { loadCities, removeCity } from "../redux/actions/city";
import { Capitalize } from "../utils/Capitalize";
import { Row, Col, Button } from "react-bootstrap";
const City = ({ loadCities, removeCity, cities, cityLoading }) => {
  useEffect(() => {
    loadCities();
  }, [loadCities]);

  const handleRemove = e => {
    removeCity(e.target.id);}
    
  return (
    <div className='container mt-5 pt-5'>
      {!cityLoading ? (
        <Fragment>
          <div className='my-info  mb-2 p-0 rounded-0'>
            <div className='  '>
              <a
                href='/newcity'
                className=' text-white btn btn-outline-secondary btn-block '
              >
                Agregar nueva ciudad
              </a>
            </div>
          </div>
          {cities.length > 0 ? (
            <ul className='list-group'>
              <li className='list-group-item disabled'>Ciudades</li>
              {cities &&
                cities !== null &&
                cities.length > 0 &&
                cities.map(city => (
                  <li className='list-group-item h6' key={city._id}>
                    <Row>
                      <Col>
                        <p>
                          <div>Nombre : {Capitalize(city.name)}</div>
                          <div>
                            <small
                              className={`text-${
                                city.total > 0 ? "dark" : "danger"
                              }`}
                            >
                              Contiene {city.total} clientes
                            </small>
                          </div>
                        </p>
                      </Col>

                      {city.total === 0 && (
                        <Col className='d-flex justify-content-end '>
                          <Button
                            id={city.id}
                            onClick={handleRemove}
                            variant='outline-danger'
                          >
                            <i className='fa fa-trash'></i>
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </li>
                ))}
            </ul>
          ) : (
            <h4 className='text-white text-center '>
              {" "}
              Aun no has registrado ciudades
            </h4>
          )}
        </Fragment>
      ) : (
        <Loading />
      )}
    </div>
  );
};

City.prototype = {
  cityLoading: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
  cities: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  cityLoading: state.city.loading,
  authLoading: state.auth.loading,
  cities: state.city.cities,
});
export default connect(mapStateToProps, { loadCities, removeCity })(City);
