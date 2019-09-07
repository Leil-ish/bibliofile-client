import React, {Component} from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Filters from '../Filters/Filters';
import './SearchBar.css';

class SearchBar extends Component {

  render() {
  console.log(this.props)
    return (
      <div className='searchTerms'>
        <SearchBox className onSubmit={this.props.onSubmit}/>
        <Filters className 
          onBookFilter={this.props.onBookFilter}
          onBookSort={this.props.onBookSort}/>
      </div>
    );
  }
}

export default SearchBar;
