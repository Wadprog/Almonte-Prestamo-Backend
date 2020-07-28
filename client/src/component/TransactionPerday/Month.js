import React from "react";

const Month = ({ name, handleSelect, number, selected }) => {
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

export default Month;
