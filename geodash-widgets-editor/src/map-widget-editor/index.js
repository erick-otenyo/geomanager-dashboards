import {createRoot} from "react-dom/client";
import React from 'react';
import {Layout} from 'antd';


import Editor from './components/editor';
import MapPreview from "./components/map-preview";


import {MapWidgetProvider} from "providers/mapWidget";
import {ConfigProvider} from "providers/config";
import {useMapWidget} from "providers/mapWidget"


const {Content, Sider} = Layout;

const MapWidgetEditor = (props) => {
    const {
        editorConfig,
        initialEdits
    } = props;

    const {
        initialLoaded,
    } = useMapWidget(
        ({
             state: {initialLoaded},
         }) => ({initialLoaded})
    );


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
                                <MapPreview/>
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