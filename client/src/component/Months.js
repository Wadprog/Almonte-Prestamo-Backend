import React, { useState } from "react";
import { allMonths } from "../utils/month";
import { Accordion, Card, Table, Row, Col } from "react-bootstrap";

import moment from "moment";
export const Months = ({ payments, loans, expenses }) => {
  const [selectedYear, setSelectedYear] = useState(moment().year());
  let months = allMonths(selectedYear);
  months.shift();
  const [selected, setselected] = useState(moment().month() + 1);
  const [maxDays, setMaxDays] = useState(31);

  const [selectedDay, setselectedDay] = useState(
    parseInt(moment().date())
  );

  const handleSelect = number => {
    setselected(number);
    setMaxDays(parseInt(months[number].days));
  };
  const handleSelectYear = ({ target: { value } }) => {
    setSelectedYear(value);
  };
  const handleSelectDay = number => {
    setselectedDay(number);
  };
  let days = [];
  for (var i = 1; i < maxDays + 1; i++) {
    days.push(
      <div className='col-sm-2'>
        <D
          key={i}
          number={i}
          selected={selectedDay}
          handleSelect={handleSelectDay}
        />
      </div>
    );
  }
  return (
    <div className=' container p-5'>
      <div className='row bg-secondary p-5' style={{ overflowX: "scroll" }}>
        <div className='row'>
          <div className='ml-auto'>
            <input
              type='text'
              value={selectedYear}
              onChange={handleSelectYear}
            />
          </div>
        </div>
        <div className='row'>
          {months.map(month => (
            <div className='col-sm-4'>
              <M {...month} selected={selected} handleSelect={handleSelect} />
            </div>
          ))}
        </div>
      </div>

      <div className='row p-5 mt-0' style={{ backgroundColor: "#F8F8F8" }}>
        {days}
      </div>

      <div>
        <DayDetails
          date={`${selected}/${selectedDay}/${selectedYear}`}
          loans={loans}
          payments={payments}
          expenses={expenses}
        />
      </div>
    </div>
  );
};

export default Months;

const M = ({ name, handleSelect, number, selected }) => {
  return (
    <div
      onClick={() => {
        handleSelect(number);
      }}
      className={` Month text-center text-${
        selected == number ? "success" : "white"
      }  mr-5 h4`}
    >
      <div className={` p-2 bg-${selected == number && "white"}  `}>{name}</div>
    </div>
  );
};

const D = ({ handleSelect, number, selected }) => {
  return (
    <div
      className='Day'
      onClick={() => {
        handleSelect(number);
      }}
      className={`  nav-item mr-5 h4`}
    >
      <div
        className={`Day-container bg-${
          selected == number ? "success text-white" : "white text-dark"
        }`}
      >
        {number}
      </div>
    </div>
  );
};

