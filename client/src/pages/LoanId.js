import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../component/layout/Loading';

const NewLoan = ({
	plans,
	planLoading,
	profiles,
	profileLoading,
	loans,
	loanLoading,
 authLoading,
 payment,
	match: { params: { id } }
}) => {
	return <div className="container mt-5 pt-5" />;
};

NewLoan.prototype = {
	profiles: PropTypes.array.isRequired,
	profileLoading: PropTypes.bool.isRequired,
	loans: PropTypes.array.isRequired,
	loanLoading: PropTypes.bool.isRequired,
 authLoading: PropTypes.bool.isRequired,
 payments: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
	profiles: state.profile.profiles,
 profileLoading: state.profile.isLoading,
 payments:state.payment.payments,
	plans: state.plan.plans,
	planLoading: state.plan.loading,
	loanLoading: state.loan.loading,
	authLoading: state.auth.loading
});
export default connect(mapStateToProps, {})(NewLoan);
