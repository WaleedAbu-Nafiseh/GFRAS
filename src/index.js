import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    //first arguument is what to render
    React.createElement('h2', null, 'Hello there react'),
    //secondargument is where we want to render
    document.getElementById('root')
);