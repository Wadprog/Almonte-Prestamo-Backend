import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Img/Logo.png'
import { logout } from '../redux/actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Navbar = ({ isAuthenticated, logout }) => {
  const authLink = (
    <ul className="navbar-nav ml-auto ">
      <li className="nav-item">
        <Link className="nav-link " to="/">
          Tablero
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/clients">
          Clientes
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="loan">
          Prestamos
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={logout} className="nav-link" href="/login">
          <i className="fa fa-sign-out"></i>
          <span className="d-sm-none">Sign Out</span>
          Sign Out
        </a>
      </li>
    </ul>
  )
  const guessLink = (
    <ul className="navbar-nav ml-auto ">
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="fa fa-sign-out"></i>
          <span className="d-sm-none">Sign in</span>
          Sign in
        </Link>
      </li>
    </ul>
  )
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light mb-0 fixed-top">
      <div className="container">
        <Link className="navbar-brand bg-light px-5" to="/">
          <img className="Logo" alt="Logo" src={Logo} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isAuthenticated ? authLink : guessLink}
        </div>
      </div>
    </nav>
  )
}
Navbar.prototype = {
  isAuthenticated: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { logout })(Navbar)
