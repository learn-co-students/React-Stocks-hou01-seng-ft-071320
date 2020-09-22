import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  
  state ={
    allStocks: [],
    stocks: [],
    portfolio: [],
    sort: " "
  }

  componentDidMount() {
    this.getStocks()
  }

  getStocks = () => {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stocks => this.setState({
      allStocks: stocks,
      stocks: stocks
    })
    )
  }

  addToPortfolio = (newStock) =>{
    this.setState({
      portfolio: [...this.state.portfolio, newStock]
    })
  }

  removeFromPortfolio = (newStock) => {
    this.setState({
      portfolio: this.state.portfolio.filter(stock => stock !== newStock)
    })
  }

  filterFunction = (e) => {
    this.setState({
      ...this.state,
      stocks: this.state.allStocks.filter(stock => stock.type === e)
    })
  }

  sortStocks = (e) => {
    let sortedStocks = []
    let newSort = ""
    if (e==="Alphabetically"){
      sortedStocks = this.state.stocks.sort((a, b) => a.name.localeCompare(b.name))
      newSort = "Alphabetically"
      this.setState({
        ...this.state,
        stocks: sortedStocks,
        sort: newSort
      })
    } else {
      sortedStocks = this.state.stocks.sort((a,b) => b.price - a.price)
      newSort ="Price"
      this.setState({
        ...this.state,
        stocks: sortedStocks, 
        sort: newSort})
    }
  }

  render() {
    return (
      <div>
        <SearchBar filterFunction={this.filterFunction} sortStocks={this.sortStocks} sort={this.state.sort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} addToPortfolio={this.addToPortfolio}/>

            </div>
            <div className="col-4">
              <PortfolioContainer removeFromPortfolio={this.removeFromPortfolio} portfolio={this.state.portfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;