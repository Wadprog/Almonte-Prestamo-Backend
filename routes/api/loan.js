const express = require('express')
const router = express.Router()
const Loan = require('../../models/loan')
const Payment = require('../../models/payment')
const Plan = require('../../models/plan')
const moment = require('moment')

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Loan/
//@desc get all Loan route
//@desc access public temp
router.get('/', async (req, res) => {
  try {
    let loans = await Loan.find()
    res.json(loans)
  } catch (error) {
    console.log(`Get not complete task get all Loan`)
    res.json({ msg: 'Server error ${error}' })
  }
})
//@routes get api/Loan/:id
//@desc Get  a  Loan by id route
//@desc access public temp

router.get('/:id', async (req, res) => {
  try {
    let loan = await Loan.findById(req.params.id).populate(['plan', 'client'])
    if (!loan) res.status(404).json({ msg: 'This loan does not exist' })
    res.json(loan)
  } catch (error) {
    console.log(`Could not get this loan ${req.params.id}`)
    res.json({ msg: 'Server error ${error}' })
  }
})
//@routes post api/Loan/
//@desc Create new  Loan route
//@desc access public temp
router.post('/', async (req, res) => {
  const { amount } = req.body
  try {
    let plan = await Plan.findById(req.body.plan)
    if (!plan)
      return res
        .status(404)
        .json({ msg: `Este plan ${req.body.plan} no existe` })

    const { interval, steps, interest } = plan
    var amountPerQuota = Math.round((req.body.amount * interest) / 100)
    console.log(amountPerQuota)
    var interestPerQuota = Math.round(
      (amountPerQuota * steps - req.body.amount) / steps
    )
    let loan = new Loan({
      ...req.body,
      amountPerQuota,
      interestPerQuota
    })
    loan = await loan.save()

    for (var step = 1; step < steps + 1; step++) {
      var newdate = moment(loan.date).add(step * interval, 'days')
      let payment = new Payment({
        loan: loan.id,
        dateToPay: newdate,
        quota: step
      })
      await payment.save()
    }
    return res.json({ loan })
  } catch (error) {
    console.log(`Error creating new loan`)
    res.json({ msg: `Server error ${error}` })
  }
})

//@routes post api/Loan/due/:id
//@desc Create new  Loan route
//@desc access public temp
router.post('/due/:id', async (req, res) => {
  try {
    let loan_ = await Loan.findById(req.params.id)
    if (!loan_) return res.status(404).json({ msg: 'Prestamo no existe' })
    if (loan_.status)
      return res.status(400).json({ msg: `Payment rejected loan paid` })
    let payment = await Payment.findOne({
      loan: req.params.id,
      dateToPay: loan_.nextpaymentDate
    })
    if (!payment) return res.status(404).json({ msg: 'Pagos Vacio' })

    var temp = {}
    var date = null
    if (req.body.date) date = req.body.date

    if (req.body.interest) {
      payment.interestPaid = req.body.interest
      payment.dateInterestPaid = date || new Date.now()
      payment.status =
        req.body.interest == payment.interestToPay
          ? 'interest partial'
          : ' interest paid'
    }
    if (req.body.amount) {
      payment.amountPaid = req.body.amount
      payment.dateAmountPaid = date || new Date.now()
      payment.status =
        req.body.amount == payment.amountToPay
          ? 'amount paid'
          : 'amount partial'
    }
    if (
      payment.amountPaid == payment.amountToPay &&
      payment.interestPaid == payment.interestToPay
    )
      payment.status = 'paid'
    loan_.quota += 1
    payment.quota = loan_.quota
    loan_.nextpaymentDate = nextPayment(loan_.date, loan_.plan, loan_.quota)
    loan_ = await loan_.save()
    payment = await payment.save()
    return res.json({ loan_, payment })
  } catch (error) {
    console.log(`server error ${error}`)
    return res.status(500).json({ msg: 'server error' + error.message })
  }
})

//@routes post api/Loan/due/:id
//@desc Create new  Loan route
//@desc access public temp

router.get('/get/routine/', async (req, res) => {
  try {
    let loans = await Loan.find({ estadoPago: false }).populate([
      'client',
      'plan'
    ])

    /*const loanWitnNopayment = [];
		loans.forEach(loan => {
			if (loan.pagos.length == 0) {
				let loanDate = new Date(loan.fecha, 'DD/MM/YYYY');
				let currentDate = (Date.now();
				if (currentDate.diff(loanDate, 'days') >= 1) loanWitnNopayment.push(loan);
			}
		});*/

    /*limitdate= new Date()+15;
	
		const tempL = loans.map(loan => {
			if (loan.pagos.length > 0) {
			
				if (Date(loan.pagos[loan.pagos.length - 1].fecha) > limitdate) {
		
					return loan;
				}
			} else {
		
				return loan;
			}
		});

		loans = tempL;
*/
    const cities = loans.reduce(
      (unique, loan) =>
        unique.includes(loan.client.ciudad)
          ? unique
          : [...unique, loan.client.ciudad],
      []
    )
    let response = []
    cities.forEach(city => {
      let tempCity = loans.reduce(
        (allLoans, loan) =>
          loan.client.ciudad != city ? allLoans : [...allLoans, loan],
        []
      )
      response.push({ city: tempCity })
    })

    res.json({ response })
  } catch (error) {
    console.log(`Get not complete task get all Loan`)
    res.json({ msg: `Server error ${error}` })
  }
})

router.get('/client/:id', async (req, res) => {
  try {
    let loans = await Loan.find({ client: req.params.id }).populate('plan')
    res.json(loans)
  } catch (error) {
    console.log(`Get not complete task get all Loan`)
    res.json({ msg: `Server error ${error}` })
  }
})

const nextPayment = (fecha, plan, cuota) => {
  const { intervalo } = plan
  var date = moment(fecha)
  return date.add(intervalo * (cuota + 1), 'days')
}

const createPayments = (fecha, amount, plan, id) => {
  return async (req, res) => {
    const { interval, steps, interest } = plan
    for (var step = 1; step < steps + 1; step++) {
      var newdate = moment(fecha).add(step * interval, 'days')
      var amountToPay = (amount * interest) / 100
      var interestToPay = amountToPay * steps - amount
      var payment = new Payment({
        loan: id,
        dateToPay: newdate,
        quota: step - 1,
        amountToPay: amountToPay,
        interestToPay: interestToPay
      })
      await payment.save()
    }
  }
}
module.exports = router
