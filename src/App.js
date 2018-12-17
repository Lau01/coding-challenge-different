import React, { Component } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <h1>Lease Searcher</h1>
        <SearchResults />

      </div>
    );
  }
}

export default App;
