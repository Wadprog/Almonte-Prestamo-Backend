import React from "react";
import NumberFormat from "react-number-format";

const CitiesSummary = ({ loans, payments, expenses, cities }) => {
  const citIesData = cities.map(city => {
    const CityLoans = LoanByCity(loans, city.name);
    return {
      name: city.name,
      loansAmount: CityLoans.length,
      canceledLoansAmount: CityLoans.filter(loan => {
        if (loan.status)
          if (loan.comment) if (loan.comment.includes("Cancelado")) return loan;
      }).length,
      paidLoansAmount: LoanByCity(loans, city.name).filter(loan => {
        if (loan.status) {
          if (!loan.comment) return loan;
          else {
            if (loan.comment.indexOf("Cancelado") === -1) return loan;
          }
        }
      }).length,
      sumborrowed: ThousandSeparator(
        CityLoans.filter(loan => {
          if (!loan.comment) return loan;
          else {
            if (loan.comment.indexOf("Cancelado") === -1) return loan;
          }
        }).reduce((acc, loan) => acc + loan.amount, 0)
      ),
      sumPaidPrestamao: ThousandSeparator(
        payments
          .filter(payment => {
            const [loan] = loans.filter(loan => loan._id === payment.loan);
            if (!loan.comment) {
              if (payment.amountPaid > 0) return payment;
            } else {
              if (
                loan.comment.indexOf("Cancelado") === -1 &&
                payment.amountPaid > 0
              )
                return payment;
            }
          })
          .reduce((acc, payment) => acc + parseFloat(payment.amountPaid), 0)
      ),

      sumReditos: payments
        .filter(payment => {
          const [loan] = loans.filter(loan => loan._id === payment.loan);
          if (!loan.comment) {
            if (payment.interestPaid) return payment;
          } else {
            if (
              loan.comment.indexOf("Cancelado") === -1 &&
              payment.interestPaid
            )
              return payment;
          }
        })
        .reduce((acc, payment) => {
          var a =
            parseFloat(payment.interestPaid) > 0
              ? parseFloat(payment.interestPaid)
              : parseFloat(payment.interestPaid) * -1;
          return acc + a;
        }, 0),
      sumcanceledLoans: ThousandSeparator(
        CityLoans.filter(loan => {
          if (loan.status)
            if (loan.comment)
              if (loan.comment.includes("Cancelado")) return loan;
        }).reduce((acc, loan) => acc + loan.amount, 0)
      ),
    };
  });
  console.log(citIesData);
  return (
    <div
      className='h-100'
      style={{
        overflowY: "scroll",
      }}
    >
      <h4>Datos por ciudades </h4>

      <div>
        {citIesData.map(cityData => (
          <div>
            <h5> {cityData.name.toUpperCase()} </h5>
            <div className='pl-2'>
              <div>
                Prestamos:{" "}
                <span className='text-info'>{cityData.loansAmount}</span>
              </div>
              <div>
                Prestamos Pagados :{" "}
                <span className='text-success'>{cityData.paidLoansAmount}</span>
              </div>

              <div>
                Prestamos Cancelado :{" "}
                <span className='text-danger'>
                  {cityData.canceledLoansAmount}
                </span>
              </div>

              <hr />

              <div>
                Total Prestado :{" "}
                <span className='text-info'>{cityData.sumborrowed}</span>
              </div>

              <div>
                Total Pagados :{" "}
                <span className='text-success'>
                  {cityData.sumPaidPrestamao}
                </span>
              </div>
              <div>
                Total reditos Pagados :{" "}
                <span className='text-success'>
                  {ThousandSeparator(cityData.sumReditos)}
                </span>
              </div>

              <div>
                Total Cancelado :{" "}
                <span className='text-danger'>{cityData.sumcanceledLoans}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitiesSummary;

const LoanByCity = (loans, cityName) => {
  return loans.filter(loan => loan.client.ciudad == cityName);
};

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
