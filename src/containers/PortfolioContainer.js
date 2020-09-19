import React, { Component } from 'react';
import Portfolio from '../components/Portfolio'

class PortfolioContainer extends Component {

  render() {
    const portfolio = this.props.portfolio
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            portfolio.map(stock => <Portfolio key={stock.id} stock={stock} removeStock={this.props.removeStock} />)
          }
      </div>
    );
  }

}

export default PortfolioContainer;
