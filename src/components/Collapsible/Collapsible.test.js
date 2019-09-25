import React from 'react';
import ReactDOM from 'react-dom';
import Collapsible from './Collapsible';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Collapsible />, div);
  ReactDOM.unmountComponentAtNode(div);
});