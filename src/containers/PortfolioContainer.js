import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  renderStocks = () =>{
    //console.log(this.props)
    return this.props.myStocks.map(stock =>{
      return <Stock stock={stock} key={stock.name} clickStock={this.props.removeFromPortfolio}/>
      
    })
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            //render your portfolio stocks here
            this.renderStocks()
          }
      </div>
    );
  }

}

export default PortfolioContainer;
