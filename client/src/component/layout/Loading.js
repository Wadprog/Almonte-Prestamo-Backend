import React, { Fragment } from "react";
import "./Loading.css";
const Loading = ({ message = "" }) => {
  return (
    <Fragment>
      <div className='container '>
        <div className='loader p-5'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <h4 className='text-white text-muted'>{message}</h4>
    </Fragment>
  );
};

export default Loading;
