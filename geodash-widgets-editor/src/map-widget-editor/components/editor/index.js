import React, {useEffect} from "react";
import {Collapse} from 'antd';
import GeneralFields from "./general-fields";
import BasemapFields from "./basemap-fields";
import DatasetFields from "./dataset-fields";

import {useMapWidget} from "providers/mapWidget"
import {useConfig} from "providers/config"

import "./style.scss";

const Sidebar = () => {
    const {
        initialLoaded,
        updateDatasets,
        updateDatasetsLoading,
        widgetConfig,
    } = useMapWidget(
        ({
             state: {initialLoaded, widgetConfig},
             actions: {updateDatasets, updateDatasetsLoading},
         }) => ({initialLoaded, updateDatasets, updateDatasetsLoading, widgetConfig})
    );

    const {fetchDatasets, onWidgetUpdated} = useConfig();

    useEffect(() => {
        if (fetchDatasets) {

            updateDatasetsLoading(true);

            fetchDatasets().then(datasets => {
                updateDatasets(datasets);

                updateDatasetsLoading(false);
            });
        }
    }, []);

    useEffect(() => {

        if (onWidgetUpdated) {
            onWidgetUpdated(widgetConfig);
        }

    }, [widgetConfig]);


    const items = [
        {
            "key": "general",
            "label": "General",
            "children": <GeneralFields/>
        },
        {
            "key": "dataset",
            "label": "Data",
            "children": <DatasetFields/>
        },
        {
            "key": "basemap",
            "label": "Basemap",
            "children": <BasemapFields/>
        },
    ]

    if (!initialLoaded) {
        return null;
    }

    return (
        <div style={{width: "100%", paddingBottom: 50}}>
            <Collapse accordion bordered={false} expandIconPosition="end" items={items} defaultActiveKey={['general']}/>
        </div>
    );
}

export default Sidebar;