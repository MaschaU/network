import React from 'react';
import ReactDOM from 'react-dom';

// gives us access to DOM
ReactDOM.render(
    <HelloWorld />,
    document.querySelector('main')
);

// react component- it puts an element on the screen via JSX syntax
function HelloWorld() {
    return (
        <div>Hello, World!</div>
    );
}




