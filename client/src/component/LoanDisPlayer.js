import React from "react";

export default function LoanDisPlayer({ loans, deleteMe }) {
  return (
    <div>
      @twitterCopy
      <table className="table text-white">
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
              <td>RD$ {loan.amount}</td>
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
