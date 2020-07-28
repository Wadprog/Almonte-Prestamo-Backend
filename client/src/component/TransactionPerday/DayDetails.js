import React from "react";
import { Accordion, Card, Table, Row, Col } from "react-bootstrap";
import moment from "moment";

const DayDetails = ({ loans, payments, expenses, date }) => {
  const filteredAmountPaidPayments = payments.filter(
    payment =>
      payment.amountPaid != undefined &&
      payment.amountPaid != null &&
      payment.amountPaid &&
      payment.dateAmountPaid &&
      moment(date).isSame(payment.dateAmountPaid)
  );
  const filteredInterestPaidPayments = payments.filter(
    payment =>
      payment.interestPaid != undefined &&
      payment.interestPaid != null &&
      payment.interestPaid &&
      payment.dateInterestPaid &&
      moment(date).isSame(payment.dateInterestPaid)
  );
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
    <div className='text-white'>
      <h4>
        Datos para el dia <small> {date}</small>{" "}
      </h4>

      <Accordion className='text-dark'>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='0'>
            Total Pagos hechos{TotalAmountPaid}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <h5 className='text-muted'> Los Pagos</h5>
              <Table striped bordered hover>
                <tdead>
                  <tr>
                    <td># Pago</td>
                    <td>Deudor</td>
                    <td>Deuda</td>
                    <td>Pago</td>
                  </tr>
                </tdead>
                <tbody>
                  {filteredAmountPaidPayments.map(payment => {
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
            Total Gastos hechos:{TotalExpenses}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body>
              <Table striped bordered hover>
                <tdead>
                  <tr>
                    <td>Cantidad</td>
                    <td>Descripcion</td>
                  </tr>
                </tdead>
                <tbody>
                  {filteredExpenses.map(expense => (
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
            Total Reditos:{TotalInterestPaid}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='2'>
            <Card.Body>
              <Table striped bordered hover>
                <tdead>
                  <tr>
                    <td># Pago</td>
                    <td>Deudor</td>
                    <td>Deuda</td>
                    <td>Pago</td>
                  </tr>
                </tdead>
                <tbody>
                  {filteredInterestPaidPayments.map(payment => {
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
              <Col>{TotalAmountPaid + TotalInterestPaid} $RDS</Col>
            </Row>

            <Row>
              <Col>Restante (pagos+ reditos- gastos): </Col>
              <Col>
                {TotalAmountPaid + TotalInterestPaid - TotalExpenses}
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
