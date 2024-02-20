import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";
import ReactMapGL, {FlyToInterpolator} from "react-map-gl";
import WebMercatorViewport from "viewport-mercator-project";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";

import {updateLayerUrlParams} from "./utils";
import {parseISO} from "date-fns";

import {Legend, LegendListItem,} from 'vizzuality-components';

import LegendItemTypes from "./legend/legend-item-types";

import LayerManager from "./layer-manager";

import {DEFAULT_VIEWPORT} from "./constants";


import './vizzuality.scss'
import "./styles.scss";

class Map extends PureComponent {
    static propTypes = {
        /** A function that returns the map instance */
        children: PropTypes.func,

        /** Custom CSS class for styling */
        className: PropTypes.string,

        style: PropTypes.shape({}),

        /** An object that defines the viewport
         * @see https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=initialization
         */
        viewport: PropTypes.shape({}),

        layerId: PropTypes.string,

        layers: PropTypes.array,

        map: PropTypes.shape({
            viewport: PropTypes.shape({}),
            MAPSTYLES: PropTypes.object,
            VIEWPORT: PropTypes.object,
        }),

        mapConfiguration: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
            bbox: PropTypes.array,
            zoom: PropTypes.number,
            basemap: PropTypes.shape({
                basemap: PropTypes.string,
                labels: PropTypes.string,
                boundaries: PropTypes.bool
            }),

        }),

        /** An object that defines how fitting bounds behaves */
        fitBoundsOptions: PropTypes.object,

        /** A boolean that allows panning */
        dragPan: PropTypes.bool,

        /** A boolean that allows rotating */
        dragRotate: PropTypes.bool,

        /** A boolean that allows zooming */
        scrollZoom: PropTypes.bool,

        /** A boolean that allows zooming */
        touchZoom: PropTypes.bool,

        /** A boolean that allows touch rotating */
        touchRotate: PropTypes.bool,

        /** A boolean that allows double click zooming */
        doubleClickZoom: PropTypes.bool,

        /** A boolean that disables flying */
        disableEventsOnFly: PropTypes.bool,

        /** A function that exposes when the map is loaded.
         * It returns and object with the `this.map` and `this.mapContainer`
         * reference. */
        onLoad: PropTypes.func,

        /** function invoked if something is wrong */
        onError: PropTypes.func,

        /** A function that exposes the viewport */
        onViewportChange: PropTypes.func,

        /** A function that exposes the viewport when the map fits bounds */
        onFitBoundsChange: PropTypes.func,

        /** Called when map changes */
        onChange: PropTypes.func,

        /** A function that exposes the viewport */
        getCursor: PropTypes.func,
    };

    static defaultProps = {
        children: null,
        className: null,
        style: {},
        viewport: DEFAULT_VIEWPORT,
        dragPan: true,
        dragRotate: true,
        scrollZoom: true,
        touchZoom: true,
        touchRotate: true,
        doubleClickZoom: true,
        fitBoundsOptions: {transitionDuration: 250},

        onViewportChange: () => {
        },
        onFitBoundsChange: () => {
        },
        onLoad: () => {
        },
        onError: null,
        getCursor: ({isHovering, isDragging}) => {
            if (isHovering) return "pointer";
            if (isDragging) return "grabbing";
            return "grab";
        },
    };

    state = {
        viewport: {
            ...DEFAULT_VIEWPORT,
            ...this.props.map.viewport,
        },
        layers: [],
        layerGroups: [],
        flying: false,
        loaded: false,
    };

    componentDidMount() {
        const {map} = this.props;
        this.setState({
            viewport: {
                ...DEFAULT_VIEWPORT,
                ...map.VIEWPORT,
            }
        });
    }

    componentDidUpdate(prevProps) {
        const {
            viewport: prevViewport,
            layerId: prevLayerId,
            mapConfiguration: prevMapConfiguration,
            hasTime: prevHasTime,
            time: prevTime,
        } = prevProps;

        const {viewport, layerId, mapConfiguration, hasTime, time} = this.props;

        const {viewport: stateViewport} = this.state;
        const basemapChanged = !isEqual(
            mapConfiguration.basemap.basemap,
            prevMapConfiguration.basemap.basemap
        );
        const labelsChanged = !isEqual(
            mapConfiguration.basemap.labels,
            prevMapConfiguration.basemap.labels
        );
        const boundariesChanged = !isEqual(
            mapConfiguration.basemap.boundaries,
            prevMapConfiguration.basemap.boundaries
        );

        const layerChanged = this.map && (!isEqual(layerId, prevLayerId) || !isEqual(hasTime, prevHasTime) || !isEqual(time, prevTime));

        if (!isEqual(viewport, prevViewport)) {
            this.setState({
                // eslint-disable-line
                viewport: {
                    ...stateViewport,
                    ...viewport,
                },
            });
        }

        if (basemapChanged && this.map) this.setBasemap();
        if (labelsChanged && this.map) this.setLabels();
        if (boundariesChanged && this.map) this.setBoundaries();

        if (layerChanged && this.map) this.setLayers();
    }

    onLoad = () => {
        const {onLoad, mapConfiguration} = this.props;
        this.setState({loaded: true});

        this.setBasemap();
        this.setLabels();
        this.setBoundaries();
        this.setLayers();

        if (!isEmpty(mapConfiguration.bbox)) {
            this.fitBounds();
        }

        onLoad({
            map: this.map,
            mapContainer: this.mapContainer.current,
        });
    };

    onViewportChange = (_viewport) => {
        const {onChange, mapConfiguration} = this.props;
        this.setState({viewport: _viewport}, () => {
            if (onChange) {
                const webMercatorViewport = new WebMercatorViewport(_viewport);
                const bounds = webMercatorViewport.getBounds();
                const {latitude, longitude, zoom} = _viewport;
                const {basemap} = mapConfiguration;
                onChange({
                    lat: latitude,
                    lng: longitude,
                    zoom,
                });
            }
        });
    };

    onResize = (_viewport) => {
        const {onViewportChange} = this.props;
        const {viewport} = this.state;
        const newViewport = {
            ...viewport,
            ..._viewport,
        };

        this.setState({viewport: newViewport});
        onViewportChange(newViewport);
    };

    setBasemap = () => {
        const {basemap} = this.props.mapConfiguration.basemap;
        const BASEMAP_GROUPS = ["basemap"];
        const {layers, metadata} = this.map.getStyle();

        if (!metadata) return;

        const basemapGroups = Object.keys(metadata["mapbox:groups"]).filter((k) => {
            const {name} = metadata["mapbox:groups"][k];

            const matchedGroups = BASEMAP_GROUPS.map((rgr) =>
                name.toLowerCase().includes(rgr)
            );

            return matchedGroups.some((bool) => bool);
        });

        const basemapsWithMeta = basemapGroups.map((groupId) => ({
            ...metadata["mapbox:groups"][groupId],
            id: groupId,
        }));

        const basemapToDisplay = basemapsWithMeta.find((_basemap) =>
            _basemap.name.includes(basemap)
        );

        const basemapLayers = layers.filter((l) => {
            const {metadata: layerMetadata} = l;
            if (!layerMetadata) return false;

            const gr = layerMetadata["mapbox:group"];
            return basemapGroups.includes(gr);
        });

        basemapLayers.forEach((_layer) => {
            const match = _layer.metadata["mapbox:group"] === basemapToDisplay.id;
            if (!match) {
                this.map.setLayoutProperty(_layer.id, "visibility", "none");
            } else {
                this.map.setLayoutProperty(_layer.id, "visibility", "visible");
            }
        });
    };

    setLabels = () => {
        const {labels} = this.props.mapConfiguration.basemap;

        const LABELS_GROUP = ["labels"];
        const {layers, metadata} = this.map.getStyle();

        if (!metadata) return;

        const labelGroups = Object.keys(metadata["mapbox:groups"]).filter((k) => {
            const {name} = metadata["mapbox:groups"][k];

            const matchedGroups = LABELS_GROUP.filter((rgr) =>
                name.toLowerCase().includes(rgr)
            );

            return matchedGroups.some((bool) => bool);
        });

        const labelsWithMeta = labelGroups.map((_groupId) => ({
            ...metadata["mapbox:groups"][_groupId],
            id: _groupId,
        }));
        const labelsToDisplay =
            labelsWithMeta.find((_basemap) => _basemap.name.includes(labels)) || {};

        const labelLayers = layers.filter((l) => {
            const {metadata: layerMetadata} = l;
            if (!layerMetadata) return false;

            const gr = layerMetadata["mapbox:group"];
            return labelGroups.includes(gr);
        });

        labelLayers.forEach((_layer) => {
            const match = _layer.metadata["mapbox:group"] === labelsToDisplay.id;
            this.map.setLayoutProperty(
                _layer.id,
                "visibility",
                match ? "visible" : "none"
            );
        });

        return true;
    };

    setLayers() {

        const {layers, layerId, hasTime, time} = this.props;

        if (!layers || !layers.length) return;

        let activeLayers = layers.filter((l) => l.id === layerId);

        if (hasTime && time) {
            activeLayers = activeLayers.reduce((all, layer) => {

                updateLayerUrlParams(layer, {time: parseISO(time).toISOString()});
                all.push(layer)

                return all;
            }, []);
        }


        this.setState({
            layers: activeLayers,
            layerGroups: this.createLayerGroups(activeLayers, layerId)
        });


    }

    setBoundaries = () => {
        const {boundaries} = this.props.mapConfiguration.basemap;

        const LABELS_GROUP = ["boundaries"];
        const {layers, metadata} = this.map.getStyle();

        if (!metadata) return;

        const boundariesGroups = Object.keys(metadata["mapbox:groups"]).filter(
            (k) => {
                const {name} = metadata["mapbox:groups"][k];

                const labelsGroup = LABELS_GROUP.map((rgr) =>
                    name.toLowerCase().includes(rgr)
                );

                return labelsGroup.some((bool) => bool);
            }
        );

        const boundariesLayers = layers.filter((l) => {
            const {metadata: layerMetadata} = l;
            if (!layerMetadata) return false;

            const gr = layerMetadata["mapbox:group"];
            return boundariesGroups.includes(gr);
        });

        boundariesLayers.forEach((l) => {
            this.map.setLayoutProperty(
                l.id,
                "visibility",
                boundaries ? "visible" : "none"
            );
        });
    };

    map = createRef();

    mapContainer = createRef();

    fitBounds = () => {
        const {viewport: currentViewport} = this.state;
        const {
            mapConfiguration,
            onViewportChange,
            onFitBoundsChange,
            fitBoundsOptions,
            onError,
        } = this.props;

        const {bbox} = mapConfiguration;

        const viewport = {
            ...mapConfiguration,
            width: this.mapContainer.current.offsetWidth,
            height: this.mapContainer.current.offsetHeight,
            ...currentViewport,
            latitude: mapConfiguration.lat,
            longitude: mapConfiguration.lng,
            zoom: mapConfiguration.zoom,
        };

        try {
            const webMercatorViewport = new WebMercatorViewport(viewport);
            // TODO: Do we need options?
            webMercatorViewport.fitBounds(bbox);

            const {longitude, latitude, zoom} = webMercatorViewport;

            const newViewport = {
                ...currentViewport,
                longitude,
                latitude,
                zoom,
                ...fitBoundsOptions,
            };

            this.setState({
                flying: true,
                viewport: newViewport,
            });

            onFitBoundsChange(newViewport);
            onViewportChange(newViewport);
        } catch (e) {
            if (onError)
                onError(
                    "There was an error fitting bounds. Please, check your bbox values."
                );
        }

        window.setTimeout(() => {
            this.setState({flying: false});
        }, currentViewport.transitionDuration || 0);
    };

    createLayerGroups(layers, layerId) {
        if (!layers?.length) {
            return [];
        }


        return layers.map(({id, dataset, ...rest}) => ({
            dataset,
            visible: true,
            layers: [
                {
                    id,
                    active: layerId ? id === layerId : rest.default,
                    ...rest
                }
            ]
        }));
    }

    render() {
        const {
            className,
            style,
            getCursor,
            dragPan,
            dragRotate,
            scrollZoom,
            touchZoom,
            touchRotate,
            doubleClickZoom,
            disableEventsOnFly,
            onError,
            layerId,
            map,
            ...mapboxProps
        } = this.props;


        const {viewport, flying, loaded, layers, layerGroups} = this.state;

        return (
            <div className="c-mapbox-map" ref={this.mapContainer}>
                <div className="c-legend">
                    <Legend maxHeight={140} sortable={false}>
                        {layerGroups.map((lg, i) => (
                            <LegendListItem
                                index={i}
                                key={`${i}-${lg.dataset}`}
                                layerGroup={lg}
                            >
                                <LegendItemTypes/>
                            </LegendListItem>
                        ))}
                    </Legend>
                </div>
                <ReactMapGL
                    ref={(_map) => {
                        if (_map) this.map = _map.getMap();
                    }}
                    mapStyle={map.MAPSTYLES}
                    // CUSTOM PROPS FROM REACT MAPBOX API
                    {...mapboxProps}
                    // VIEWPORT
                    {...viewport}
                    width="100%"
                    height="100%"
                    // INTERACTIVE
                    dragPan={!flying && dragPan}
                    dragRotate={!flying && dragRotate}
                    scrollZoom={!flying && scrollZoom}
                    touchZoom={!flying && touchZoom}
                    touchRotate={!flying && touchRotate}
                    doubleClickZoom={!flying && doubleClickZoom}
                    getCursor={getCursor}
                    // DEFAULT FUC IMPLEMENTATIONS
                    onViewportChange={this.onViewportChange}
                    onResize={this.onResize}
                    onLoad={this.onLoad}
                    transitionInterpolator={new FlyToInterpolator()}
                >
                    {loaded && !!this.map && (
                        <LayerManager
                            map={this.map}
                            layers={layers}
                        />
                    )}
                </ReactMapGL>
            </div>
        );
    }
}

export default Map;
