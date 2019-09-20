import React from 'react';
import ReactDOM from 'react-dom';
import ApiBook from './ApiBook';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ApiBook />, div);
  ReactDOM.unmountComponentAtNode(div);
});