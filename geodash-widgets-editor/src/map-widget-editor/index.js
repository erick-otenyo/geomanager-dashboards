import {createRoot} from "react-dom/client";
import React from 'react';
import {Layout} from 'antd';


import Sidebar from './components/sidebar.js';
import MapPreview from "./components/map-preview";


import {
    MAPSTYLES,
    VIEWPORT
} from './map-config';


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
            "items": []
        },
        "nestedLegend": false,
        "layerConfig": {
            "type": "raster",
            "source": {
                "type": "raster",
                "tiles": [
                    "http://127.0.0.1:8200/api/raster-tiles/b37516f3-01ac-49f3-a5db-3b44b9491c51/{z}/{x}/{y}?time=2023-07-11T06:00:00.000Z"
                ]
            }
        },
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


const MapWidgetEditor = () => {
    return (
        <Layout style={{height: '100%'}} hasSider>
            <Sider
                width={300}
                style={{
                    overflow: 'auto',

                }}>
                <Sidebar/>
            </Sider>
            <Layout>
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
    );
};


export function initializeMapWidgetEditor(elementId, props) {
    createRoot(document.getElementById(elementId)).render(
        <MapWidgetEditor {...props} />
    );
}