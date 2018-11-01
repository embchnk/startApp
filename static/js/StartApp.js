import React from "react";
import * as $ from 'jquery';
import { Form, Input, Button } from 'antd';
import { HashRouter, Switch, Route, BrowserRouter, hashHistory } from 'react-router-dom';
import MainPage from './MainPage';
import PageMenu from './PageMenu';
import CommentPage from './CommentPage';

const mainComponents = {
    'MainPage': <MainPage />,
    'Comment': <CommentPage />
};

export default class StartApp extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {activeWindow: 'MainPage'};
    }

    setActiveWindow(value) {
        this.setState({activeWindow: value});
    }

    render() {
        return (
            <div>
                <PageMenu setActiveWindow={this.setActiveWindow.bind(this)} />
                {mainComponents[this.state.activeWindow]}
            </div>
        );
    }
}
