import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';

const Plan = ({ userLoading, authLoading }) => {
	const { Fragment } = React;
	return (
		<div className="container mt-5 pt-5">
			<div className="my-info  mb-2 p-0 rounded-0">
				<div className="  ">
					<a href="/newplan" className=" text-white btn btn-outline-secondary btn-block ">
						Crear nuevo usuario
					</a>
				</div>
			</div>
			{!userLoading && !authLoading ? (
				<Fragment>
					{users && users !== null && users.length > 0 && users.map(user => <h1>{user.name}</h1>)}
				</Fragment>
			) : (
				<Loading />
			)}
		</div>
	);
};

User.prototype = {
	userLoading: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired,
	users: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
	userLoading: state.user.loading,
	authLoading: state.auth.loading,
	users: state.user.users
});
export default connect(mapStateToProps, {})(User);
