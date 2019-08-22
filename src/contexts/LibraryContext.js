import React, {Component} from 'react'

const LibraryContext = React.createContext({
  library: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setLibrary: () => {},
})
export default LibraryContext

export class LibraryProvider extends Component {
  state = {
    library: [],
    error: null,
  };

  setLibrary = library => {
    this.setState({ library })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      library: this.state.library,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setLibrary: this.setLibrary,
    }
    return (
      <LibraryContext.Provider value={value}>
        {this.props.children}
      </LibraryContext.Provider>
    )
  }
}
