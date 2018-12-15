import React, { Component } from 'react';
import './App.css';


class SearchForm extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="lease id..." />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
