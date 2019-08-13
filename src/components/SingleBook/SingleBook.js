import React, { Component } from 'react';
import './SingleBook.css'

class SingleBook extends Component {

  render() {
    let {title, author, description} = this.props
    console.log(this.props.author)
      if (this.props.author) {
        author = this.props.author;
      }
      else (
        author = "No authors listed"
      )

    return (
        <ul className = 'single-book'>
            <h3>{title}</h3>
            <h4>{author}</h4>
            <p>{description}</p>
        </ul>
    );
  }
}

export default SingleBook;