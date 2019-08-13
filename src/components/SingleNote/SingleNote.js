import React, { Component } from 'react';
import './SingleNote.css'

class SingleNote extends Component {

  render() {
    let {title, modified, content} = this.props

    return (
        <ul className = 'single-note'>
            <h3>{title}</h3>
            <h4>{modified}</h4>
            <p>{content}</p>
        </ul>
    );
  }
}

export default SingleNote;