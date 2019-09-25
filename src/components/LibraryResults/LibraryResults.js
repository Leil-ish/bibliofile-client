import React, {Component} from 'react';
import SingleBook from '../SingleBook/SingleBook';
import {CompareValues} from '../Utils/Utils'
import '../Results/Results.css';


class LibraryResults extends Component {
  render() {
    const {bookFilter} = this.props;
    const {property} = this.props
    const list = this.props.books
    .filter(book => 
      (bookFilter === 'All' || (book.is_ebook && bookFilter === 'eBook') || 
      (!book.is_ebook && bookFilter === 'paper')))   
    .sort(CompareValues(`${property}`, 'desc')) 
    .map((book, key) => 
      <SingleBook 
        {...book} 
        onDeleteBook={this.handleDeleteBook}
        key={key}
        />);

    return (
        <ul className='bookList'>
            <li>{list}</li>
        </ul>
    );
  }
}

export default LibraryResults;
