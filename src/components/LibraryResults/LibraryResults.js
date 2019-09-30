import React, {Component} from 'react';
import SingleBook from '../SingleBook/SingleBook';
import {compareValues} from '../Utils/Utils'
import '../Results/Results.css';


class LibraryResults extends Component {

  //Filter and sort functionality for saved library books
  render() {
    const {bookFilter} = this.props;
    const {property} = this.props;
    console.log(property)
    const list = this.props.books
    .filter(book => 
      (bookFilter === 'All' || (book.is_ebook && bookFilter === 'eBook') || 
      (!book.is_ebook && bookFilter === 'paper')))   
    .sort(compareValues(`${property}`.replace(/[^a-zA-Z ]/g, "")))
    .map((book, key) => 
      <SingleBook 
        {...book} 
        onDeleteBook={this.handleDeleteBook}
        key={key}
        />);

        console.log(list)

    return (
        <ul className='bookList'>
            <li>{list}</li>
        </ul>
    );
  }
}

export default LibraryResults;
