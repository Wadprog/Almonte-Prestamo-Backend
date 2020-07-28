import React from "react";

const Day = ({ handleSelect, number, selected }) => {
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

export default Day;
