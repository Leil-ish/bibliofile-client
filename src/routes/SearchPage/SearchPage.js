import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar';
import Results from '../../components/Results/Results';
import './SearchPage.css'

class SearchPage extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            error: false,
            bookType: "All"
        };
      }

      handleBookFilter(bookType) {
        this.setState({
          bookType: bookType
        })
      }
    
      handleSubmit(searchTerm) {
    
        const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.REACT_APP_API_KEY}`
        
        fetch(url)
          .then(response => {
            if(!response.ok) {
              throw new Error('Something went wrong, please try again later.');
            }
            this.setState({
              error: true
            })
            return response;
          })
          .then(response => response.json())
          .then(data => {
            if(!data.items) {
              throw new Error('There are no results for that search. Try using different search terms or manually add the book.');
            }
            this.setState({
              error: true
            })
            return data;
          })
          .then(data => {
            this.setState({
             books: data.items
            })
          })
          .catch(err => this.setState({
            error: err.message
          }))
      }
      
    
    
      render() {
        
        const error = this.state.error 
        ? <div className="SearchError">
            <h3>{this.state.error}</h3>
            <Link to={`/add-book`}>Enter Book Info Yourself</Link>
          </div> 
        : "";
    
        return (
          <main className='SearchPage'>
            <h2>Search for a Book to Add to Your Library</h2>
            <SearchBar 
              onSubmit={searchTerm => this.handleSubmit(searchTerm)}
              onBookFilter={bookType => this.handleBookFilter(bookType)}/>
             {error}
            <Results 
              books={this.state.books} 
              bookFilter={this.state.bookType}/>
          </main>
        );
      }
    }

export default SearchPage;
