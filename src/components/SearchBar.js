import React, { Component } from 'react';


class SearchBar extends Component {
  state={
    sortby: "Alphabetically",
    filter: "None"
  }  
  
  updateSort = (e) =>{
    //console.log(e.target.value)
    this.setState({
      ...this.state,
      sortby: e.target.value
    },
    () =>{
      this.props.handleSort(this.state.sortby)
    })
  }

  updateFilter = (e) =>{
    //console.log(e.target.value)
    this.setState({
      ...this.state,
      filter: e.target.value
    },
    () =>{
      this.props.handleFilter(this.state.filter)
    })
  }

  render(){
    return (

      <div>

        <strong>Sort by:</strong>
        <label>
          <input type="radio" name="sortby" value="Alphabetically" checked={null} onChange={this.updateSort}/>
          Alphabetically
        </label>
        <label>
          <input type="radio" name="sortby" value="Price" checked={null} onChange={this.updateSort}/>
          Price
        </label>
        <br/>

        <label>
          <strong>Filter:</strong>
          <select onChange={this.updateFilter} name='filter'>
            <option value="None">None</option>
            <option value="Tech">Tech</option>
            <option value="Sportswear">Sportswear</option>
            <option value="Finance">Finance</option>
          </select>
        </label>


      </div>
    );
  }
}

export default SearchBar;
