import React, { Component } from 'react';
import './Filters.css';

class Filters extends Component {
  
    render() {
  
    return (
        <div className='customize-results'>
            <div className='Sort'>
                <form className='sort-selection' aria-label='library-sort'>
                    <label htmlFor='book-sort-input'>
                    Sort by:
                    </label>
                    <select id='book-sort' aria-label='library-sort' onChange={e => this.props.onBookSort(e.target.value)}>
                        <option value='title' aria-label='title' defaultValue>Title</option>
                        <option value='author' aria-label='author'>Author</option>
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