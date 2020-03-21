import React from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../../redux/actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './SideNav.css';
const SideNav = ({ user, isAuthenticated, logout }) => {
	return (
		<nav id="sidebar" className="sidebar-wrapper">
			<div className="sidebar-content">
				<div className="sidebar-brand">
					<a href="#">Almonte System</a>
					<div id="close-sidebar">
						<i className="fas fa-times" />
					</div>
				</div>

				{user !== null &&
				user && (
					<div className="sidebar-header">
						<div className="user-pic">
							<img
								className="img-responsive img-rounded"
								src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
								alt="User picture"
							/>
						</div>
						<div className="user-info">
							<span className="user-name">
								{user.name}
								<strong>Smith</strong>
							</span>
							<span className="user-role">{user.nombreUsuarios}</span>
							<span className="user-status">
								<i className="fa fa-circle" />
								<span>Online</span>
							</span>
						</div>
					</div>
				)}
				<div className="sidebar-menu">
					<ul>
						<li className="header-menu">
							<span>General</span>
						</li>
						<li>
							<a href="/">
								<i className="fa fa-tachometer-alt" />
								<span>Dashboard</span>
							</a>
						</li>

						<li className="header-menu">
							<span>Clientes</span>
						</li>
						<li>
							<a href="/clients">
								<i class="fa fa-user" />
								<span> Ver todo los clients</span>
							</a>
						</li>
						<li>
							<a href="/newclient">
								<i class="fa fa-user" />
								<span> Crear nuevo cliente</span>
							</a>
						</li>

						<li className="header-menu">
							<span>Deudas</span>
						</li>
						<li>
							<a href="/loan">
								<i class="fa fa-money" />
								<span> Ver todo los Prestamos</span>
							</a>
						</li>
      
						<li>
							<a href="/lateloans/">
								<i class="fa fa-user" />
								<span> Deudas atrasados </span>
							</a>
						</li>

						<li className="header-menu">
							<span>Planes</span>
						</li>
      <li>
							<a href="/plan">
								<i class="fa fa-money" />
								<span> Ver todo los planes</span>
							</a>
						</li>
      
						<li>
							<a href="/newplan/">
								<i class="fa fa-user" />
								<span> Crear nuevo plan </span>
							</a>
						</li>

						<li className="header-menu">
							<span>Usuarios</span>
						</li>
       <li>
							<a href="/users">
								<i class="fa fa-money" />
								<span> Ver todo los usuarios</span>
							</a>
						</li>
      
						<li>
							<a href="/newuser/">
								<i class="fa fa-user" />
								<span> Crear nuevo usuario </span>
							</a>
       </li>

						<li className="header-menu">
							<span>Extra</span>
						</li>
						<li>
							<a href="#">
								<i class="fa fa-book" />
								<span>Documentacion</span>
							</a>
						</li>
						<li>
							<a href="#">
								<i class="fa fa-folder" />
								<span>Ejemplos</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
   <div className="sidebar-footer">
      <a href="#">
        <i className="fa fa-bell"></i>
        <span className="badge badge-pill badge-warning notification">3</span>
      </a>
      <a href="#">
        <i className="fa fa-envelope"></i>
        <span className="badge badge-pill badge-success notification">7</span>
      </a>
      <a href="#">
        <i className="fa fa-cog"></i>
        <span className="badge-sonar"></span>
      </a>
      <a href="#">
        <i className="fa fa-power-off"></i>
      </a>
    </div>
		</nav>
	);
};
SideNav.prototype = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user
});
export default connect(mapStateToProps, { logout })(SideNav);
