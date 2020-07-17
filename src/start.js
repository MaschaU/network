import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome.js';
import Logo from "./logo";
import App from "./app";

// socket.io setup
// import {init} from "/socket";

// redux setup
import { createStore, applyMiddleware } from 'redux';
import {Provider} from "react-redux";
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./reducer";

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));


// app and every child of app now has access to redux
let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (userIsLoggedIn) {
    // giving our socket.js file access to redux
    // we want to give socket to only logged-in users
    // init(store);
    
    elem = <App />;
    
} else {
    elem= <Welcome/>;
}



ReactDOM.render(elem, document.querySelector('main'));

//<Provider store={store}>  </Provider>