import React from 'react'

export default class LibrarySearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
      }

       handleChange = (e) => {
         this.setState({ searchTerm:e.target.value });
       }

       render() {
         let book = this.props.books,
             searchTerm = this.state.searchTerm.trim().toLowerCase();
         if (searchTerm.length > 0) {
           book = book.filter(function(i) {
             return i.title.toLowerCase().match( searchTerm );
           });
         }
         return (
           <div>
              <input type="text" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search for..."/>
              <ul>
                {book.map(function(i) {
                    return <li>{i.title} <a href={i.url}>{i.url}</a></li>;
                }) } 
              </ul>
           </div>
         );
       }
    }