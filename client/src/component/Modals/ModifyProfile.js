import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
// Import acction to modify user on DB
//import upadte from '../redux/actions/profile'
import './Modal.css'

const ModifyProfile = ({ /*update,*/ closeModals,profiles, id }) => {
 
  // get the right profile.
  const [client] = profiles.filter(profile => profile._id == id)
  const [formData, setFormData] = useState({ ...client })
  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(formData)
    //update()
  }
  const closeModal=e=>{
    closeModals()
  }
  const { name, cedula, address, addressRef, tel } = formData
  return (
    <div className="Modal-wrapper">
      {client !== undefined && (
        <div className="Modal w-75">
          <div name="modifyProfile" onClick={closeModals}className="Modal-close-btn">X</div>
          <div className="card">
            <div className="card-header">Informaciones actual del clientes</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="Form-group">
                  <label>Nombre</label>
                  <input
                    onChange={handleChange}
                    value={name}
                    name="name"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="Form-group">
                  <label>Cedula</label>
                  <input
                    onChange={handleChange}
                    value={cedula}
                    name="cedula"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="Form-group">
                  <label>Dirreccion</label>
                  <input
                    onChange={handleChange}
                    value={address}
                    name="address"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="Form-group">
                  <label>Dirreccion</label>
                  <input
                    onChange={handleChange}
                    value={addressRef}
                    name="addressRef"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="Form-group">
                  <label>tel</label>
                  <input
                    onChange={handleChange}
                    value={tel}
                    name="tel"
                    type="text"
                    className="form-control"
                  />
                </div>
                <button className="btn btn-block btn-outline-info">
                  Modificar
                </button>
              </form>
            </div>
            <div className="card-footer">
              <btn className="btn btn-sm btn-outline-warning">avanzado</btn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

ModifyProfile.prototype = {
  profiles: PropTypes.array.isRequired
}
var mapPropToState = state => ({
  profiles: state.profile.profiles
})
export default connect(mapPropToState /*,{update} */)(ModifyProfile)
