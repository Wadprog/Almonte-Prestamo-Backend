import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../component/layout/Loading";
import { loadUsers } from "../redux/actions/user";

const User = ({ loadUsers, users, userLoading }) => {
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const { Fragment } = React;
  return (
    <div className="container mt-5 pt-5">
      <div className="my-info  mb-2 p-0 rounded-0">
        <div>
          <a
            href="/newuser"
            className=" text-white btn btn-outline-secondary btn-block "
          >
            Crear nuevo usuario
          </a>
        </div>
      </div>
      {!userLoading ? (
        <ul className="list-group">
          <li className="list-group-item disabled">Usuarios</li>
          {users &&
            users !== null &&
            users.length > 0 &&
            users.map((user) => (
              <li className="list-group-item">
                <div>
                  <span className="mr-2"> Nombre :</span>
                  <span>{user.name}</span>
                </div>
                <div>
                  <span className="mr-2"> Usuario:</span>
                  <span>{user.nombreUsuarios}</span>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
};

User.prototype = {
  userLoading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  userLoading: state.user.loading,
  users: state.user.users,
});
export default connect(mapStateToProps, {loadUsers})(User);
