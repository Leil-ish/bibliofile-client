import React, {Component} from 'react';
import SearchBox from '../SearchBox/SearchBox';
import './SearchBar.css';

class SearchBar extends Component {

  render() {
    return (
      <div className='searchTerms'>
        <SearchBox className onSubmit={this.props.onSubmit}/>
      </div>
    );
  }
}

export default SearchBar;
