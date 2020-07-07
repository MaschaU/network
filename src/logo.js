import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default function Logo() {
    return (
        <div>
            <img src="./logo.png" />
        </div>
    );
}