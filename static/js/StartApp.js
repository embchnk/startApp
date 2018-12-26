import React from "react";
import * as $ from 'jquery';
import { Form, Input, Button } from 'antd';
import { HashRouter, Switch, Route, BrowserRouter, hashHistory } from 'react-router-dom';
import MainPage from './MainPage';
import PageMenu from './PageMenu';
import CommentPage from './CommentPage';
import AddProduct from './AddProduct';
import SearchProduct from './SearchProduct';

const mainComponents = {
    'MainPage': <MainPage />,
    'Comment': <CommentPage />,
    'AddProduct': <AddProduct />,
    'SearchProduct': <SearchProduct />,
};

export default class StartApp extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            activeWindow: 'MainPage',
            userdata: null
        };
    }

    componentDidMount() {
        const self = this;
        $.ajax({
            async: false,
            url: "/getUser",
            dataType: "json",
            contentType: "application/json, charset=utf-8",
            success: function(result) {
                self.setState({ userdata: result.userdata });
            }
        });
    }

    setActiveWindow(value) {
        this.setState({activeWindow: value});
    }

    render() {
        return (
            <div>
                <PageMenu
                    setActiveWindow={this.setActiveWindow.bind(this)}
                    userData={this.state.userdata}
                />
                {mainComponents[this.state.activeWindow]}
            </div>
        );
    }
}
