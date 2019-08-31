import React, {Component} from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Filters from '../Filters/Filters';
import './SearchBar.css';

class SearchBar extends Component {
  render() {
  
    return (
      <div className='searchTerms'>
        <SearchBox className onSubmit={this.props.onSubmit}/>
        <Filters className 
          onBookFilter={this.props.onBookFilter}/>
      </div>
    );
  }
}

export default SearchBar;
