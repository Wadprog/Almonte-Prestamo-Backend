import React, { Fragment } from "react";
import useToogle from "../utils/CustomHooks/useToogle";

const ClientDetails = ({ handleChange, name, value, editable, type }) => {
  const [edit, toogleEdit] = useToogle(false);
  const change = (e) => {
    console.log(e.target.name+':'+e.target.value);
    
  };
  return (
    <div className="card my-2">
      <div className="card-body p-0">
        <div className="form-group p-2">
          <label classnme="h6">{name}:</label>
          {edit ? (
            <input
              className="form-control"
              name={name}
              type={type || "text"}
              onChange={change}
            />
          ) : (
            <div className="ml-2">{value}</div>
          )}
          {editable && (
            <span className="ml-2">
              <label htmlFor={name}>
                <input
                  id={name}
                  name={name}
                  className="d-none"
                  type="checkbox"
                  value={edit}
                  onChange={toogleEdit}
                />
                <i className="fa fa-pencil"></i>
              </label>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
