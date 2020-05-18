import React, { useState } from "react";

const Info = ({ title, data }) => {
  const [editting, toggleEditting] = useState();
  const handleChange = (e) => {
    toggleEditting({ editting: e.target.checked });
  };

  return (
    <li className="shadow-box effect1 list-group-item mb-2 p-0 rounded-0">
      <div className=" py-2 pl-2">
        <h6 className="text-bold">{title}</h6>
        <div className="d-flex justify-content-between">
          <span>
            {!editting ? (
              <span>{data.charAt(0).toUpperCase() + data.slice(1)}</span>
            ) : (
              <span>
                <input
                  name="data"
                  value={data}
                  className="border-0 pl-2 form-control text-success text-bold"
                  placeholder={data.charAt(0).toUpperCase() + data.slice(1)}
                />
              </span>
            )}
          </span>
          <div className="pr-3 modifier">
            <label htmlFor="editor">
              <i className="fa fa-pencil" />
            </label>
            <input
              id="editor"
              name="editor"
              onChange={handleChange}
              className=" d-none "
              type="checkbox"
              checked={editting}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Info;
