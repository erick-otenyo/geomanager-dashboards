import React from 'react';
import {Button, Checkbox, Form, Input} from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const GeneralFields = () => (
    <Form
        theme="dark"
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label={<label style={{color: "#fff"}}>Title</label>}
            name="title"
            rules={[
                {
                    required: true,
                    message: "Add title",
                },
            ]}
        >
            <Input size="small" placeholder="Add title"/>
        </Form.Item>

        <Form.Item
            label={<label style={{color: "#fff"}}>Description</label>}
            name="description"
            rules={[
                {
                    required: true,
                    message: "Add description",
                },
            ]}
        >
            <Input size="small" placeholder="Add description"/>
        </Form.Item>

        <Form.Item
            label={<label style={{color: "#fff"}}>Caption</label>}
            name="caption"
            rules={[
                {
                    required: true,
                    message: "Add caption",
                },
            ]}
        >
            <Input style={{width: "100%"}} size="small" placeholder="Add caption"/>
        </Form.Item>

    </Form>
);


export default GeneralFields;