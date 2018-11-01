import React from "react";
import * as $ from 'jquery';
import { Form, Input, Button } from 'antd';
import { HashRouter, Switch, Route, BrowserRouter, hashHistory } from 'react-router-dom';
import LoginForm from './Login';
import MainPage from './MainPage';
import PageMenu from './PageMenu';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter history={hashHistory}>
                    <Switch>
                        <Route path='/loginPage' component={LoginForm} />
                        <Route exact path='/' component={MainPage} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
