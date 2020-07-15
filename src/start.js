import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome.js';
import Logo from "./logo";
import App from "./app";

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
    
    elem = <App />;
    
} else {
    elem= <Welcome/>;
}



ReactDOM.render(elem, document.querySelector('main'));

// if user is logged in, render app. else, render welcome!
//<Provider store={store}>  </Provider>