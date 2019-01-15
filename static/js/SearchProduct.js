import React from "react";
import ReactDOM from "react-dom";
import ReactDomServer from 'react-dom/server';
import * as $ from 'jquery';
import { Card, message, Button, Upload, Icon, Form, Input } from 'antd';

const FormItem = Form.Item;

const props = {
    name: 'file',
    action: '/addProduct',

    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed`);
        }
    }
};

class SearchProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { product: null };
    }

    handleSubmit(e) {
        let self = this;
        e.preventDefault();
        $.ajax({
            url: '/findProduct?id=' + self.props.form.getFieldsValue().id,
            method: 'GET',
            async: false,
            success: function(result) {
                self.setState({ product: result });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card
                    title="Enter product ID or IDS"
                    bordered={false}
                    style={{ width: 400 }}
                >
                    <Form
                        className='login-form'
                        layout='inline'
                        onSubmit={this.handleSubmit}
                    >
                        <FormItem
                            style={{ padding: '30px' }}
                        >
                        {getFieldDecorator('id') (
                        <Input placeholder='Product ID' />
                        )}
                        </FormItem>
                        <FormItem
                            style={{ padding: '30px' }}
                        >
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='login-form-button'
                            >
                                Search
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card
                    title="Product"
                    bordered={false}
                    style={{ width: 400 }}
                >
                    <div dangerouslySetInnerHTML={{ __html: this.state.product }} />
                </Card>
            </div>
        );
    }
}

const SearchProductForm = Form.create()(SearchProduct);
export default SearchProductForm;
