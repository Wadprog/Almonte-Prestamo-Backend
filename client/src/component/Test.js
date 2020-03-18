import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ p }) => {
  const { Fragment } = React
  console.log(p)
  return (
    <Fragment>
      {p !== null &&
        p.length > 0 &&
        p.map(t => (
          <div className="container-fluid">
            <div key={t._id} className={`alert alert-${t._id}`}>
              {t._id}
            </div>
          </div>
        ))}
    </Fragment>
  )
}

Alert.propTypes = {
  p: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  p: state.profile.profiles
})

export default connect(mapStateToProps)(Alert)
