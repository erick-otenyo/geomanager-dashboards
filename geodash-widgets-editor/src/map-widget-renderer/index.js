import {createRoot} from "react-dom/client";
import React from "react";

import {DEFAULT_MAP_STYLE, DEFAULT_VIEWPORT} from "map-config";
import Map from "components/map";


const MapWidgetRenderer = ({widgetData}) => {
    const {lat, lng, zoom, layer} = widgetData;


    const viewport = {
        ...DEFAULT_VIEWPORT,
        latitude: lat,
        longitude: lng,
        zoom
    }

    const layers = [layer]
    const layerId = layer.id

    const mapConfiguration = {
        "lat": lat,
        "lng": lng,
        "zoom": zoom,
        "basemap": {}
    }


    return (
        <Map
            map={{
                MAPSTYLES: DEFAULT_MAP_STYLE,
                VIEWPORT: viewport
            }}
            layers={layers}
            layerId={layerId}
            mapConfiguration={mapConfiguration}
        />
    );
}

export function initializeMapWidgetRenderer(element, widgetData) {


    createRoot(element).render(
        <MapWidgetRenderer widgetData={widgetData}/>
    );
}