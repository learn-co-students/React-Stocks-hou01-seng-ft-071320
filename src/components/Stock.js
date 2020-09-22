import React from 'react'

const Stock = (props) => (
  // 
  // const { size, topping, vegetarian } = props.pizza
  // const { name } = props.stock
  
  <div>
    <div className="card" onClick={() => props.selectedStock(props.stock)}>
      <div className="card-body">
        <h5 className="card-title">{
          props.stock.name
          }</h5>
        <p className="card-text">{`${props.stock.ticker}: ${props.stock.price}`}</p>
      </div>
    </div>


  </div>
);

export default Stock