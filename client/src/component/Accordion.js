import React, { Component } from 'react'
import './Accordion.css'

class Accordion extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.nextPayment = this.nextPayment.bind(this)
    this.Arcordion_body = React.createRef()
  }

  nextPayment() {
    //const { paidStatus, dues } = this.props
    //if (paidStatus) return `Ultimo pago: ${dues[dues.length - 1].date}`
    return `Calculando...`
  }
  handleOpen(evt) {
    this.setState(
      state => ({ isOpened: !state.isOpened }),
      function() {
        this.Arcordion_body.current.style.maxHeight = this.state.isOpened
          ? this.Arcordion_body.current.scrollHeight + 'px'
          : 0
      }
    )
  }

  render() {
    const { Fragment } = React
    const { amount, dues,status } = this.props
    return (
      <div className={` d-block Accordion ${this.state.isOpened && 'is-open'}`}>
        <div className="Accordion-header">
          {`$ ${amount} RDS`}
          <div className="d-flex mb-2">
            <small className="d-block text-muted">{this.nextPayment()}</small>

            <div className="d-flex ml-auto">
              <div className="Accordion-pointer">
                <button
                  className="Accordion-open-btn "
                  onClick={this.handleOpen}
                >
                  <i
                    className={`fa fa-angle-double-${
                      this.state.isOpened ? 'up' : 'down'
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
          <div ref={this.Arcordion_body} className="Accordion-body bg-white">
            {dues.length > 0 ? (
              <Fragment>
                <h6 className="text-muted"> Lista de pagos </h6>
                <table className="table">
                  <thead className="">
                    <tr>
                      <th scope="col">Fecha</th>
                      <th scope="col">Candidad</th>
                      <th scope="col">Cobrador</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dues.map(due => (
                      <tr key={due.id}>
                        <th>
                          <del>{due.date}</del>
                        </th>
                        <td>
                          <del>{due.amount}</del>
                        </td>
                        <td>
                          {!due.collector ? 'No Espificado' : due.collector}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Fragment>
            ) : (
              <h1>No hay pagos hecho todavia</h1>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default Accordion
