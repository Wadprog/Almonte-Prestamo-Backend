import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { loadCities } from "../redux/actions/city";
import { Capitalize } from "../utils/Capitalize";

const City = ({ loadCities, cities, cityLoading }) => {
  useEffect(() => {
    loadCities();
  }, [loadCities]);
  return (
    <div className='container mt-5 pt-5'>
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
      {!cityLoading ? (
        <Fragment>
          {cities.length > 0 ? (
            <ul className='list-group'>
              <li className='list-group-item disabled'>Ciudades</li>
              {cities &&
                cities !== null &&
                cities.length > 0 &&
                cities.map(city => (
                  <li className='list-group-item h6' key={city._id}>
                    {Capitalize(city.name)}
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
export default connect(mapStateToProps, { loadCities })(City);
