import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome.js';
import Logo from "./logo";

let elem;
if (location.pathname === '/welcome') {
    elem = <Welcome />;
} else {
    elem = <Logo />;
}

ReactDOM.render(elem, document.querySelector('main'));