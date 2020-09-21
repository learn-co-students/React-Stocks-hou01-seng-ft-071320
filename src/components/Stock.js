import React from 'react'

const Stock = ({ele, selsectClick}) => (
  <div>
  
    <div className="card" onClick={()=>selsectClick(ele.id)} >
      <div className="card-body"  >
        <h5 className="card-title">{
            ele.name
          }</h5>
        <p className="card-text">{
            ele.ticker+ ": " + ele.price
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
