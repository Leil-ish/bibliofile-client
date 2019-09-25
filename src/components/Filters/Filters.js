import React, { Component } from 'react';
import './Filters.css';

class Filters extends Component {
  
    render() {
  
    return (
        <div className='customize-results'>
            {/*<div className='Filters'>
                <div className='filter-selection'>
                    <label htmlFor='book-filter-input'>
                    Filter by:
                    </label>
                    <select id='book-type' onChange={e => this.props.onBookFilter(e.target.value)}>
                        <option value='All' defaultValue>All</option>
                        <option value='eBook'>eBook</option>
                        <option value='paper'>Physical Book</option>
                    </select>
                </div>
            </div>*/}
            <div className='Sort'>
                <form className='sort-selection' aria-label='library-sort'>
                    <label htmlFor='book-sort-input'>
                    Sort by:
                    </label>
                    <select id='book-sort' aria-label='library-sort' onChange={e => this.props.onBookSort(e.target.value)}>
                        <option value='title' aria-label='title' defaultValue>Title</option>
                        <option value='author' aria-label='author'>Author</option>
                        {/*<option value='rating'>Rating</option>*/}
                        <option value='borrowed' aria-label='borrowed'>Borrowed</option>
                        <option value='genre' aria-label='genre'>Genre</option>
                    </select>
                </form>
            </div>
        </div>
    );
  }
}

export default Filters;