import React from "react";
import { Input, Button } from 'antd';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <p> Hello React!</p>
                <Button> ...and Ant Design Button!</Button>
                <Input placeholder="Basic usage" />
            </div>
        );
    }
}