const DayDetails = ({ loans, payments, expenses, date }) => {
  return (
    <div className='text-white'>
      <h4>
        Datos para el dia <small> {date}</small>{" "}
      </h4>

      <Accordion className='text-dark'>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='0'>
            Total Pagos hechos{" "}
            {payments.reduce(function (total, payment, idx) {
              if (
                payment.amountPaid != undefined &&
                payment.amountPaid != null &&
                moment(date).isSame(payment.dateAmountPaid)
              ) {
                console.log(payment.amountPaid, payment._id, idx);
                return total + payment.amountPaid;
              } else return 0;
            }, 0)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <h5 className='text-muted'> Los Pagos</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th># Pago</th>
                    <th>Deudor</th>
                    <th>Deuda</th>
                    <th>Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {payments
                    .filter(function (payment) {
                      if (
                        payment.amountPaid != undefined &&
                        payment.amountPaid != null &&
                        moment(date).isSame(payment.dateAmountPaid)
                      )
                        return payment;
                    })
                    .map(payment => {
                      const loan = loans.filter(
                        loan => loan._id == payment.loan
                      )[0];
                      return (
                        <tr>
                          <td>{payment.quota}</td>
                          <td>{loan.client.name}</td>
                          <td>{loan.amount}</td>
                          <td>{payment.amountPaid}.00 S$RDS</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='1'>
            Total Gastos hechos:{" "}
            {expenses.reduce(function (total, expense, idx) {
              console.log(expense);
              if (
                expense.amount != undefined &&
                expense.amount != null &&
                moment(date).isSame(expense.date)
              ) {
                var exp = parseFloat(expense.amount);
                if (exp < 0) exp *= -1;
                return total + exp;
              } else return 0;
            }, 0)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Descripcion</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(expense => (
                    <tr>
                      <td>{expense.amount}.00 $RDS</td>
                      <td>{expense.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='2'>
            Total Reditos:{" "}
            {payments.reduce(function (total, payment, idx) {
              if (
                payment.interestPaid != undefined &&
                payment.interestPaid != null &&
                moment(date).isSame(payment.dateInterestPaid)
              ) {
                var interest = parseFloat(payment.interestPaid);
                if (interest < 0) interest *= -1;
                return total + interest;
              } else return 0;
            }, 0)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='2'>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th># Pago</th>
                    <th>Deudor</th>
                    <th>Deuda</th>
                    <th>Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {payments
                    .filter(function (payment) {
                      if (
                        payment.interestPaid != undefined &&
                        payment.interestPaid != null &&
                        moment(date).isSame(payment.dateInterestPaid)
                      )
                        return payment;
                    })
                    .map(payment => {
                      const loan = loans.filter(
                        loan => loan._id == payment.loan
                      )[0];
                      return (
                        <tr>
                          <td>{payment.quota}</td>
                          <td>{loan.client.name}</td>
                          <td>{loan.amount}</td>
                          <td>
                            {parseFloat(payment.interestPaid) < 0
                              ? parseFloat(payment.interestPaid) * -1
                              : parseFloat(payment.interestPaid)}
                            .00 S$RDS
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Row>
              <Col>Total Pagos Y Reditos: </Col>
              <Col>
                {payments.reduce(function (total, payment, idx) {
                  if (
                    payment.interestPaid != undefined &&
                    payment.interestPaid != null &&
                    moment(date).isSame(payment.dateInterestPaid)
                  ) {
                    var interest = parseFloat(payment.interestPaid);
                    if (interest < 0) interest *= -1;
                    return total + interest;
                  } else return 0;
                }, 0) +
                  payments.reduce(function (total, payment, idx) {
                    if (
                      payment.amountPaid != undefined &&
                      payment.amountPaid != null &&
                      moment(date).isSame(payment.dateAmountPaid)
                    ) {
                      console.log(payment.amountPaid, payment._id, idx);
                      return total + payment.amountPaid;
                    } else return 0;
                  }, 0)}
              </Col>
            </Row>

            <Row>
              <Col>Restante (pagos+ reditos- gastos): </Col>
              <Col>
                {payments.reduce(function (total, payment, idx) {
                  if (
                    payment.interestPaid != undefined &&
                    payment.interestPaid != null &&
                    moment(date).isSame(payment.dateInterestPaid)
                  ) {
                    var interest = parseFloat(payment.interestPaid);
                    if (interest < 0) interest *= -1;
                    return total + interest;
                  } else return 0;
                }, 0) +
                  payments.reduce(function (total, payment, idx) {
                    if (
                      payment.amountPaid != undefined &&
                      payment.amountPaid != null &&
                      moment(date).isSame(payment.dateAmountPaid)
                    ) {
                      console.log(payment.amountPaid, payment._id, idx);
                      return total + payment.amountPaid;
                    } else return 0;
                  }, 0) -
                  expenses.reduce(function (total, expense, idx) {
                    console.log(expense);
                    if (
                      expense.amount != undefined &&
                      expense.amount != null &&
                      moment(date).isSame(expense.date)
                    ) {
                      var exp = parseFloat(expense.amount);
                      if (exp < 0) exp *= -1;
                      return total + exp;
                    } else return 0;
                  }, 0)}
                $RDS
              </Col>
            </Row>
          </Card.Header>
        </Card>
      </Accordion>
    </div>
  );
};
