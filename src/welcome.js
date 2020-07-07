import React from 'react';
import Registration from "./registration";
import axios from "./axios";
import {HashRouter, Route} from "react-router-dom";
import Login from "./login";
import ResetPassword from "./resetPassword";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome. The social network is still a work in progress. Bear with us.</h1>
            <div>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/resetPassword" component={ResetPassword} />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}