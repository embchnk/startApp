import React from "react";
import * as $ from 'jquery';
import { Menu, Icon, Carousel } from 'antd';
import { HashRouter, Switch, Route, BrowserRouter } from 'react-router-dom';
import PageMenu from './PageMenu';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        self = this;
    }

    render() {
        return (
            <div>
                <PageMenu />
                <Carousel autoplay>
                    <div><img src="https://static.next-episode.net/tv-shows-images/huge/mr.-robot.jpg" /></div>
                    <div><img src="https://images-na.ssl-images-amazon.com/images/I/91zqbri8+0L._RI_.jpg" /></div>
                    <div><img src="https://cdn.geekwire.com/wp-content/uploads/2017/10/mrrobot-630x420.png" /></div>
                </Carousel>
            </div>
        );
    }
}
