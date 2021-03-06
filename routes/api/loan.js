const express = require("express");
const router = express.Router();
const Loan = require("../../models/loan");
const Payment = require("../../models/payment");
const Plan = require("../../models/plan");
const moment = require("moment");

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Loan/
//@desc get all Loan route
//@desc access public temp
router.get("/", async (req, res) => {
  try {
    let loans = await Loan.find().populate(["client", "plan"]);
    res.json(loans);
  } catch (error) {
    console.log(`Get not complete task get all Loan`);
    res.json({ msg: "Server error ${error}" });
  }
});
//@routes get api/Loan/:id
//@desc Get  a  Loan by id route
//@desc access public temp

router.get("/:id", async (req, res) => {
  try {
    let loan = await Loan.findById(req.params.id).populate(["plan", "client"]);
    if (!loan) res.status(404).json({ msg: "This loan does not exist" });
    res.json(loan);
  } catch (error) {
    console.log(`Could not get this loan ${req.params.id}`);
    res.json({ msg: "Server error ${error}" });
  }
});
//@routes post api/Loan/
//@desc Create new  Loan route
//@desc access public temp
router.post("/", async (req, res) => {
  const { amount } = req.body;
  try {
    let plan = await Plan.findById(req.body.plan);
    if (!plan)
      return res
        .status(404)
        .json({ msg: `Este plan ${req.body.plan} no existe` });

    const { interval, steps, interest } = plan;

    var amountPerQuota = Math.round((req.body.amount * interest) / 100);

    var interestPerQuota = Math.round(
      (amountPerQuota * steps - req.body.amount) / steps
    );

    /*

    var totalInterest = (req.body.amount * interest) / 100;
    var amountToPay = parseInt(amount) + parseInt(totalInterest);
    var amountPerQuota = Math.round(amountToPay / steps);

    var interestPerQuota = Math.round(totalInterest / steps);*/

    var date = moment(req.body.date).format("l") || null;
    if (!req.body.date) date == moment();
    const nextpaymentDate = nextPayment(date, plan.interval, 0);
    let loan = new Loan({
      ...req.body,
      amountPerQuota,
      interestPerQuota,
      nextpaymentDate,
      date: moment(date).format("l"),
    });
    loan = await loan.save();
    // creating all payments needed
    //  let payments = []
    for (var step = 1; step < steps + 1; step++) {
      var newdate = moment(loan.date)
        .add(step * interval, "days")
        .format("l");
      let payment = new Payment({
        loan: loan.id,
        dateToPay: newdate,
        quota: step,
      });
      await payment.save();
      //  payments.push(Payment)
    }

    return res.json({ loan });
  } catch (error) {
    console.log(`Error creating new loan`);
    res.json({ msg: `Server error ${error}` });
  }
});

//@routes post api/Loan/due/:id
//@desc Create new  Loan route
//@desc access public temp
router.post("/due/:id", async (req, res) => {
  try {
    let loan_ = await Loan.findById(req.params.id).populate("plan");
    if (!loan_) return res.status(404).json({ msg: "Prestamo no existe" });
    if (loan_.status)
      return res.status(400).json({ msg: `Pago rechazado prestamo pagado` });

    let payment = await Payment.findOne({
      loan: req.params.id,
      dateToPay: loan_.nextpaymentDate,
    });
    if (!payment) return res.status(404).json({ msg: "Registro Pagos Vacio" });

    var date = null;
    if (req.body.date) date = moment(req.body.date).format("l");

    if (
      req.body.interest &&
      req.body.interest != "" &&
      req.body.interest !== 0
    ) {
      payment.interestPaid =
        req.body.interest <= loan_.interestPerQuota
          ? req.body.interest
          : loan_.interestPerQuota;
      payment.dateInterestPaid = date || moment().format("l");
      payment.status = "Mora pagada";
    }

    if (req.body.amount && req.body.amount != "" && req.body.amount !== 0) {
      payment.amountPaid = req.body.amount;
      payment.dateAmountPaid = date || moment().format("l");
      payment.status = "Pagado";

      loan_.quota += 1;
      loan_.nextpaymentDate = nextPayment(
        moment(loan_.date),
        loan_.plan.interval,
        loan_.quota
      );
    }
    payment.comment = req.body.comment || "";

    if (req.body.amount > loan_.amountPerQuota) {
      var dif = req.body.amount - loan_.amountPerQuota;
      payment.comment += `pago  ${dif}  mas`;
    }

    payment.quota = loan_.quota;
    if (loan_.quota == loan_.plan.steps) loan_.status = true;
    loan_ = await loan_.save();
    payment = await payment.save();
    return res.json({ loan_, payment });
  } catch (error) {
    console.log(`server error ${error}`);
    return res.status(500).json({ msg: "server error" + error.message });
  }
});

