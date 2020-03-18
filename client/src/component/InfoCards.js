import React from 'react'

const InfoCard= props=>{
 return (
 <div className="card text-center bg-logo text-white " >
  <div className="card-body">
   <div>
    <i className={`fa ${props.icon} fa-2x`}></i>
   </div>
 <h5 className="card-title text-danger">{props.title}</h5>
 <p className="card-text text-success">${props.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
  </div>
</div>)
}
export default InfoCard