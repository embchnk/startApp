import React from "react";
import { Modal, Form, Icon, Input, Button, Checkbox } from 'antd';
import * as $ from 'jquery';

const FormItem = Form.Item;

class NormalRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let self = this;
    var password = self.props.form.getFieldsValue().password;
    var rePassword = self.props.form.getFieldsValue().repeatPassword;
    if (password !== rePassword) {
        Modal.error({
            title: "Passwords are different!",
        });
    } else {
        $.ajax({
        url: "/register",
        dataType: 'json',
        contentType: "application/json, charset=utf-8",
        method: "POST",
        data: JSON.stringify(self.props.form.getFieldsValue()),
        success: function(result) {
            if (result.status == 'success') {
                self.props.history.push('/');
            } else {
                Modal.error({
                    title: "Registration failed"
                }); 
            }
        },
        });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div
            style={{ padding: '200px' }}
        >
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                {getFieldDecorator('repeatPassword', {
                    rules: [{ required: true, message: 'Repeat password' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
                </FormItem>
                <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Register
                </Button>
                </FormItem>
                <a href="/loginPage"><Button className="login-form-button">Back</Button></a>
            </Form>
        </div>
    );
  }
}

const RegisterForm = Form.create()(NormalRegisterForm);
export default RegisterForm; 

