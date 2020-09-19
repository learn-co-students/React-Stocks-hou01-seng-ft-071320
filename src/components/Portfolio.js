import React from 'react'

const Portfolio = (props) => (
    <div>

    <div className="card" onClick={() => props.removeStock(props.stock)}>
        <div className="card-body">
        <h5 className="card-title">{
            props.stock.name
            }</h5>
        <p className="card-text">{
            `${props.stock.ticker} : ${props.stock.price}`
            }</p>
        </div>
    </div>


    </div>
);

export default Portfolio
