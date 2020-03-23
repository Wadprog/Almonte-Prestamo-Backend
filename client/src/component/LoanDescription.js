import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';

const Loan = ({ loan, color = 'black', bgColor = 'bg-white' }) => {
	return (
		<Fragment>
			<div className={`${bgColor} rounded p-4`}>
				<div className="mb-2">
					<span className={`text-${loan.status ? 'success' : 'danger'}`}>
						{loan.status ? 'Pagado' : 'No Pagado'}
					</span>
				</div>

				<div className=" 2 d-flex justify-content-between mb-2 ">
					<h5 className="">{`${loan.client.name} ${loan.client.apellido}`}</h5>

					<h5 className={`text-bold text-${loan.status ? 'success' : 'danger'}`}>
						<NumberFormat
							value={loan.amount}
							displayType={'text'}
							thousandSeparator={true}
							prefix={'RD$'}
						/>
					</h5>
				</div>

				<div className="mb-2">
					<span className={`text-${color} mr-4`}>
						{loan.client.cedula.split().length == 11 ? (
							<NumberFormat value={loan.client.cedula} displayType={'text'} format="###-#######-#" />
						) : (
							loan.client.cedula
						)}
					</span>

					<span className={`text-${color}`}>
						<NumberFormat value={loan.client.telefono} displayType={'text'} format="(###) ###-####" />
					</span>
				</div>
				<div className="2">
					<span className={`text-${color}`}>{loan.client.dirreccion}</span>
				</div>
				<div>
					<span className={`text-${color} mr-4`}>Ciudad :</span>
					<span className={`text-${color}`}>
						{loan.client.ciudad.charAt(0).toUpperCase() + loan.client.ciudad.slice(1)}
					</span>
				</div>
				<div className="mb-3">
					<span className={`text-${color} mr-3 `}>{`Fecha ${loan.status
						? 'ultimo :'
						: 'proximo'} pago `}</span>

					<span className={`text-${color}`}>{loan.nextpaymentDate}</span>
				</div>
				<div className=" m-info d-flex bg-none justify-content-between">
					<a href={`/loan/${loan._id}`} className="btn btn-outline-info">
						Detalle
					</a>

					<a href={`/newloan/${loan.client._id}`} className="btn btn-outline-info">
						Nuevo Prestamo
					</a>
				</div>
			</div>
		</Fragment>
	);
};
export default Loan;
