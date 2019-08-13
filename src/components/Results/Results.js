import React, {Component} from 'react';
import ApiBook from '../SingleBook/ApiBook'
import './Results.css'


class Results extends Component {
  render() {
    const {printFilter, bookFilter} = this.props;
    const list = this.props.books
    .filter(book => (printFilter === "All" || book.volumeInfo.printType === printFilter)
     && (bookFilter === "All" || (book.saleInfo.isEbook && bookFilter === "eBook") || (!book.saleInfo.isEbook && bookFilter === "paper")))    
    .map((book, key) => <ApiBook {...book} key={key}/>);

    return (
        <ul className="bookList">
            {list}
        </ul>
    );
  }
}

export default Results;
