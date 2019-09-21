import React from 'react';
import ReactDOM from 'react-dom';
import SingleBook from './SingleBook';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SingleBook />, div);
  ReactDOM.unmountComponentAtNode(div);
});