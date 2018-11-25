import React from "react";
import * as $ from 'jquery';
import { Input, Form, Button, Card } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class CommentPage extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        self.state = { comment: null };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const comment = this.props.form.getFieldsValue().comment;
        $.ajax({
            url: '/addComment',
            method: 'POST',
            dataType: 'json',
            contentType: "application/json, charset=utf-8",
            data: JSON.stringify({comment: comment}),
            success: function(result) {
                console.log(result);
            }
        });
        this.setState({
            comment: comment
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Form onSubmit={this.handleSubmit} style={{ width: '500px' }}>
                    <FormItem>
                        {getFieldDecorator('comment', {
                         rules: [{message: 'Add comment'}]
                        })(
                        <TextArea rows={10} style={{ margin: '20px' }} />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button htmlType="submit">Add</Button>
                    </FormItem>
                </Form>
                <Card title='Comment'>
                    <div dangerouslySetInnerHTML={{ __html: this.state.comment }} />
                </Card>
            </div>
        );
    }
}

const CommentPageForm = Form.create()(CommentPage)
export default CommentPageForm;
