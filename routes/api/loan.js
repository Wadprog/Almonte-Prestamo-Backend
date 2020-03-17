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
    var date = req.body.date || moment()
    const nextpaymentDate = nextPayment(date, plan.interval, 0)
    let loan = new Loan({
      ...req.body,
      amountPerQuota,
      interestPerQuota,
      nextpaymentDate,
      date: moment(date).format('l')
    })
    loan = await loan.save()
    // creating all payments needed
  //  let payments = []
    for (var step = 1; step < steps + 1; step++) {
      var newdate = moment(loan.date)
        .add(step * interval, 'days')
        .format('l')
      let payment = new Payment({
        loan: loan.id,
        dateToPay: newdate,
        quota: step
      })
      await payment.save()
    //  payments.push(Payment)
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
    let loan_ = await Loan.findById(req.params.id).populate('plan')
    if (!loan_) return res.status(404).json({ msg: 'Prestamo no existe' })
    if (loan_.status)
      return res.status(400).json({ msg: `Pago rechazado prestamo pagado` })

    let payment = await Payment.findOne({
      loan: req.params.id,
      dateToPay: loan_.nextpaymentDate
    })
    if (!payment) return res.status(404).json({ msg: 'Pagos Vacio' })

    var date = null
    if (req.body.date) date = moment(req.body.date).format('l')

    if (req.body.interest) {
      payment.interestPaid =
        req.body.interest <= loan_.interestPerQuota
          ? req.body.interest
          : loan_.interestPerQuota
      payment.dateInterestPaid = date || moment().format('l')
      payment.status =
        req.body.interest == payment.interestToPay
          ? 'interest partial'
          : ' interest paid'
    }
    if (req.body.amount) {
      payment.amountPaid =
        req.body.amount <= loan_.amountPerQuota
          ? req.body.amount
          : loan_.amountPerQuota
      payment.dateAmountPaid = date || moment().format('l')
      payment.status =
        req.body.amount == payment.amountToPay
          ? 'amount paid'
          : 'amount partial'

      loan_.quota += 1
      loan_.nextpaymentDate = nextPayment(
        moment(loan_.date),
        loan_.plan.interval,
        loan_.quota
      )
    }
    payment.comment = req.body.comment || ''

    if (req.body.amount > loan_.amountPerQuota) {
      console.log('Paid too much take care of this ')
      var dif = req.body.amount - loan_.amountPerQuota
      payment.comment += `pago  ${dif}  mas`
    }

    if (
      payment.amountPaid == loan_.amountPerQuota &&
      payment.interestPaid == loan_.interestPerQuota
    )
      payment.status = 'paid'

    payment.quota = loan_.quota
    if (loan_.quota == loan_.plan.steps) loan_.status = true
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
    let loans = await Loan.find({ status: false }).populate(['client', 'plan'])

    console.log(`Before filter ${loans.length}`)

    const tempL = []
    loans.forEach(loan => {
      let nextpaymentDate = moment(loan.nextpaymentDate)
      let now = moment()
      if (nextpaymentDate.isSameOrBefore(now)) {
        console.log(`here is the next pay ${nextpaymentDate} and we are ${now}`)
        tempL.push(loan)
      }
    })

    loans = tempL
    console.log(` After filter ${loans.length}`)

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

    res.json({ count: loans.length, cities, response })
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

const nextPayment = (date, interval, quota) => {
  return moment(date)
    .add(interval * (quota + 1), 'days')
    .format('l')
}

module.exports = router
