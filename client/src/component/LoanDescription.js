import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';

const Loan = ({
	loan,
	color = 'dark',
	bgColor = 'bg-white',
	noHistoryBtn = false,
	noPaymentBtn = false,
	noClientDetails = false
}) => {
	return (
		<Fragment>
			<div className={`${bgColor} rounded p-4`}>
				<div className="mb-2">
					<span className={`text-${loan.status ? 'success' : 'danger'}`}>
						{loan.status ? 'Pagado' : 'No Pagado'}
					</span>
				</div>

				<div className=" 2 d-flex justify-content-between mb-2 ">
					<h5 className={`text-${color} d-${noClientDetails && 'none'}`}>{`${loan.client.name} ${loan.client
						.apellido}`}</h5>

					<h5 className={`text-bold text-${loan.status ? 'success' : 'danger'}`}>
						<NumberFormat
							value={loan.amount}
							displayType={'text'}
							thousandSeparator={true}
							prefix={'RD$'}
						/>
					</h5>
				</div>

				<div className={`mb-2 d-${noClientDetails && 'none'}`}>
					<span className={`text-${color} mr-4 h6`}>Cedula :</span>
					<span className={`text-${color} mr-4`}>
						{loan.client.cedula.length == 11 ? (
							<NumberFormat value={loan.client.cedula} displayType={'text'} format="###-#######-#" />
						) : (
							<span>{loan.client.cedula}</span>
						)}
					</span>
				</div>
				<div className={`mb-2 d-${noClientDetails && 'none'}`}>
					<span className={`text-${color} mr-4 h6`}>Telefono :</span>

					<span className={`text-${color}`}>
						<NumberFormat value={loan.client.telefono} displayType={'text'} format="(###) ###-####" />
					</span>
				</div>
				<div className={`mb-2 d-${noClientDetails && 'none'}`}>
					<span className={`text-${color} mr-4 h6`}>Dirreccion :</span>
					<span className={`text-${color}`}>{loan.client.dirreccion}</span>
				</div>
				<div className={`mb-2 d-${noClientDetails && 'none'}`}>
					<span className={`text-${color} mr-4 h6`}>Ciudad :</span>
					<span className={`text-${color}`}>
						{loan.client.ciudad.charAt(0).toUpperCase() + loan.client.ciudad.slice(1)}
					</span>
				</div>
				<div className="mb-3">
					<span className={`text-${color} mr-3 h6 `}>{`Fecha ${loan.status
						? 'ultimo'
						: 'proximo'} pago :  `}</span>

					<span className={`text-${color}`}>{loan.nextpaymentDate}</span>
				</div>

				{loan.comment &&
				loan.comment !== '' && loan.comment!=null&& (
					<div className="mb-3">
						<span className={`text-${color} mr-3 h6 `}>{loan.comment}</span>
					</div>
				)}
	{loan.oldLoan &&
				loan.oldLoan !== null && (
					<div className="mb-3">
						<a 
						href={`/loan/${loan.oldLoan}`}
						className={`text-${color} mr-3 h6 `}>Ver anterior</a>
					</div>
				)}

				<div className=" m-info row ">
					<div className="col-sm-12 col-md-6 mb-2">
						<a
							href={`/loan/${loan._id}`}
							className={`btn btn-outline-info btn-block d-${noHistoryBtn && 'none'}`}
						>
							Historico
						</a>
					</div>
					<div className="col-sm-12 col-md-6">
						<a
							href={`/payment/${loan._id}`}
							className={`btn btn-outline-info btn-block d-${noPaymentBtn && 'none'}`}
						>
							Pagar
						</a>
					</div>

					<div className="col-sm-12 col-md-6 mb-2">
						<a
							href={`/renew/${loan._id}`}
							className={`btn btn-outline-info btn-block d-${(noPaymentBtn ||loan.oldLoan)&& 'none'}`}
						>
							Renovar
						</a>
					</div>

					<div className="col-sm-12 col-md-6 mb-2">
						<a
							href={`/cancel/${loan._id}`}
							className={`btn btn-outline-info btn-block d-${noPaymentBtn && 'none'}`}
						>
							Cancelar
						</a>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
export default Loan;
