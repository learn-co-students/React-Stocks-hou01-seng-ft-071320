import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {
          this.props.addToMy.map(ele=>
            <Stock ele={ele} key={ele.id} selsectClick={(e)=>this.props.removeStock(e)}/>
          )
        }
      </div>
    );
  }

}

export default PortfolioContainer;
