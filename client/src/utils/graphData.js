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

export const commonOptions = {
	fill: true,
	lineTension: 0.3,
	borderCapStyle: 'butt',
	borderDash: [],
	borderDashOffset: 0.0,
	borderJoinStyle: 'miter',
	pointBorderWidth: 10,
	pointHoverRadius: 5,
	pointHoverBorderWidth: 2,
	pointRadius: 1,
	pointHitRadius: 10
};

export const montInObject = items => {
	let months = items.reduce(
		(unique, item) =>
			unique.includes(new Date(item.date).getMonth()) ? unique : [ ...unique, new Date(item.date).getMonth() ],
		[]
	);
	console.log(months);
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
	console.log(months);
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

export const createDataSet = (loans, payments, expenses) => {
	var data = temp(loans, payments, expenses);
	return [
		{
			...commonOptions,
			label: 'Prestamos',
			backgroundColor: 'rgba(66, 89, 89, .4)',
			borderColor: 'rgb(66, 89, 89)',
			pointBackgroundColor: 'rgb(98, 66, 89)',
			pointHoverBackgroundColor: 'rgb(0, 0, 0)',
			pointHoverBorderColor: 'rgba(48, 89, 66,1)',
			data: dataPositionInObject(data[0])
		},
		{
...commonOptions,
			label: 'Pagos',
			backgroundColor: 'rgba(184, 185, 210, .3)',
			borderColor: 'rgb(35, 26, 136)',
			pointBorderColor: 'rgb(35, 26, 136)',
			pointBackgroundColor: 'rgb(255, 255, 255)',
			pointHoverBackgroundColor: 'rgb(0, 0, 0)',
			data: dataPositionInObject(data[1])

		},
		{

			...commonOptions,
			label: 'Gastos',
			backgroundColor: 'rgba(47, 69, 89, .2)',
			borderColor: 'rgb(89, 269, 48)',
			pointBorderColor: 'rgb(35, 26, 136)',
			pointBackgroundColor: 'rgb(255, 255, 255)',
			pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
			data: dataPositionInObject(data[2])
		}
	];
};
export const temp = (loans, payments, expenses) => {
	 loans = loans.filter(loan => new Date(loan.date).getFullYear() == new Date().getFullYear());
	const loanMonthsTotal = totalPerMonth(loans, montInObject(loans));

	 expenses = expenses.filter(expense => new Date(expense.date).getFullYear() == new Date().getFullYear());
	const expenseMonthsTotal = totalPerMonth(expenses, montInObject(expenses));

	 payments = payments.filter(payment => payment.status != 'unpaid');
	const paymentMonthsTotal = PaymenttotalPerMonth(payments, montInPayment(payments));

	return [ loanMonthsTotal, expenseMonthsTotal, paymentMonthsTotal ];
};

export const dataPositionInObject = dataoB => {
	var data = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

	dataoB.forEach(ob => {
		data[ob.position] = ob.total;
		console.log('position is ' + ob.position);
	});

	return data;
};
