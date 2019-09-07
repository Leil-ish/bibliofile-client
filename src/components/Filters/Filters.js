import React, { Component } from 'react';
import './Filters.css';

class Filters extends Component {
  
    render() {
  
    return (
        <div className='customize-results'>
            <div className="Filters">
                <div className="selection">
                    <div className='input'>
                        <label htmlFor='book-filter-input'>
                        Filter library by:
                        </label>
                        <label htmlFor="book-type">Book Type: </label>
                        <select id="book-type" onChange={e => this.props.onBookFilter(e.target.value)}>
                            <option value="All" defaultValue>All</option>
                            <option value="eBook">eBook</option>
                            <option value="paper">Physical Book</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="Sort">
                <div className="selection">
                    <label htmlFor='book-sort-input'>
                    Sort library by:
                    </label>
                    <select id='book-sort' onChange={e => this.props.onBookSort(e.target.value)}>
                        <option value="title" defaultValue>Title</option>
                        <option value="author">Author</option>
                        <option value="rating">Rating</option>
                        <option value="borrowed">Borrowed</option>
                        <option value="genre">Genre</option>
                    </select>
                </div>
            </div>
        </div>
    );
  }
}

export default Filters;