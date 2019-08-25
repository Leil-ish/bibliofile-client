import React, { Component } from 'react'

const NoteListContext = React.createContext({
  noteList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setNoteList: () => {},
})
export default NoteListContext

export class NoteListProvider extends Component {
  state = {
    noteList: [],
    error: null,
  };

  setNoteList = noteList => {
    this.setState({ noteList })
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
      noteList: this.state.noteList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setNoteList: this.setNoteList,
    }
    return (
      <NoteListContext.Provider value={value}>
        {this.props.children}
      </NoteListContext.Provider>
    )
  }
}
