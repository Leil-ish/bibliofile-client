import React, { Component } from 'react'

export const nullNote = {
  author: {},
  tags: [],
}

const NoteContext = React.createContext({
  note: nullNote,
  notes: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setNote: () => {},
  clearNote: () => {},
  setNotes: () => {},
  addNote: () => {},
})

export default NoteContext

export class NoteProvider extends Component {
  state = {
    note: nullNote,
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({error})
  }

  clearError = () => {
    this.setState({error: null})
  }

  setNote = note => {
    this.setState({note})
  }

  setNotes = notes => {
    this.setState({notes})
  }

  clearNote = () => {
    this.setNote(nullNote)
    this.setNotes([])
  }

  addNote = note => {
    this.setNotes([
      ...this.state.notes,
      note
    ])
  }

  render() {
    const value = {
      note: this.state.note,
      notes: this.state.notes,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setNote: this.setNote,
      setNotes: this.setNotes,
      clearNote: this.clearNote,
      addNote: this.addNote,
    }
    return (
      <NoteContext.Provider value={value}>
        {this.props.children}
      </NoteContext.Provider>
    )
  }
}
