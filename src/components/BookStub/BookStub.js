import React, { Component } from 'react';
import './BookStub.css'

class BookStub extends Component {


  render() {
    let {title} = this.props
    console.log(this.props)
    return (
        <div className = 'single-book'>
          <ul>
            <h3>{title}</h3>
        </ul>
      </div>
    );
  }
}

export default BookStub;