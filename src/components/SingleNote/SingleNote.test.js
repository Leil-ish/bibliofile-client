import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import SingleNote from './SingleNote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <SingleNote />
    </BrowserRouter>
    ,div);
  ReactDOM.unmountComponentAtNode(div);
});