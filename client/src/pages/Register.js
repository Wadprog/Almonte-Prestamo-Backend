import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../redux/actions/alert'
import { register } from '../redux/actions/auth'
import PropTypes from 'prop-types'
const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    password2: ''
  })
  const { password, password2, name } = formData

  const onSubmit = e => {
    e.preventDefault()
    if (password !== password2)
      setAlert('Las contrasenas no son iguales', 'danger')
    register({name, password})
  }
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  return (
    <div className="h-100 container-fluid">
      <div className="centered-box  d-flex justify-content-center align-items-center">
        <div className="small-box rounded px-3 py-3 mb-5 bg-white h-75 w-100 ">
          <h4 className="text-center text-muted">Register Form </h4>
          <form
            onSubmit={onSubmit}
            className="d-flex h-100 justify-content-center align-items-center"
          >
            <div className="w-100">
              <div className="form-group">
                <label htmlfor="exampleInputEmail1">Nombre</label>
                <input
                  onChange={onChange}
                  value={name}
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter nombre"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlfor="exampleInputPassword1">Contrasena</label>
                <input
                  onChange={onChange}
                  value={password}
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Entrar contrasena"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlfor="exampleInputPassword1">
                  Verificar contrasena
                </label>
                <input
                  onChange={onChange}
                  value={password2}
                  name="password2"
                  type="password"
                  className="form-control"
                  placeholder="Entrar contrasena"
                  required
                />
              </div>

              <button
                type="submit"
                className="mb-5 btn btn-block btn-sm btn-outline-success"
              >
                Registrar
                <i className=" ml-3 mt-1 fa fa-sign-in"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}
export default connect(null, { setAlert, register })(Register)
