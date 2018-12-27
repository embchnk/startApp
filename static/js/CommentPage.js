import React from "react";
import * as $ from 'jquery';
import { Input, Form, Button, Card } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class CommentPage extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        self.state = { comments: null };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getComments = this.getComments.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const comment = this.props.form.getFieldsValue().comment;
        $.ajax({
            url: '/addComment',
            method: 'POST',
            async: false,
            dataType: 'json',
            contentType: "application/json, charset=utf-8",
            data: JSON.stringify({comment: comment}),
            success: function(result) {
                console.log(result);
            }
        });
        this.setState({
            comments: this.getComments()
        });
    }

    getComments() {
        var self = this;
        $.ajax({
            url: '/getComments',
            async: false,
            method: 'GET',
            dataType: 'json',
            contentType: "application/json, charset=utf-8",
            success: function(result) {
                self.result = result.comments;
                var i;
            }
        });
        let content = <div>{
            self.result.map((item) => {
                let field = <Card title={item[0]}>
                    <div dangerouslySetInnerHTML={{ __html: item[1] }} />
                </Card>;
                return field;
            }) 
        }
        </div>;

        return content;
    }

    componentDidMount() {
        this.setState({ comments: this.getComments() });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card
                    title="Comments"
                    bordered={false}
                    style={{ background: '#ECECEC' }}
                >
                    { this.state.comments }
                </Card>
                <Card
                    title="Add comment"
                    bordered={false}
                    style={{ background: '#ECECEC' }}
                >
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
                </Card>
            </div>
        );
    }
}

const CommentPageForm = Form.create()(CommentPage)
export default CommentPageForm;
