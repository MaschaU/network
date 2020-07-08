import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default function Logo() {
    return (
        <div className="divLogo">
            <img src="./logo.png" />
        </div>
    );
}