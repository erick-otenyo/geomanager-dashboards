import {createRoot} from "react-dom/client";
import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';


import Editor from './components/editor';
import MapPreview from "./components/map-preview";


import {
    MAPSTYLES,
    VIEWPORT
} from './map-config';
import {MapWidgetProvider} from "app/mapWidget";
import {ConfigProvider} from "app/config";


const {Content, Sider} = Layout;

const layers = [
    {
        "id": "b37516f3-01ac-49f3-a5db-3b44b9491c51",
        "dataset": "e8a57470-bdc5-43a6-8dd2-d63426436337",
        "isDefault": true,
        "name": "Rainfall Forecast",
        "layerType": "raster_file",
        "multiTemporal": true,
        "isMultiLayer": false,
        "legendConfig": {
            "type": "choropleth",
            "items": [
                {
                    "name": 1.0,
                    "color": "#c8c8c8"
                },
                {
                    "name": 10.0,
                    "color": "#f8a504"
                },
                {
                    "name": 30.0,
                    "color": "#fdff00"
                },
                {
                    "name": 50.0,
                    "color": "#caff70"
                },
                {
                    "name": 100.0,
                    "color": "#4cff00"
                },
                {
                    "name": 200.0,
                    "color": "#66cd00"
                },
                {
                    "name": "",
                    "color": "#116e00"
                }
            ]
        },
        "nestedLegend": false,
        "layerConfig": {
            "type": "raster",
            "source": {
                "type": "raster",
                "tiles": [
                    "http://127.0.0.1:8200/api/raster-tiles/b37516f3-01ac-49f3-a5db-3b44b9491c51/{z}/{x}/{y}?time=2023-07-11T06:00:00.000Z&geostore_id={geostore_id}"
                ]
            }
        },
        "params": {
            "time": "2023-07-11T06:00:00.000Z",
            "geostore_id": ""
        },
        "paramsSelectorConfig": [
            {
                "key": "time",
                "required": true,
                "sentence": "{selector}",
                "type": "datetime",
                "availableDates": [],
                "dateFormat": {
                    "currentTime": "yyyy-MM-dd HH:mm"
                }
            }
        ],
        "currentTimeMethod": "latest_from_source",
        "autoUpdateInterval": null,
        "canClip": true,
        "analysisConfig": {},
        "tileJsonUrl": "http://127.0.0.1:8200/api/raster/b37516f3-01ac-49f3-a5db-3b44b9491c51/tiles.json",
        "linkedLayers": [],
        "showAllMultiLayer": true
    }
]


const mapConfiguration = {
    "lat": 0,
    "lng": 0,
    "zoom": 2,
    "basemap": {
        "basemap": "dark",
        "labels": "light",
        "boundaries": false
    },
    "bounds": [
        [
            -44.033203125001094,
            -35.532226227703994
        ],
        [
            44.03320312499921,
            35.53222622770324
        ]
    ],
    "bbox": [
        [
            -44.033203125001094,
            -35.532226227703994
        ],
        [
            44.03320312499921,
            35.53222622770324
        ]
    ]
}


const MapWidgetEditor = (props) => {
    const {
        editorConfig,
        initialEdits
    } = props;

    return (

        <ConfigProvider config={editorConfig}>
            <MapWidgetProvider initialEdits={initialEdits}>
                <Layout style={{height: '100%'}} hasSider key="sidebar">
                    <Sider
                        width={300}
                        style={{
                            overflow: 'auto',

                        }}>
                        <Editor/>
                    </Sider>
                    <Layout key="content">
                        <Content style={{margin: '24px 50px 70px 24px', backgroundColor: "#fff"}}>
                            <div style={{margin: 50}}>
                                <MapPreview
                                    layers={layers}
                                    layerId="b37516f3-01ac-49f3-a5db-3b44b9491c51"
                                    map={{
                                        MAPSTYLES,
                                        VIEWPORT,
                                    }}
                                    mapConfiguration={mapConfiguration}
                                />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </MapWidgetProvider>
        </ConfigProvider>
    );
};


export function initializeMapWidgetEditor(elementId, editorConfig, initialEdits = {}) {
    const props = {
        editorConfig,
        initialEdits
    }

    createRoot(document.getElementById(elementId)).render(
        <MapWidgetEditor {...props} />
    );
}