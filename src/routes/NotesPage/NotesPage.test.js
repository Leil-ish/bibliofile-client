import React from 'react';
import ReactDOM from 'react-dom';
import NotesPage from './NotesPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NotesPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});