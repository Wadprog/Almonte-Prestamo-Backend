import React from "react";
import { Accordion, Card, Table, Row, Col } from "react-bootstrap";
import moment from "moment";
import NumberFormat from "react-number-format";

const DayDetails = ({ loans, payments, expenses, date, city }) => {
  const filteredAmountPaidPayments = payments.filter(payment => {
    if (
      payment.amountPaid != undefined &&
      payment.amountPaid != null &&
      payment.amountPaid &&
      payment.dateAmountPaid &&
      moment(date).isSame(payment.dateAmountPaid)
    ) {
      if (city == "Todas") return payment;
      else {
        const [loan] = loans.filter(loan => loan._id == payment.loan);
        if (loan.client.ciudad === city) return payment;
      }
    }
  });
  const filteredInterestPaidPayments = payments.filter(payment => {
    if (
      payment.interestPaid != undefined &&
      payment.interestPaid != null &&
      payment.interestPaid &&
      payment.dateInterestPaid &&
      moment(date).isSame(payment.dateInterestPaid)
    ) {
      if (city == "Todas") return payment;
      else {
        const [loan] = loans.filter(loan => loan._id == payment.loan);
        if (loan.client.ciudad === city) return payment;
      }
    }
  });
  const filteredExpenses = expenses.filter(
    expense =>
      expense.amount != undefined &&
      expense.amount != null &&
      expense.amount &&
      expense.date &&
      moment(date).isSame(expense.date)
  );
  const TotalAmountPaid = filteredAmountPaidPayments.reduce(
    (total, payment) => total + payment.amountPaid,
    0
  );

  const TotalInterestPaid = filteredInterestPaidPayments.reduce(
    (total, payment) =>
      payment.interestPaid > 0
        ? total + payment.interestPaid
        : total + payment.interestPaid * -1,
    0
  );
  const TotalExpenses = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  return (
    <div className='text-white w-100 p-3'>
      <h4>
        Datos para el dia <small> {date}</small> y Ciudad {city}
      </h4>

      <Accordion className='text-dark w-100'>
        <Card className=' w-100'>
          <Accordion.Toggle as={Card.Header} eventKey='0'>
            Total Pagos hechos {ThousandSeparator(TotalAmountPaid)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <h5 className='text-muted'> Los Pagos</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <td># Pago</td>
                    <td>Deudor</td>
                    <td>Deuda</td>
                    <td>Pago</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredAmountPaidPayments.map(payment => {
                    const loan = loans.filter(
                      loan => loan._id == payment.loan
                    )[0];
                    return (
                      <tr>
                        <td>{payment.quota}</td>
                        <td>{loan.client.name}</td>
                        <td>{ThousandSeparator(loan.amount)}</td>
                        <td>{ThousandSeparator(payment.amountPaid)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className=' w-100'>
          <Accordion.Toggle as={Card.Header} eventKey='1'>
            Total Gastos hechos:{ThousandSeparator(TotalExpenses)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <td>Cantidad</td>
                    <td>Descripcion</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map(expense => (
                    <tr>
                      <td>{ThousandSeparator(expense.amount)}</td>
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
            Total Reditos:{ThousandSeparator(TotalInterestPaid)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='2'>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <td># Pago</td>
                    <td>Deudor</td>
                    <td>Deuda</td>
                    <td>Pago</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredInterestPaidPayments.map(payment => {
                    const loan = loans.filter(
                      loan => loan._id == payment.loan
                    )[0];
                    return (
                      <tr>
                        <td>{payment.quota}</td>
                        <td>{loan.client.name}</td>
                        <td>{ThousandSeparator(loan.amount)}</td>
                        <td>
                          {ThousandSeparator(
                            parseFloat(payment.interestPaid) < 0
                              ? parseFloat(payment.interestPaid) * -1
                              : parseFloat(payment.interestPaid)
                          )}
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
                {ThousandSeparator(TotalAmountPaid + TotalInterestPaid)}{" "}
              </Col>
            </Row>

            <Row>
              <Col>Restante (pagos+ reditos- gastos): </Col>
              <Col>
                {ThousandSeparator(
                  TotalAmountPaid + TotalInterestPaid - TotalExpenses
                )}
                $RDS
              </Col>
            </Row>
          </Card.Header>
        </Card>
      </Accordion>
    </div>
  );
};

export default DayDetails;

const ThousandSeparator = amount => {
  return (
    <NumberFormat
      value={amount}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"RD$"}
    />
  );
};
