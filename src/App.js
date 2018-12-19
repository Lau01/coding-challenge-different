import React, { Component } from 'react';
import SearchResults from './SearchResults';
import ShowTenants from './ShowTenants';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <h1>Lease Searcher</h1>
        <ShowTenants />
      </div>
    );
  }
}

export default App;
