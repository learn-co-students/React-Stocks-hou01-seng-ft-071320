import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    selectedStocks: [],
    filteredStocks: [],
    sortedAlphabetically: false,
    sortedByPrice: false
  }

  componentDidMount = () => {
    this.getStocks()
  }

  getStocks = () => {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stocks => this.setStocks(stocks))
  }

  setStocks = (stocksArg) => {
    this.setState({ stocks: stocksArg })
  }


  selectStocks = (selectedStock) => {
    let portfolioIds = [...this.state.selectedStocks].map(stock => stock.id)

    if (!portfolioIds.includes(selectedStock.id)) {
        this.setState({ selectedStocks: [
          ...this.state.selectedStocks, 
          selectedStock
        ]
      })
    }
  }

  removeSelectedStock = (selectedStock) => {
    let newPort = [...this.state.selectedStocks].filter(stock => stock.id !== selectedStock.id) 
    this.setState({
      selectedStocks: newPort
    })
  }

  filterFunction = (filterType) => {
    let newlyFilteredStocks = this.state.stocks.filter(stock => stock.type === filterType)
    this.setState({ filteredStocks: newlyFilteredStocks })
  }

  alphabeticalSort = () => {
    let arrayToSort = []
    let alphaSortedArray = []
    if (this.state.filteredStocks.length === 0) {
      arrayToSort = this.state.stocks
    } else {
      arrayToSort = this.state.filteredStocks
    }
    alphaSortedArray = arrayToSort.sort((a,b) => a.ticker.localeCompare(b.ticker))
    this.setState({ filteredStocks: alphaSortedArray, sortedAlphabetically: true })
  }

  priceSort = () => {
    let arrayToSort = []
    let priceSortedArray = []

    if (this.state.filteredStocks.length === 0) {
      arrayToSort = this.state.stocks
    } else {
      arrayToSort = this.state.filteredStocks
    }

    priceSortedArray = arrayToSort.sort((a,b) => a.price - b.price)
    
    this.setState({ filteredStocks: priceSortedArray, sortedByPrice: true })
  }

  render() {
    return (
      <div>
        <SearchBar stocks={this.state.stocks} filterFunction={this.filterFunction} alphabeticalSort={this.alphabeticalSort} sortedAlphabetically={this.state.sortedAlphabetically} priceSort={this.priceSort} sortedByPrice={this.state.sortedByPrice}/>

          <div className="row">
            <div className="col-8">

              {this.state.filteredStocks.length === 0? <StockContainer stocks={this.state.stocks} stockAction={this.selectStocks}/> : 
              <StockContainer stocks={this.state.filteredStocks} stockAction={this.selectStocks}/>}

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.selectedStocks} stockAction={this.removeSelectedStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;