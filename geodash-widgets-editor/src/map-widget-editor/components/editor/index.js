import React, {useEffect} from "react";
import {Collapse} from 'antd';
import GeneralFields from "./general-fields";
import BasemapFields from "./basemap-fields";
import DatasetFields from "./dataset-fields";

import {useMapWidget} from "app/mapWidget"
import {useConfig} from "app/config"

import "./style.scss";

const Sidebar = () => {
    const {
        initialLoaded,
        updateDatasets,
        updateDatasetsLoading
    } = useMapWidget(
        ({
             state: {initialLoaded},
             actions: {updateDatasets, updateDatasetsLoading},
         }) => ({initialLoaded, updateDatasets, updateDatasetsLoading})
    );

    const {fetchDatasets} = useConfig();

    useEffect(() => {
        if (fetchDatasets) {

            updateDatasetsLoading(true);

            fetchDatasets().then(datasets => {
                updateDatasets(datasets);

                updateDatasetsLoading(false);
            });
        }
    }, []);


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
            <Collapse bordered={false} expandIconPosition="end" items={items} defaultActiveKey={['general']}/>
        </div>
    );
}

export default Sidebar;