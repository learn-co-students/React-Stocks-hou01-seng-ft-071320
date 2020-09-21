import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.sortByAlpha} onClick={(e)=>props.selectSort(e.target.value)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.sortByPrice} onClick={(e)=>props.selectSort(e.target.value)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(e)=> {
            props.filterStock(e.target.value)
          }}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
