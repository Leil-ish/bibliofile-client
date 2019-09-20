import React from 'react';
import ReactDOM from 'react-dom';
import BookNotesPage from './BookNotesPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookNotesPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});