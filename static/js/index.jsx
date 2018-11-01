import React from "react";
import ReactDOM from "react-dom";
import NormalLoginForm from "./Login";
import App from "./App";
import { Form } from 'antd';
import 'antd/dist/antd.css';

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mountNode = document.getElementById('content');
ReactDOM.render(<App />, mountNode);
// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
