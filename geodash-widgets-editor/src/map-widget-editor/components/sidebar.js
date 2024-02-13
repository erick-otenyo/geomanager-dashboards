import React from "react";
import {Collapse} from 'antd';


import GeneralFields from "components/general-fields";
import MapFields from "components/map-fields";

import "./sidebar.scss";


const DatasetSelector = () => {
    return (
        <div>
            <h1>DatasetSelector</h1>
        </div>
    );
}

const LayerSelector = () => {
    return (
        <div>
            <h1>LayerSelector</h1>
        </div>
    );
}


const items = [
    {"key": "general", "label": "General", "children": <GeneralFields/>},
    {"key": "map", "label": "Map", "children": <MapFields/>},
]


const Sidebar = () => {


    return (
        <div style={{width: "100%"}}>
            <Collapse bordered={false} expandIconPosition="end" items={items} defaultActiveKey={['general']}/>
        </div>
    );
}

export default Sidebar;