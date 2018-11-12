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

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const Product = (props) => React.createElement("product", props);
        const Owner = (props) => React.createElement("owner", props);
        const Name = (props) => React.createElement("name", props);
        const Price = (props) => React.createElement("price", props);

        const owner = this.props.form.getFieldsValue().owner;
        const name = this.props.form.getFieldsValue().name;
        const price = this.props.form.getFieldsValue().price;

        const elementXML = ReactDomServer.renderToStaticMarkup(
            <Product>
                <Owner>{owner}</Owner>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Product>
        );
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/addProduct", false);
        xhr.setRequestHeader('Content-Type', 'text/xml');
        xhr.send(elementXML);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card
                    title="Specify product details"
                    bordered={false}
                    style={{ width: 400 }}
                >
                    <Form
                        className='login-form'
                        layout='inline'
                        onSubmit={this.handleSubmit}
                    >
                        <FormItem>
                        {getFieldDecorator('name') (
                        <Input placeholder='Product name' />
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('owner') (
                        <Input placeholder='Product owner' />
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('price') (
                        <Input placeholder='Product price' />
                        )}
                        </FormItem>
                        <FormItem>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='login-form-button'
                            >
                                Add
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card
                    title="Or upload XML file"
                    bordered={false}
                    style={{ width: 400 }}
                >
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> Click to upload
                        </Button>
                    </Upload>
                </Card>
            </div>
        );
    }
}

const AddProductForm = Form.create()(AddProduct);
export default AddProductForm;
