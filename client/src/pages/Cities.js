import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';

const City = ({ cities, cityLoading, authLoading }) => {
	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			<div className="my-info  mb-2 p-0 rounded-0">
				<div className="  ">
					<a href="/newcity" className=" text-white btn btn-outline-secondary btn-block ">
						Agregar nueva ciudad
					</a>
				</div>
			</div>
			{!cityLoading && !authLoading ? (
				<ul className="list-group">
					<li className="list-group-item disabled">Ciudades</li>
					{cities &&
						cities !== null &&
						cities.length > 0 &&
						cities.map(city => <li className="list-group-item">{city.name}</li>)}
				</ul>
			) : (
				<Loading />
			)}
		</div>
	);
};

City.prototype = {
	cityLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired,
	cities: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
	cityLoading: state.city.loading,
	authLoading: state.auth.loading,
	cities: state.city.cities
});
export default connect(mapStateToProps, {})(City);
