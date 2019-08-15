import React, {Component} from 'react';
import './SingleNote.css'

class SingleNote extends Component {

    static defaultProps = {
        books: [],
        notes: []
      }

  render() {
    let {book, title, modified, content} = this.props

    return (
        <ul className = 'single-note'>
            <h2>Note for: {book}</h2>
            <h3>{title}</h3>
            <h4>{modified}</h4>
            <p>{content}</p>
        </ul>
    );
  }
}

export default SingleNote;