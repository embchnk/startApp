import React from "react";
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
        if (e.key == 'logout') {
            $.ajax({
                url: "/logout",
                success: function(result) {
                    self.props.history.push("/loginPage");
                }
            });
        } else if (e.key == 'comment') {
            console.log("Add comment");
        }
    }


    render() {
        return (
            <div>
                <Menu
                    mode='horizontal'
                    onClick={this.handleClick.bind(this)}
                >
                    <Menu.Item key='search'>
                        <Icon type="search" />Search
                    </Menu.Item>
                    <Menu.Item key='order'>
                        <Icon type="shopping-cart" />Order
                    </Menu.Item>
                    <Menu.Item key="comment">
                        <Icon type="wechat" />Forum
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
