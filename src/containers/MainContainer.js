import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state ={
    stocks: [],
    myStocks: [],
    allStocks: [],
    sort: ""
  }


  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stocks =>{
      this.setState(
        {stocks: stocks,
        allStocks: stocks}
      )
    })
  }

  addToPortfolio = (stock) => {
    //console.log(stock)
    let myPortfolio = this.state.myStocks
    myPortfolio.push(stock)
    this.setState({
      ...this.state,
      myStocks: myPortfolio
    })
  }

  removeFromPortfolio = (stockToRemove) =>{
    //console.log("click to remove!")
    let myPortfolio = this.state.myStocks.filter(stock =>{
      return stock !== stockToRemove
    })
    this.setState({
      ...this.state,
      myStocks: myPortfolio
    })
  }

  handleSort = (sort) => {
    this.setState({
      ...this.state,
      sort: sort
    },
    () => this.doSort()
    )
  }
  
  doSort = () => {
    //console.log(sort)
    if(this.state.sort === "Alphabetically"){
      this.nameSort()
    }else if(this.state.sort === "Price"){
      this.priceSort()
    }
  }

  priceSort = () =>{
    let stockList = this.state.stocks.sort((a,b) =>{
      return a.price - b.price
    })
    this.setState({
      ...this.state,
      stocks: stockList
    })
  }

  nameSort = () => {
    let stockList = this.state.stocks.sort((a,b) =>{
      return a.name.localeCompare(b.name)
    })
    this.setState({
      ...this.state,
      stocks: stockList
    })
  }

  handleFilter = (filter) => {
    //console.log(filter)
    let filteredStocks
    if(filter === "None"){
      filteredStocks = this.state.allStocks
    }else{
      filteredStocks = this.state.allStocks.filter(stock => {
        return stock.type === filter
      })
    }
    this.setState({
      ...this.state,
      stocks: filteredStocks
    },
    () => this.doSort()
    )
  }

  render() {
    return (
      <div>
        <SearchBar handleSort={this.handleSort} handleFilter={this.handleFilter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} addToPortfolio={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer myStocks={this.state.myStocks} removeFromPortfolio={this.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
