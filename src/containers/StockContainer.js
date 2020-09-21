import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {
  
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.props.stocks.map(ele=>
            <Stock ele={ele} key={ele.id} selsectClick={(e)=>this.props.buyStock(e)}/>
          )
        }
      </div>
    );
  }

}

export default StockContainer;
