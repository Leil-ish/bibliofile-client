import React, { Component } from 'react';
import './SearchBox.css';


class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
    }

    searchTermChanged(searchTerm) {
        this.setState({
            searchTerm
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const search = this.state.searchTerm.split(' ').join('+');
        this.props.onSubmit(search);
    }
  
    render() {

    return (
      <div>
          <form className="searchBox" onSubmit={this.handleSubmit}>
              <label htmlFor="search">Search </label>
              <input 
              type="text" 
              placeholder="Search for a book by author, title, or ISBN" 
              id="search"
              onChange={e => this.searchTermChanged(e.target.value)} />
              <button type="submit" className='searchSubmit'>Search</button>
          </form>
      </div>
      
    );
  }
}

export default SearchBox;
