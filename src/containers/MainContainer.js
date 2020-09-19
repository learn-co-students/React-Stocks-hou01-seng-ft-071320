import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    sort: 'All',
    filter: 'All'
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(res =>  res.json())
    .then(data => {
      this.setState({
        stocks: data,
      })
    })
  }

  addToPortfolio = (stock) => {
    this.setState({portfolio: [...this.state.portfolio, stock]})
  }

  removeStock = (removedStock) => {
    let newPortfolio = []
    newPortfolio = this.state.portfolio.filter(stock => {
      return stock !== removedStock 
    })
    this.setState({
      portfolio: newPortfolio
    })
  }

  sortStocks = (value) => {
    console.log(value)
    let sortedStocks = []
    let newSort = ''

    if(value === 'Alphabetically'){
      sortedStocks = this.state.stocks.sort((a,b) =>{
        return a.name.localeCompare(b.name)
      })
      newSort = 'Alphabetically'
    } else if(value === 'Price'){
      sortedStocks = this.state.stocks.sort((a,b) => {
        return b.price - a.price
      })
      newSort = 'Price'
    }

    this.setState({
      stocks: sortedStocks,
      sort: newSort
    })
  }

  filterStocks = (value) => {
    let filteredStocks = []
    let newFilter = ''

    if (value === 'All'){
      fetch("http://localhost:3000/stocks")
      .then(res =>  res.json())
      .then(data => {
        this.setState({
          stocks: data,
        })
      })
      newFilter = 'All'
      this.setState({
        filter: newFilter
      })
    } else {
      filteredStocks = this.state.stocks.filter(stock =>{
        return stock.type === value
      })
      newFilter = value 
      this.setState({
        stocks: filteredStocks,
        filter: newFilter
      })
    }
  }


  
  render() {
    return (
      <div>
        <SearchBar sortStocks={this.sortStocks} sort={this.state.sort} filterStocks={this.filterStocks} filter={this.state.filter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} addToPortfolio={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} removeStock={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
