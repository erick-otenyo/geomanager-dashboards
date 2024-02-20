import React, {useEffect, useState} from 'react';
import {Form, Select} from 'antd';

import DateSelector from "components/date-selector";

import {useMapWidget} from "providers/mapWidget";

import {wmsGetLayerTimeFromCapabilities} from "components/map/utils";


const DatasetFields = () => {
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
            const dataset = datasets.find(d => d.id === changedValues.dataset);

            // update state
            updateWidgetConfig({layer_type: dataset.layer_type, layer: null, time: null, has_time: false});

            // reset form
            form.setFieldsValue({layer: null, time: null});

            // clear timestamps
            setTimestamps([]);
        }
    }


    const {dataset, layer, time, has_time} = widgetConfig;

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
                onChange({has_time: true});

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
            } else if (layerType === "wms") {
                const {getCapabilitiesUrl, layerName} = selectedLayerObject;

                setTimeLoading(true);

                wmsGetLayerTimeFromCapabilities(getCapabilitiesUrl, layerName).then(timestamps => {
                    if (timestamps.length) {
                        setTimestamps(timestamps);
                        onChange({has_time: true});
                    } else {
                        setTimestamps([]);
                        onChange({has_time: false});
                    }

                    setTimeLoading(false);
                })


            } else {
                onChange({has_time: false});
                setTimestamps([]);
            }
        }

    }, [layer])

    const dateFormat = selectedLayerObject && selectedLayerObject?.paramsSelectorConfig.find(c => c.key === "time")?.dateFormat;

    return (
        <Form
            form={form}
            theme="dark"
            layout="vertical"
            name="dataset"
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

            {has_time && timestamps && !!timestamps.length && (
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
                    <DateSelector timestamps={timestamps} dateFormat={dateFormat}/>
                </Form.Item>
            )}
        </Form>
    );
}

export default DatasetFields;