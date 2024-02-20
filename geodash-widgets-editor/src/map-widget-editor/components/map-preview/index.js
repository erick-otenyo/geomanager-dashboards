import Map from 'components/map';

import {useMapWidget} from "providers/mapWidget";

import "./style.scss"

const MapPreview = () => {

    const {
        datasets,
        initialLoaded,
        datasetsLoading,
        widgetConfig,
        mapConfig,
        updateWidgetConfig
    } = useMapWidget(
        ({
             state: {
                 widgetConfig,
                 mapConfig,
                 datasets,
                 datasetsLoading,
                 initialLoaded
             },
             actions: {updateWidgetConfig},
         }) => ({
            widgetConfig,
            mapConfig,
            datasets,
            datasetsLoading,
            updateWidgetConfig,
            initialLoaded
        })
    );

    const {dataset, layer, time, has_time, title, caption, ...rest} = widgetConfig;
    const datasetObj = datasets.find(d => d.id === dataset);
    const layerObj = datasetObj && layer && datasetObj.layers && datasetObj.layers.find(l => l.id === layer);

    const {labels, basemap, show_boundary, lat, lng, zoom, bounds} = rest;

    const {mapStyle} = mapConfig;

    const mapConfiguration = {
        "lat": lat,
        "lng": lng,
        "zoom": zoom,
        "basemap": {}
    }


    const map = {
        MAPSTYLES: mapStyle,
        VIEWPORT: {
            latitude: lat,
            longitude: lng,
            zoom: zoom,
            transitionDuration: 250
        }
    }

    const layers = layerObj && [layerObj];

    if (!initialLoaded) {
        return null;
    }


    return (
        <div className="c-map-preview">
            <header className="map-header">
                <div className="map-title">
                    {title}
                </div>
                <div className="map-buttons">

                </div>
            </header>
            <div className="map-container">
                <Map
                    map={map}
                    mapConfiguration={mapConfiguration}
                    layers={layers}
                    layerId={layer}
                    hasTime={has_time}
                    time={time}
                    onChange={(mapState) => {
                        updateWidgetConfig(mapState)
                    }}
                />
            </div>
            <div className="map-caption">
                {caption}
            </div>
        </div>
    );
}

export default MapPreview;