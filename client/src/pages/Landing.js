import React, { Fragment } from "react";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { Redirect } from "react-router-dom";

function Landing({ auth: { isAuthenticated, loading } }) {
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {isAuthenticated ? <Redirect to='/home' /> : <Redirect to='/login' />}
        </Fragment>
      )}
    </div>
  );
}
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Landing);