//@routes post api/Loan/due/:id
//@desc Create new  Loan route
//@desc access public temp

router.post("/renew/:id", async (req, res) => {
  try {
    console.log("more info" + req.body);
    let loan_ = await Loan.findById(req.params.id).populate("plan");
    if (!loan_) return res.status(404).json({ msg: "Prestamo no existe" });

    const { _id, interval, steps, interest } = loan_.plan;
    //Cheking if we can renew
    if (loan_.quota == 0 || (loan_.quota / steps) * 100 < 51)
      return res.status(404).json({ msg: "Rechazado No hay suficiente pagos" });
    console.log("here bayby ");
    const { amount } = req.body;
    const debt = loan_.amountPerQuota * (steps - loan_.quota);
    if (debt > amount)
      return res.status(404).json({
        msg: `Rechazado solicito menos que su deuda la deuda es ${debt}`,
      });
    cancelLoan(loan_, "Prestamo Cancelado");

    //Calculating new values

    const newLoanAmount = amount;
    var amountPerQuota = Math.round((newLoanAmount * interest) / 100);
    var interestPerQuota = Math.round(
      (amountPerQuota * steps - newLoanAmount) / steps
    );

    // Getting date
    var date = moment(req.body.date).format("l") || null;
    if (!req.body.date) date == moment();
    const nextpaymentDate = nextPayment(date, interval, 0);

    //Creating the loan
    let newLoan = new Loan({
      plan: _id,
      client: loan_.client,
      amount: newLoanAmount,
      amountPerQuota,
      interestPerQuota,
      nextpaymentDate,
      date: moment(date).format("l"),
      oldLoan: loan_._id,
      comment: `Prestamo renovado Deuda es RD$ ${debt} `,
    });
    console.log("here is the value" + loan_.client);
    newLoan = await newLoan.save();

    // creating all payments needed
    //createPayments(newLoan._id, { steps, interval });
    for (var step = 1; step < steps + 1; step++) {
      var newdate = moment(newLoan.date)
        .add(step * interval, "days")
        .format("l");
      let payment = new Payment({
        loan: newLoan.id,
        dateToPay: newdate,
        quota: step,
      });
      await payment.save();
      //  payments.push(Payment)
    }

    return res.json({ newLoan });
  } catch (error) {
    console.log(`server error ${error}`);
    return res.status(500).json({ msg: "server error" + error.message });
  }
});

router.post("/cancel/:id", async (req, res) => {
  console.log("WILL CANCEL ");
  try {
    let loan_ = await Loan.findById(req.params.id);
    if (!loan_) return res.status(404).json({ msg: "Prestamo no existe" });
    let payments = await Payment.findOne({
      loan: req.params.id,
      status: "Pagado",
    });
    if (payments === null) {
      console.log("Never paid  ");
      await Loan.findByIdAndDelete(loan_._id);
      console.log("Deleted never pay  ");
      return res.json({ msg: "Cancelado con exito" });
    } else {
      console.log("Her paid L ");
      loan_ = cancelLoan(loan_, "Prestamo Cancelado sin renovar");
      console.log("cancel  paid L ");
      return res.json({ msg: "Cancelado con exito" });
    }
  } catch (error) {
    console.log(`server error ${error}`);
    return res.status(500).json({ _loan });
  }
});

