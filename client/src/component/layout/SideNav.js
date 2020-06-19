import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { logout } from "../../redux/actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./SideNav.css";
const SideNav = ({ user, isAuthLoading, logout }) => {
  return (
    <Fragment>
      <nav id='sidebar' className='sidebar-wrapper'>
        <Fragment>
          <div className='sidebar-content'>
            <div className='sidebar-brand'>
              <a href='#'>Almonte Prestamo</a>
              <div id='close-sidebar'>
                <i className='fa fa-times'></i>
              </div>
            </div>

            {user !== null && user && (
              <div className='sidebar-header'>
                <div className='user-pic'>
                  <img
                    className='img-responsive img-rounded'
                    src='https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg'
                    alt='User picture'
                  />
                </div>
                <div className='user-info'>
                  <span className='user-name'>
                    <strong>{user.name}</strong>
                  </span>
                  <span className='user-role'>{user.nombreUsuarios}</span>
                  <span className='user-status'>
                    <i className='fa fa-circle' />
                    <span>Online</span>
                  </span>
                </div>
              </div>
            )}
            <div className='sidebar-menu'>
              <ul>
                <li className='header-menu'>
                  <span>General</span>
                </li>
                <li>
                  <a href='/'>
                    <i className='fa fa-tachometer-alt' />
                    <span>Dashboard</span>
                  </a>
                </li>

                <li className='header-menu'>
                  <span>Clientes</span>
                </li>
                <li>
                  <a href='/clients'>
                    <i className='fa fa-users' />
                    <span> Ver todo los clients</span>
                  </a>
                </li>
                <li>
                  <a href='/newclient'>
                    <i className='fa fa-user' />
                    <span> Crear nuevo cliente</span>
                  </a>
                </li>

                <li className='header-menu'>
                  <span>Deudas</span>
                </li>
                <li>
                  <a href='/loan'>
                    <i className='fa fa-money-o' />
                    <span> Ver todo los Prestamos</span>
                  </a>
                </li>

                <li>
                  <a href='/lateLoan'>
                    <i className='fa fa-clock-o' />
                    <span> Deudas atrasados </span>
                  </a>
                </li>

                <li className='header-menu'>
                  <span>Planes</span>
                </li>
                <li>
                  <a href='/plan'>
                    <i className='fa fa-paper-plane' />
                    <span> Ver todo los planes</span>
                  </a>
                </li>

                <li>
                  <a href='/newplan'>
                    <i className='fa fa-road' />
                    <span> Crear nuevo plan </span>
                  </a>
                </li>

                <li className='header-menu'>
                  <span>Usuarios</span>
                </li>
                <li>
                  <a href='/users'>
                    <i className='fa fa-user-secret' />
                    <span> Ver todo los usuarios</span>
                  </a>
                </li>

                <li>
                  <a href='/newuser'>
                    <i className='fa fa-user-plus' />
                    <span> Crear nuevo usuario </span>
                  </a>
                </li>

                <li className='header-menu'>
                  <span>Ciudades</span>
                </li>
                <li>
                  <a href='/city'>
                    <i className='fa fa-building-o' />
                    <span> Ver todo las ciudades</span>
                  </a>
                </li>

                <li>
                  <a href='/newcity'>
                    <i className='fa fa-building-o' />
                    <span> Agregar nueva ciudad </span>
                  </a>
                </li>

                <li className='header-menu'>
                  <span>Gastos</span>
                </li>

                <li>
                  <a href='/expense'>
                    <i className='fa fa-building-o' />
                    <span> Ver todo los gastos</span>
                  </a>
                </li>

                <li>
                  <a href='/newexpense'>
                    <i className='fa fa-building-o' />
                    <span> Agregar nuevo gasto </span>
                  </a>
                </li>

                <li className='header-menu'>
                  <span>Extra</span>
                </li>
                <li>
                  <a href='/instruction'>
                    <i className='fa fa-book' />
                    <span>Documentacion</span>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fa fa-folder' />
                    <span>Ejemplos</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='sidebar-footer'>
            <a href='#'>
              <i onClick={logout} className='fa fa-power-off' />
            </a>
          </div>
        </Fragment>
      </nav>
    </Fragment>
  );
};
SideNav.prototype = {
  isAuthLoading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(SideNav);
