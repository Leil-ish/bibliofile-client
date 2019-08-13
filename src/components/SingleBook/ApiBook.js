import React, { Component } from 'react';
import './SingleBook.css'

class ApiBook extends Component {
  render() {
    let author;
    if (this.props.volumeInfo.authors) {
      author = this.props.volumeInfo.authors[0];
    }
    else (
      author = "No authors listed"
    )
    return (
      <ul className = 'single-book'>
          <h3>{this.props.volumeInfo.title}</h3>
          <h4>{author}</h4>
          <p>{this.props.volumeInfo.description}</p>
      </ul>
    );
  }
}

export default ApiBook;