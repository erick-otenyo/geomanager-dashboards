import React from 'react';
import {Checkbox, Form, Select} from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const MapFields = () => (
    <Form
        theme="dark"
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label={<label style={{color: "#fff"}}>Dataset</label>}
            name="dataset"
            rules={[
                {
                    required: true,
                    message: "Select Dataset",
                },
            ]}
        >
            <Select placeholder="Select Dataset">
                <Select.Option value="demo">Demo</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item
            label={<label style={{color: "#fff"}}>Basemap</label>}
            name="basemap"
            rules={[
                {
                    required: true,
                    message: "Select Basemap",
                },
            ]}
        >
            <Select placeholder="Select Basemap">
                <Select.Option value="light">Light</Select.Option>
                <Select.Option value="dark">Dark</Select.Option>
                <Select.Option value="satellite">Satellite</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item
            label={<label style={{color: "#fff"}}>Labels</label>}
            name="labels"
            rules={[
                {
                    required: true,
                    message: "Select Labels",
                },
            ]}
        >
            <Select placeholder="Select Labels">
                <Select.Option value="none">No Labels</Select.Option>
                <Select.Option value="light">Labels Light</Select.Option>
                <Select.Option value="dark">Labels Dark</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item
            label={<label style={{color: "#fff"}}>Show Boundaries</label>} valuePropName="checked">
            <Checkbox/>
        </Form.Item>

    </Form>
);


export default MapFields;