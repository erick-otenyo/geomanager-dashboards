import React, {useEffect, useState} from 'react';
import {Form, Select} from 'antd';

import DateSelector from "components/date-selector";

import {useMapWidget} from "app/mapWidget";

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const DatasetFields = () => {
    const [hasTime, setHasTime] = useState(false);
    const [timeLoading, setTimeLoading] = useState(false);
    const [timestamps, setTimestamps] = useState([]);


    const {
        datasets,
        datasetsLoading,
        widgetConfig,
        updateWidgetConfig
    } = useMapWidget(
        ({
             state: {
                 widgetConfig,
                 datasets,
                 datasetsLoading,
             },
             actions: {updateWidgetConfig},
         }) => ({
            widgetConfig,
            datasets,
            datasetsLoading,
            updateWidgetConfig,
        })
    );


    const [form] = Form.useForm();

    const onChange = (changedValues, allValues) => {
        updateWidgetConfig(changedValues);

        if (changedValues.dataset) {
            const layers = datasets.find(d => d.id === changedValues.dataset)?.layers || [];

            if (layers.length > 1) {
                form.setFieldsValue({layer: null})
                updateWidgetConfig({layer: null});
            } else {
                form.setFieldsValue({layer: layers[0].id})
                updateWidgetConfig({layer: layers[0].id});
            }
        }
    }

    const onTimeChange = (time) => {
        onChange({time});
    }


    const {dataset, layer, time} = widgetConfig;

    const initialValues = {
        dataset,
        layer,
        time
    }

    if (datasetsLoading) {
        return <div>Loading datasets.....</div>
    }

    if (!datasets || datasets.length === 0) {
        return <div>No datasets found</div>
    }

    const layers = dataset && datasets.find(d => d.id === dataset)?.layers || [];

    const selectedLayerObject = layer && layers.find(l => l.id === layer);


    useEffect(() => {
        if (selectedLayerObject) {
            const {layerType, tileJsonUrl} = selectedLayerObject;

            if (layerType === "raster_file") {
                setHasTime(true);
                setTimeLoading(true);

                fetch(tileJsonUrl).then(response => response.json()).then(data => {
                    if (data?.timestamps) {
                        setTimestamps(data.timestamps);
                    } else {
                        setTimestamps([]);
                    }

                    setTimeLoading(false);
                }).catch(e => {
                    setTimeLoading(false);
                    setTimestamps([]);
                });
            } else {
                setHasTime(false);
                setTimestamps([]);
            }
        }

    }, [layer])


    return (
        <Form
            form={form}
            theme="dark"
            layout="vertical"
            name="dataset"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={initialValues}
            onValuesChange={onChange}
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
                    {datasets.map((dataset) => {
                        return (
                            <Select.Option
                                key={dataset.id}
                                value={dataset.id}>
                                {dataset.name}
                            </Select.Option>)
                    })}
                </Select>
            </Form.Item>

            {layers && !!layers.length && (
                <Form.Item
                    label={<label style={{color: "#fff"}}>Layer</label>}
                    name="layer"
                    rules={[
                        {
                            required: true,
                            message: "Select Layer",
                        },
                    ]}
                >
                    <Select placeholder="Select Layer">
                        {layers.map((layer) => {
                            return (
                                <Select.Option
                                    key={layer.id}
                                    value={layer.id}>
                                    {layer.name}
                                </Select.Option>)
                        })}
                    </Select>
                </Form.Item>
            )}

            {hasTime && timestamps && !!timestamps.length && (
                <Form.Item
                    label={<label style={{color: "#fff"}}>Time</label>}
                    name="time"
                    rules={[
                        {
                            required: true,
                            message: "Select Time",
                        },
                    ]}
                >
                    <DateSelector timestamps={timestamps} onChange={onTimeChange} selectedTime={timestamps[0]}/>
                </Form.Item>
            )}


        </Form>
    );
}

export default DatasetFields;