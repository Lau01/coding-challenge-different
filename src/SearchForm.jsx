import React, { Component } from 'react';
import './App.css';
import SearchResults from './SearchResults.jsx';



class SearchForm extends Component {
  render() {

    return (
      <div>
        <form>
          <input type="text" placeholder="lease id..." />
          <button type="submit">Search</button>
        </form>
        <SearchResults />
      </div>
    );
  }
}

export default SearchForm;