//@routes post api/Loan/due/:id
//@desc Create new  Loan route
//@desc access public temp

router.get("/get/routine/", async (req, res) => {
  try {
    let loans = await Loan.find({ status: false }).populate(["client"]);
    let payments = await Payment.find({ status: { $ne: "unpaid" } });
    // console.log(`Before filter ${loans.length}`);

    async function addpay(loan) {
      let payments = await Payment.find({ loan: loan._id });
      return payments;
    }
    const tempL = [];
    loans.forEach(loan => {
      let nextpaymentDate = moment(loan.nextpaymentDate);
      let now = moment();
      if (nextpaymentDate.isSameOrBefore(now)) {
        /*console.log(
          `here is the next pay ${nextpaymentDate} and we are ${now}`        );*/

        tempL.push(loan);
      }
    });

    loans = tempL;

    const cities = loans.reduce(
      (unique, loan) =>
        unique.includes(loan.client.ciudad)
          ? unique
          : [...unique, loan.client.ciudad],
      []
    );
    let response = [];
    cities.forEach(city => {
      let tempCity = loans.reduce(
        (allLoans, loan) =>
          loan.client.ciudad != city ? allLoans : [...allLoans, loan],
        []
      );
      response.push({ city: tempCity });
    });

    res.json({ count: loans.length, cities, response, payments });
  } catch (error) {
    console.log(`Get not complete task get all Loan`);
    res.json({ msg: `Server error ${error}` });
  }
});

router.get("/client/:id", async (req, res) => {
  try {
    const loans = await Loan.find({ client: req.params.id }).populate("plan");
    if (!loans)
      return res.status(404).json({ msg: `Error loan por el cliente` });

    return res.json(loans);
  } catch (error) {
    return res.status(500).json({ msg: `Server error ${error}` });
  }
});

router.post("/lastpay/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment)
      return res.status(404).json({ msg: `No hay registro de ese pago` });

    const loan = await Loan.findById(payment.loan).populate("plan");
    if (!loan)
      return res.status(404).json({ msg: "Payment reset loan not found " });
    if (
      loan.comment === "Prestamo Cancelado sin renovar" ||
      loan.comment === "Prestamo Cancelado"
    )
      return res
        .status(401)
        .json({ msg: "no se puede cancelar pago a un prestamo cancelado" });
    if (payment.amountPaid > 0) {
      loan.quota -= 1;
      const newpayday = moment(loan.nextpaymentDate)
        .subtract(loan.plan.interval, "days")
        .format("l");
      console.log(newpayday);
      loan.nextpaymentDate = newpayday;
    }

    if (loan.status) loan.status = false;
    await loan.save();
    payment.status = "unpaid";
    payment.interestPaid = null;
    payment.amountPaid = null;
    payment.comment = "Canceledo despues de pagar";
    payment.dateAmountPaid = null;
    payment.dateInterestPaid = null;
    await payment.save();
    return res.json(loan);
  } catch (error) {
    return res.status(500).json({ msg: `Server error ${error}` });
  }
});

const nextPayment = (date, interval, quota) => {
  return moment(date)
    .add(interval * (quota + 1), "days")
    .format("l");
};

const cancelLoan = async (cloan, msg) => {
  cloan.comment = msg;
  cloan.status = true;
  cloan = await cloan.save();
  return cloan;
};

const createPayments = async (id, { steps, interval }) => {
  for (var step = 1; step < steps + 1; step++) {
    var newdate = moment(newLoan.date)
      .add(step * interval, "days")
      .format("l");
    let payment = new Payment({
      loan: id,
      dateToPay: newdate,
      quota: step,
    });
    await payment.save();
  }
};
module.exports = router;
