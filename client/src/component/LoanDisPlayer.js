import React from "react";
import NumberFormat from "react-number-format";

export default function LoanDisPlayer({ loans, deleteMe }) {
  return (
    <div>
      <table className="table text-white table-responsive-md">
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Plan</th>
            <th>Fecha</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr>
              <td>
                <NumberFormat
                  value={loan.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"RD$"}
                />
              </td>
              <td>{loan.plan.name}</td>
              <td>{loan.date}</td>
              <td>
                <button
                  id={loan.id}
                  onClick={(e) => {
                    deleteMe(e.target.id);
                  }}
                  className="btn btn-danger btn-block"
                >
                  <i className="fa fa-times"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
