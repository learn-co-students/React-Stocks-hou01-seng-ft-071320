import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state={
    stocks: [],
    selected: [],
    selectedType: null,
    sortByAlpha: false,
    sortByPrice: false,
  }
  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res =>  res.json())
    .then(data => { // check data
      this.setState({
        stocks: data,
      })
    })
  }

  buyStock=(e)=>{
  const stk=this.state.stocks.find(stock=>stock.id === e)
  if (this.state.selected.includes(stk))
    return
  this.setState({
    selected: [...this.state.selected,stk]
  })
  //  console.log(this.state.selected)
  }
  removeStock=(e)=>{
    const stk=this.state.selected.find(stock=>stock.id === e)
    if (this.state.selected.includes(stk))
    this.setState({
      selected: this.state.selected.filter(v => v.id !== e)
    })
    }

  filterStock=(type)=>{
    this.setState({
      selectedType: type
    })
  }

  selectSort = (type) => {
    console.log({type})
    if (type === 'Alphabetically') {
      this.setState({
        sortByAlpha: !this.state.sortByAlpha
      })
    }

    if (type === 'Price') {
      this.setState({
        sortByPrice: !this.state.sortByPrice
      })
    }
  }

  render() {
    let selectedStocks = this.state.stocks.filter(stock=> stock.type === this.state.selectedType || !this.state.selectedType)

    if (this.state.sortByPrice) {
      selectedStocks.sort((a, b) => (a.price > b.price ? 1 : -1))
    }

    if (this.state.sortByAlpha) {
      selectedStocks.sort((a, b) => (a.name > b.name ? 1 : -1))
    }

    return (
      <div>
        <SearchBar filterStock={this.filterStock} selectSort={this.selectSort} sortByAlpha={this.state.sortByAlpha} sortByPrice={this.state.sortByPrice}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={selectedStocks} buyStock={(e)=>this.buyStock(e)}/>

            </div>
            <div className="col-4">

              <PortfolioContainer addToMy={this.state.selected} removeStock={(e)=>this.removeStock(e)}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
