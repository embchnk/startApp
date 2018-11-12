import React from "react";
import * as $ from 'jquery';
import { Form, Input, Button } from 'antd';
import { HashRouter, Switch, Route, BrowserRouter, hashHistory } from 'react-router-dom';
import LoginForm from './Login';
import StartApp from './StartApp';
import RegisterForm from "./Register";
import '../css/style.css';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter history={hashHistory}>
                <Switch>
                    <Route path='/loginPage' component={LoginForm} />
                    <Route path="/registerPage" component={RegisterForm} />
                    <Route exact path='/' component={StartApp} />
                </Switch>
            </BrowserRouter>
        );
    }
}
