import React from 'react';
import {Form, Input} from 'antd';

import {useMapWidget} from "providers/mapWidget"

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const GeneralFields = () => {
    const {
        widgetConfig,
        updateWidgetConfig,
    } = useMapWidget(
        ({
             state: {
                 widgetConfig
             },
             actions: {updateWidgetConfig},
         }) => ({
            widgetConfig,
            updateWidgetConfig,
        })
    );

    const onChange = (changedValues, allValues) => {
        updateWidgetConfig(changedValues);
    }


    const {title, description, caption} = widgetConfig;

    const initialValues = {
        title,
        description,
        caption
    }


    const [form] = Form.useForm();


    return (
        <Form
            form={form}
            initialValues={initialValues || {}}
            layout="vertical"
            name="general"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onValuesChange={onChange}
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
            >
                <Input size="small" placeholder="Add description"/>
            </Form.Item>

            <Form.Item
                label={<label style={{color: "#fff"}}>Caption</label>}
                name="caption"
            >
                <Input style={{width: "100%"}} size="small" placeholder="Add caption"/>
            </Form.Item>
        </Form>
    );
}


export default GeneralFields;