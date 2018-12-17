import React, { Component } from 'react';
import './App.css';
import SearchResults from './SearchResults.jsx';



class SearchForm extends Component {
  constructor() {
    super();
    this.state = {

    }

    this.onClickSearch = this.onClickSearch.bind(this);
  }

  onClickSearch(event) {
    this.setState({
      
    })
    event.preventDefault();
  }



  render() {

    return (
      <div>
        <form>
          <input
          type="text"
          placeholder="Enter a lease ID..."

          />
          <button
            type="submit"
            onClick={this.onClickSearch}
          >Search
          </button>
        </form>

      </div>
    );
  }
}

export default SearchForm;
