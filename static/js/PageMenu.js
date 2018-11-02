import React from "react";
import ReactDOM from "react-dom";
import * as $ from 'jquery';
import { Menu, Icon, Carousel } from 'antd';
import { withRouter, browserHistory } from 'react-router-dom';

class PageMenu extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const self = this;
        if (e.key == 'logout') {
            $.ajax({
                url: "/logout",
                success: function(result) {
                    self.props.history.push("/loginPage");
                }
            });
        } else if (e.key == 'comment') {
            this.props.setActiveWindow('Comment');
        } else if (e.key == 'home') {
            this.props.setActiveWindow('MainPage');
        }
    }

    render() {
        return (
            <div>
                <Menu
                    mode='horizontal'
                    onClick={this.handleClick}
                >
                    <Menu.Item key='home'>
                        <Icon type='home' /> Home
                    </Menu.Item>
                    <Menu.Item key='search'>
                        <Icon type="search" />Search
                    </Menu.Item>
                    <Menu.Item key='order'>
                        <Icon type="shopping-cart" />Order
                    </Menu.Item>
                    <Menu.Item key="comment">
                        <Icon type="wechat" />Forum
                    </Menu.Item>
                    <Menu.Item key='settings'>
                        <a href={"/settings?user=" + this.props.userData}>
                            <Icon type='setting' />Settings
                        </a>
                    </Menu.Item>
                    <Menu.Item key="logout">
                        <Icon type="logout" />Log Out
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default withRouter(PageMenu);
