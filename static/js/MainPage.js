import React from "react";
import * as $ from 'jquery';
import { Menu, Icon, Card } from 'antd';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        self = this;
    }

    render() {
        return (
            <div style={{ background: '#ECECEC ', padding: '30px' }}>
                <Card title="Main Page" bordered={false} style={{ width: 300 }}>
                    <p>That application is project for Engineers Thesis.</p>
                    <p></p>
                    <p>Made by Michal Bochnak.</p>
                </Card>
            </div>
        );
    }
}
