const express = require('express');
const router = express.Router();
const Payment = require('../../models/payment');
const Loan = require('../../models/loan');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

const montInObject = items => {
	let months = items.reduce(
		(unique, item) =>
			unique.includes(new Date(item.date).getMonth()) ? unique : [ ...unique, new Date(item.date).getMonth() ],
		[]
	);
	console.log(months);
	return months;
};

const montInPayment = items => {
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

const totalPerMonth = (items, months) => {
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
			[monthsname[month]]: tempmonth.reduce((total, loan) => total + loan.amount, 0)
		});
	});
	return itemInMonths;
};

const PaymenttotalPerMonth = (items, months) => {
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
			(allItems, item) => (new Date(item.dateInterestPaid).getMonth() != month ? allItems : [ ...allItems, item ]),
			[]
		);
		itemInMonths.push({
			[monthsname[month]]: tempmonth.reduce(
				(total, element) => total + element.amountPaid + element.interestPaid,
				0
			)
		});
	});
	return itemInMonths;
};

//@routes get api/statistic/
//@desc get statstic for all loasn
//@desc access public temp
router.get('/', async (req, res) => {
	try {
		let loans = await Loan.find();
		loans= loans.filter(loan=> new Date(loan.date).getFullYear()== new Date().getFullYear()); 
		const loanMonthsTotal = totalPerMonth(loans, montInObject(loans));
		let payments = await Payment.find();
		payments = payments.filter(payment => payment.status != 'unpaid');
		const paymentMonthsTotal = PaymenttotalPerMonth(payments, montInPayment(payments));

		res.json({ loanMonthsTotal, paymentMonthsTotal });
	} catch (error) {
		console.log(`Get not complete task get statistic`);
		res.status(400).json({ msg: `Server error ${error}` });
	}
});

module.exports = router;
