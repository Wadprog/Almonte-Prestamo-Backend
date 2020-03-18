import React, { Component } from 'react';


class ExpandableRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpened: false
		};
		this.handleOpen = this.handleOpen.bind(this);
		
	}

	handleOpen(evt) {
		this.setState(
      state => ({ isOpened: !state.isOpened })
    )
	}

	render() {
		const { Fragment } = React;
		const { date, amount,id, dues, paidStatus, previousDebt,status } = this.props;
		return (
			<Fragment>
				<tbody>
					<tr>
						<td colspan="2" className="bg-info">
  <label className="text-white text-bold" >
   <input type="checkbox" className="hiden_checkbox" onChange={this.handleOpen} name={id} />
   {`Prestamo del ${date} de ${amount}`}  </label>
							
						</td>
					</tr>
				</tbody>
				<tbody className={`text-white ${!this.state.isOpened && 'hide'} `}>
					<tr>
						<td> Cantidad </td>
						<td> {amount}</td>
					</tr>
					<tr>
						<td>Fecha de prestamo</td>
						<td> {date}</td>
					</tr>

					<tr>
						{dues.length > 0 && (
							<Fragment>
								<td>Ultimo pago</td>
								<td> {date}</td>
							</Fragment>
						)}
					</tr>

					<tr>
						<td>Estado</td>
						<td className={`text-${paidStatus ? 'success' : 'danger'}`}>
							{' '}
							{paidStatus ? 'pagado' : 'cancelado'}
						</td>
					</tr>
					{previousDebt.length > 0 && (
						<tr>
							<td colspan="2" className="bg-warning">
								<label className="text-white">{`Prestamos agrgados`}</label>
							</td>
						</tr>
					)}
				</tbody>
			</Fragment>
		);
	}
}
export default ExpandableRow;
