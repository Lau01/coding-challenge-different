import React, { Component } from 'react';
import SearchForm from './SearchForm'
import './App.css';


class App extends Component {
  render() {

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('myParam');

    return (
      <div>
        <h1>Lease Searcher</h1>
        <SearchForm />
      </div>
    );
  }
}

export default App;
