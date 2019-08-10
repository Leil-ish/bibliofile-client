import React from 'react';
import {Link} from 'react-router-dom';

export default function SingleBook (props) {

    let author;
    if (this.props.volumeInfo.authors) {
      author = this.props.volumeInfo.authors[0];
    }
    else (
      author = "No authors listed"
    )
    return (
      <div className='SingleBook'>
      <h2 className='Book_title'>
        <Link to={`/library/${props.libraryId}`}>
          {props.title}
        </Link>
      </h2>
      <li>
          <h3>{this.props.volumeInfo.title}</h3>
          <h4>{author}</h4>
          <p>{this.props.volumeInfo.description}</p>
      </li>
    </div>
    );
  }

