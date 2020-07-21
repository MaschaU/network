import React from 'react';
import Registration from "./registration";
import axios from "./axios";
import {HashRouter, Route} from "react-router-dom";
import Login from "./login";
import Resetpassword from "./resetpassword";

export default function Welcome() {
    return (
        <div className="divWelcome">
            <div className="welcomeMessage">
                <h1>Network</h1>
                <h2>Blue || Team</h2>
            </div>
            <div className="divWelcomeLogoAndRegistration">
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/resetpassword" component={Resetpassword} />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}

