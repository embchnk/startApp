import React from "react";
import { Modal, Form, Icon, Input, Button, Checkbox } from 'antd';
import * as $ from 'jquery';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: "/login",
      dataType: 'json',
      contentType: "application/json, charset=utf-8",
      method: "POST",
      data: JSON.stringify(self.props.form.getFieldsValue()),
      success: function(result) {
        if (result.status == 'success') {
          self.props.history.replace('/');
        } else {
          Modal.error({
            title: "Login failed"
          }); 
        }
      },
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div
            style={{ padding: '200px' }}
        >
            <Form
                onSubmit={this.handleSubmit}
                className="login-form"
            >
                <FormItem>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
                </FormItem>
                <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="/registerPage">register now!</a>
                </FormItem>
            </Form>
        </div>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);
export default LoginForm; 
