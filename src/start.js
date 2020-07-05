import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome.js';

let elem;
if (location.pathname === '/welcome') {
    elem = <Welcome />;
} else {
    elem = <img src="./logo.png" />;
}

ReactDOM.render(elem, document.querySelector('main'));