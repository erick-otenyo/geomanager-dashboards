import React from 'react';
import {Checkbox, Form, Select} from 'antd';

import {useMapWidget} from "providers/mapWidget";

const BasemapFields = () => {
    const {
        widgetConfig,
        updateWidgetConfig
    } = useMapWidget(
        ({
             state: {
                 widgetConfig,
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


    const {basemap, labels, show_boundary} = widgetConfig;


    const initialValues = {
        basemap,
        labels,
        show_boundary
    }


    return (
        <Form
            theme="dark"
            layout="vertical"
            name="basemap"
            autoComplete="off"
            initialValues={initialValues}
            onValuesChange={onChange}
        >
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
                label={<label style={{color: "#fff"}}> Show Boundaries</label>}
                valuePropName="checked"
                name="show_boundary"
            >
                <Checkbox/>
            </Form.Item>

        </Form>
    );
}

export default BasemapFields;