// Exported as they are
export const Months = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Jullio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre'
];

export const gradientChartOptionsConfiguration = {
	maintainAspectRatio: true,
	legend: {
		display: false
	},
	tooltips: {
		bodySpacing: 4,
		mode: 'nearest',
		intersect: 0,
		position: 'nearest',
		xPadding: 12,
		yPadding: 10,
		caretPadding: 10
	},
	responsive: true,
	scales: {
		yAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.0)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					suggestedMin: 60,
					suggestedMax: 125,
					padding: 20,
					fontColor: '#9a9a9a'
				}
			}
		],
		xAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.1)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					padding: 20,
					fontColor: '#9a9a9a'
				}
			}
		]
	},
	layout: {
		padding: {
			left: 0,
			right: 0,
			top: 15,
			bottom: 15
		}
	}
};

export const datasetOptions = {
	fill: true,
	backgroundColor: 'transparent',
	borderColor: '#d346b1',
	borderWidth: 2,
	borderDash: [],
	borderDashOffset: 0.0,
	pointBackgroundColor: '#d346b1',
	pointBorderColor: 'rgba(255,255,255,0)',
	pointHoverBackgroundColor: '#d346b1',
	pointBorderWidth: 20,
	pointHoverRadius: 4,
	pointHoverBorderWidth: 15,
	pointRadius: 4
};
//calculated fields

export const montInObject = items => {
	let months = items.reduce(
		(unique, item) =>
			unique.includes(new Date(item.date).getMonth()) ? unique : [ ...unique, new Date(item.date).getMonth() ],
		[]
	);

	return months;
};

export const montInPayment = items => {
	let months = items.reduce(
		(unique, item) =>
			unique.includes(new Date(item.dateInterestPaid).getMonth())
				? unique
				: [ ...unique, new Date(item.dateAmountPaid).getMonth() ],
		[]
	);

	return months;
};

export const totalPerMonth = (items, months) => {
	const monthsname = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiempre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	];
	let itemInMonths = [];

	months.forEach(month => {
		let tempmonth = items.reduce(
			(allItems, item) => (new Date(item.date).getMonth() != month ? allItems : [ ...allItems, item ]),
			[]
		);
		itemInMonths.push({
			position: month,
			name: monthsname[month],
			total: tempmonth.reduce((total, loan) => total + loan.amount, 0)
		});
	});
	return itemInMonths;
};

export const PaymenttotalPerMonth = (items, months) => {
	const monthsname = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiempre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	];
	let itemInMonths = [];

	months.forEach(month => {
		let tempmonth = items.reduce(
			(allItems, item) =>
				new Date(item.dateInterestPaid).getMonth() != month ? allItems : [ ...allItems, item ],
			[]
		);
		itemInMonths.push({
			position: month,
			name: monthsname[month],
			total: tempmonth.reduce((total, element) => total + element.amountPaid + element.interestPaid, 0)
		});
	});
	return itemInMonths;
};

const revenuePerMonth = (loans, payments, gastos) => {
	var benefits = [];
	for (var i = 0; i < loans.length; i++) {
		var rev = 0;
		if (payments[i]) rev += payments[i];
		if (loans[i]) rev -= loans[i];
		if (gastos[i]) rev -= gastos[i];
		benefits.push(rev);
	}
	return benefits;
};
// not calculated
const dataByCity = (loans, payments, expenses) => {
	loans = loans.filter(loan => new Date(loan.date).getFullYear() == new Date().getFullYear());
	const loanMonthsTotal = totalPerMonth(loans, montInObject(loans));

	expenses = expenses.filter(expense => new Date(expense.date).getFullYear() == new Date().getFullYear());
	const expenseMonthsTotal = totalPerMonth(expenses, montInObject(expenses));

	payments = payments.filter(payment => payment.status != 'unpaid');
	const paymentMonthsTotal = PaymenttotalPerMonth(payments, montInPayment(payments));

	return [ loanMonthsTotal, expenseMonthsTotal, paymentMonthsTotal ];
};

const Graph1dataSet = (loans, payments, expenses) => {
	loans = loans.filter(loan => new Date(loan.date).getFullYear() == new Date().getFullYear());
	const loanMonthsTotal = totalPerMonth(loans, montInObject(loans));

	expenses = expenses.filter(expense => new Date(expense.date).getFullYear() == new Date().getFullYear());
	const expenseMonthsTotal = totalPerMonth(expenses, montInObject(expenses));

	payments = payments.filter(payment => payment.status != 'unpaid');
	const paymentMonthsTotal = PaymenttotalPerMonth(payments, montInPayment(payments));
const revenue=revenuePerMonth(loans,payments,expenses)
	return [ loanMonthsTotal, expenseMonthsTotal, paymentMonthsTotal,revenue];
};

export const dataPositionInObject = dataoB => {
	var data = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

	dataoB.forEach(ob => {
		data[ob.position] = ob.total;
	});

	return data;
};
export const GraphsDataSet = (loans, payments, expenses) => {
	var data = Graph1dataSet(loans, payments, expenses);
	var dataBc = dataByCity(loans, payments, expenses);
	return [ [ data[0], data[2], data[1], data[3] ], [ dataBc[0], dataBc[2], dataBc[1], data[3] ] ];
};

//Demo data
export const Cities = [ 'Santiago', 'Puerto Plata' ];

export const dataGraph1 = [
	[ 0, 0, 430, 550, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ 0, 0, 430, 700, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ 78, 480, 430, 330, 530, 100, 380, 100, 400, 500, 670, 340 ],
	[ 145, 480, 333, 330, 530, 100, 444, 100, 400, 500, 670, 340 ]
];
export const dataGraph2 = [ [ 100, 600 ], [ 689, 230 ], [ 78, 480 ], [ 145, 480 ] ];
