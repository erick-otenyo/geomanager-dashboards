const DEFAULT_MAP_STYLE = {
    "version": 8,
    "id": "osm-liberty",
    "name": "OSM Liberty",
    "metadata": {
        "mapbox:type": "template",
        "mapbox:groups": {}
    },
    "sources": {
        "natural_earth_shaded_relief": {
            "maxzoom": 6,
            "tileSize": 256,
            "tiles": [
                "https://klokantech.github.io/naturalearthtiles/tiles/natural_earth_2_shaded_relief.raster/{z}/{x}/{y}.png"
            ],
            "type": "raster"
        },
        "openmaptiles": {
            "type": "vector",
            "url": "https://free.tilehosting.com/data/v3.json?key=tXiQqN3lIgskyDErJCeY"
        }
    },
    "sprite": "https://rawgit.com/lukasmartinelli/osm-liberty/gh-pages/sprites/osm-liberty",
    "glyphs": "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "rgb(239,239,239)"
            }
        },
        {
            "id": "natural_earth",
            "type": "raster",
            "source": "natural_earth_shaded_relief",
            "maxzoom": 6,
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "raster-opacity": {
                    "base": 1.5,
                    "stops": [
                        [0, 0.6],
                        [6, 0.1]
                    ]
                }
            }
        },
        {
            "id": "park",
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "park",
            "filter": ["all"],
            "paint": {
                "fill-color": "#d8e8c8",
                "fill-opacity": 0.7,
                "fill-outline-color": "rgba(95, 208, 100, 1)"
            }
        },
        {
            "id": "park_outline",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "park",
            "filter": ["all"],
            "paint": {
                "line-dasharray": [1, 1.5],
                "line-color": "rgba(228, 241, 215, 1)",
                "line-opacity": 1
            },
            "layout": {}
        },
        {
            "id": "landuse_residential",
            "type": "fill",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "landuse",
            "maxzoom": 8,
            "filter": ["==", "class", "residential"],
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "fill-color": {
                    "base": 1,
                    "stops": [
                        [9, "hsla(0, 3%, 85%, 0.84)"],
                        [12, "hsla(35, 57%, 88%, 0.49)"]
                    ]
                }
            }
        },
        {
            "id": "landcover_wood",
            "type": "fill",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "landcover",
            "filter": ["all", ["==", "class", "wood"]],
            "paint": {
                "fill-antialias": false,
                "fill-color": "hsla(98, 61%, 72%, 0.7)",
                "fill-opacity": 0.4
            }
        },
        {
            "id": "landcover_grass",
            "type": "fill",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "landcover",
            "filter": ["all", ["==", "class", "grass"]],
            "paint": {
                "fill-antialias": false,
                "fill-color": "rgba(176, 213, 154, 1)",
                "fill-opacity": 0.3
            }
        },
        {
            "id": "landuse_cemetery",
            "type": "fill",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "landuse",
            "filter": ["==", "class", "cemetery"],
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "fill-color": "hsl(75, 37%, 81%)"
            }
        },
        {
            "id": "landuse_hospital",
            "type": "fill",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "landuse",
            "filter": ["==", "class", "hospital"],
            "paint": {
                "fill-color": "#fde"
            }
        },
        {
            "id": "landuse_school",
            "type": "fill",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "landuse",
            "filter": ["==", "class", "school"],
            "paint": {
                "fill-color": "rgb(236,238,204)"
            }
        },
        {
            "id": "waterway_river",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "waterway",
            "filter": ["==", "class", "river"],
            "layout": {
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [11, 0.5],
                        [20, 6]
                    ]
                }
            }
        },
        {
            "id": "waterway_other",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "waterway",
            "filter": ["all", ["!=", "class", "river"]],
            "layout": {
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.3,
                    "stops": [
                        [13, 0.5],
                        [20, 6]
                    ]
                }
            }
        },
        {
            "id": "water",
            "type": "fill",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "water",
            "paint": {
                "fill-color": "rgb(158,189,255)"
            }
        },
        {
            "id": "aeroway_fill",
            "type": "fill",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "aeroway",
            "minzoom": 11,
            "filter": ["==", "$type", "Polygon"],
            "paint": {
                "fill-color": "rgba(229, 228, 224, 1)",
                "fill-opacity": 0.7
            }
        },
        {
            "id": "aeroway_runway",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "aeroway",
            "minzoom": 11,
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["==", "class", "runway"]
            ],
            "paint": {
                "line-color": "#f0ede9",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [11, 3],
                        [20, 16]
                    ]
                }
            }
        },
        {
            "id": "aeroway_taxiway",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "aeroway",
            "minzoom": 11,
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["==", "class", "taxiway"]
            ],
            "paint": {
                "line-color": "#f0ede9",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [11, 0.5],
                        [20, 6]
                    ]
                }
            }
        },
        {
            "id": "tunnel_motorway_link_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "class", "motorway"],
                ["==", "ramp", 1],
                ["==", "brunnel", "tunnel"]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-dasharray": [0.5, 0.25],
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15]
                    ]
                }
            }
        },
        {
            "id": "tunnel_service_track_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "tunnel"],
                ["in", "class", "service", "track"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#cfcdca",
                "line-dasharray": [0.5, 0.25],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [15, 1],
                        [16, 4],
                        [20, 11]
                    ]
                }
            }
        },
        {
            "id": "tunnel_link_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "ramp", "1"], ["==", "brunnel", "tunnel"]],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15]
                    ]
                }
            }
        },
        {
            "id": "tunnel_street_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "tunnel"],
                ["in", "class", "street", "street_limited"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#cfcdca",
                "line-opacity": {
                    "stops": [
                        [12, 0],
                        [12.5, 1]
                    ]
                },
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15]
                    ]
                }
            }
        },
        {
            "id": "tunnel_secondary_tertiary_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "tunnel"],
                ["in", "class", "secondary", "tertiary"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [8, 1.5],
                        [20, 17]
                    ]
                }
            }
        },
        {
            "id": "tunnel_trunk_primary_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "tunnel"],
                ["in", "class", "primary", "trunk"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0.4],
                        [6, 0.7],
                        [7, 1.75],
                        [20, 22]
                    ]
                }
            }
        },
        {
            "id": "tunnel_motorway_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "class", "motorway"],
                ["==", "brunnel", "tunnel"]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-dasharray": [0.5, 0.25],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0.4],
                        [6, 0.7],
                        [7, 1.75],
                        [20, 22]
                    ]
                }
            }
        },
        {
            "id": "tunnel_path_pedestrian",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["==", "brunnel", "tunnel"],
                ["in", "class", "path", "pedestrian"]
            ],
            "paint": {
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [1, 0.75],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [14, 0.5],
                        [20, 10]
                    ]
                }
            }
        },
        {
            "id": "tunnel_motorway_link",
            "metadata": {},
            "paint": {
                "line-color": "#fc8",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "class", "motorway_link"],
                ["==", "ramp", 1],
                ["==", "brunnel", "tunnel"]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            }
        },
        {
            "id": "tunnel_service_track",
            "metadata": {},
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [15.5, 0],
                        [16, 2],
                        [20, 7.5]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "tunnel"],
                ["in", "class", "service", "track"]
            ],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "tunnel_link",
            "metadata": {},
            "paint": {
                "line-color": "#fff4c6",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "ramp", "1"], ["==", "brunnel", "tunnel"]],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "tunnel_minor",
            "metadata": {},
            "paint": {
                "line-color": "#fff",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "brunnel", "tunnel"], ["in", "class", "minor"]],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "tunnel_secondary_tertiary",
            "metadata": {},
            "paint": {
                "line-color": "#fff4c6",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 10]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "tunnel"],
                ["in", "class", "secondary", "tertiary"]
            ],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "tunnel_trunk_primary",
            "metadata": {},
            "paint": {
                "line-color": "#fff4c6",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0],
                        [7, 1],
                        [20, 18]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "tunnel"],
                ["in", "class", "primary", "trunk"]
            ],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "tunnel_motorway",
            "metadata": {},
            "paint": {
                "line-color": "#ffdaa6",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0],
                        [7, 1],
                        [20, 18]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "class", "motorway"],
                ["==", "brunnel", "tunnel"]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            }
        },
        {
            "id": "tunnel_major_rail",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "brunnel", "tunnel"], ["in", "class", "rail"]],
            "paint": {
                "line-color": "#bbb",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2]
                    ]
                }
            }
        },
        {
            "id": "tunnel_major_rail_hatching",
            "metadata": {},
            "paint": {
                "line-color": "#bbb",
                "line-dasharray": [0.2, 8],
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [14.5, 0],
                        [15, 3],
                        [20, 8]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "brunnel", "tunnel"], ["==", "class", "rail"]]
        },
        {
            "id": "road_area_pattern",
            "metadata": {},
            "paint": {
                "fill-pattern": "pedestrian_polygon"
            },
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "$type", "Polygon"]],
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "road_motorway_link_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 12,
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["==", "class", "motorway"],
                ["==", "ramp", 1]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15]
                    ]
                }
            }
        },
        {
            "id": "road_service_track_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["in", "class", "service", "track"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#cfcdca",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [15, 1],
                        [16, 4],
                        [20, 11]
                    ]
                }
            }
        },
        {
            "id": "road_link_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 13,
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["!in", "class", "pedestrian", "path", "track", "service"],
                ["==", "ramp", "1"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15]
                    ]
                }
            }
        },
        {
            "id": "road_minor_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["!in", "brunnel", "bridge", "tunnel"],
                ["in", "class", "minor"],
                ["!=", "ramp", "1"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#cfcdca",
                "line-opacity": {
                    "stops": [
                        [12, 0],
                        [12.5, 1]
                    ]
                },
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 20]
                    ]
                }
            }
        },
        {
            "id": "road_secondary_tertiary_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["in", "class", "secondary", "tertiary"],
                ["!=", "ramp", 1]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [8, 1.5],
                        [20, 17]
                    ]
                }
            }
        },
        {
            "id": "road_trunk_primary_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["in", "class", "primary", "trunk"],
                ["!=", "ramp", 1]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0.4],
                        [6, 0.7],
                        [7, 1.75],
                        [20, 22]
                    ]
                }
            }
        },
        {
            "id": "road_motorway_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 5,
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["==", "class", "motorway"],
                ["!=", "ramp", "1"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0.4],
                        [6, 0.7],
                        [7, 1.75],
                        [20, 22]
                    ]
                }
            }
        },
        {
            "id": "road_path_pedestrian",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 14,
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["!in", "brunnel", "bridge", "tunnel"],
                ["in", "class", "path", "pedestrian"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [1, 0.7],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [14, 1],
                        [20, 10]
                    ]
                }
            }
        },
        {
            "id": "road_motorway_link",
            "metadata": {},
            "paint": {
                "line-color": "#fc8",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 12,
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["==", "class", "motorway"],
                ["==", "ramp", 1]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            }
        },
        {
            "id": "road_service_track",
            "metadata": {},
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [15.5, 0],
                        [16, 2],
                        [20, 7.5]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["in", "class", "service", "track"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            }
        },
        {
            "id": "road_link",
            "metadata": {},
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 13,
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["==", "ramp", 1],
                ["!in", "class", "pedestrian", "path", "track", "service"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            }
        },
        {
            "id": "road_secondary_tertiary",
            "metadata": {},
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [6.5, 0],
                        [8, 0.5],
                        [20, 13]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["in", "class", "secondary", "tertiary"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            }
        },
        {
            "id": "road_trunk_primary",
            "metadata": {},
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0],
                        [7, 1],
                        [20, 18]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["in", "class", "primary", "trunk"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            }
        },
        {
            "id": "road_motorway",
            "metadata": {},
            "paint": {
                "line-color": {
                    "base": 1,
                    "stops": [
                        [5, "hsl(26, 87%, 62%)"],
                        [6, "#fc8"]
                    ]
                },
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0],
                        [7, 1],
                        [20, 18]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 5,
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["==", "class", "motorway"],
                ["!=", "ramp", 1]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            }
        },
        {
            "id": "road_major_rail",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["==", "class", "rail"]
            ],
            "paint": {
                "line-color": "#bbb",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2]
                    ]
                }
            }
        },
        {
            "id": "road_major_rail_hatching",
            "metadata": {},
            "paint": {
                "line-color": "#bbb",
                "line-dasharray": [0.2, 8],
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [14.5, 0],
                        [15, 3],
                        [20, 8]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["!in", "brunnel", "bridge", "tunnel"],
                ["==", "class", "rail"]
            ]
        },
        {
            "id": "road_minor-copy",
            "metadata": {},
            "paint": {
                "line-color": "#fff",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 18]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                [
                    "all",
                    ["!in", "brunnel", "bridge", "tunnel"],
                    ["in", "class", "minor"]
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            }
        },
        {
            "id": "building",
            "type": "fill",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "building",
            "minzoom": 13,
            "maxzoom": 14,
            "paint": {
                "fill-color": "hsl(35, 8%, 85%)",
                "fill-outline-color": {
                    "base": 1,
                    "stops": [
                        [13, "hsla(35, 6%, 79%, 0.32)"],
                        [14, "hsl(35, 6%, 79%)"]
                    ]
                }
            },
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "building-3d",
            "type": "fill-extrusion",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "building",
            "minzoom": 14,
            "paint": {
                "fill-extrusion-color": "hsl(35, 8%, 85%)",
                "fill-extrusion-height": {
                    "property": "render_height",
                    "type": "identity"
                },
                "fill-extrusion-base": {
                    "property": "render_min_height",
                    "type": "identity"
                },
                "fill-extrusion-opacity": 0.8
            },
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "bridge_motorway_link_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "class", "motorway_link"],
                ["==", "ramp", 1],
                ["==", "brunnel", "bridge"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15]
                    ]
                }
            }
        },
        {
            "id": "bridge_service_track_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "bridge"],
                ["in", "class", "service", "track"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#cfcdca",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [15, 1],
                        [16, 4],
                        [20, 11]
                    ]
                }
            }
        },
        {
            "id": "bridge_link_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "class", "link"], ["==", "brunnel", "bridge"]],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15]
                    ]
                }
            }
        },
        {
            "id": "bridge_street_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "bridge"],
                ["in", "class", "street", "street_limited"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "hsl(36, 6%, 74%)",
                "line-opacity": {
                    "stops": [
                        [12, 0],
                        [12.5, 1]
                    ]
                },
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 25]
                    ]
                }
            }
        },
        {
            "id": "bridge_path_pedestrian_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["==", "brunnel", "bridge"],
                ["in", "class", "path", "pedestrian"]
            ],
            "layout": {
                "line-join": "miter",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "hsl(35, 6%, 80%)",
                "line-dasharray": [1, 0],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [14, 1.5],
                        [20, 18]
                    ]
                }
            }
        },
        {
            "id": "bridge_secondary_tertiary_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "bridge"],
                ["in", "class", "secondary", "tertiary"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [8, 1.5],
                        [20, 17]
                    ]
                }
            }
        },
        {
            "id": "bridge_trunk_primary_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "bridge"],
                ["in", "class", "primary", "trunk"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0.4],
                        [6, 0.7],
                        [7, 1.75],
                        [20, 22]
                    ]
                }
            }
        },
        {
            "id": "bridge_motorway_casing",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "class", "motorway"],
                ["==", "brunnel", "bridge"]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0.4],
                        [6, 0.7],
                        [7, 1.75],
                        [20, 22]
                    ]
                }
            }
        },
        {
            "id": "bridge_path_pedestrian",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["==", "brunnel", "bridge"],
                ["in", "class", "path", "pedestrian"]
            ],
            "paint": {
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [1, 0.3],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [14, 0.5],
                        [20, 10]
                    ]
                }
            }
        },
        {
            "id": "bridge_motorway_link",
            "metadata": {},
            "paint": {
                "line-color": "#fc8",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "class", "motorway_link"],
                ["==", "ramp", 1],
                ["==", "brunnel", "bridge"]
            ],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "bridge_service_track",
            "metadata": {},
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [15.5, 0],
                        [16, 2],
                        [20, 7.5]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "bridge"],
                ["in", "class", "service", "track"]
            ],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "bridge_link",
            "metadata": {},
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "class", "link"], ["==", "brunnel", "bridge"]],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "bridge_street",
            "metadata": {},
            "paint": {
                "line-color": "#fff",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 18]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "brunnel", "bridge"], ["in", "class", "minor"]],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "bridge_secondary_tertiary",
            "metadata": {},
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 10]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "bridge"],
                ["in", "class", "secondary", "tertiary"]
            ],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "bridge_trunk_primary",
            "metadata": {},
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0],
                        [7, 1],
                        [20, 18]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "brunnel", "bridge"],
                ["in", "class", "primary", "trunk"]
            ],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "bridge_motorway",
            "metadata": {},
            "paint": {
                "line-color": "#fc8",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [5, 0],
                        [7, 1],
                        [20, 18]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "class", "motorway"],
                ["==", "brunnel", "bridge"]
            ],
            "layout": {
                "line-join": "round"
            }
        },
        {
            "id": "bridge_major_rail",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "class", "rail"], ["==", "brunnel", "bridge"]],
            "paint": {
                "line-color": "#bbb",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2]
                    ]
                }
            }
        },
        {
            "id": "bridge_major_rail_hatching",
            "metadata": {},
            "paint": {
                "line-color": "#bbb",
                "line-dasharray": [0.2, 8],
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [14.5, 0],
                        [15, 3],
                        [20, 8]
                    ]
                }
            },
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["all", ["==", "class", "rail"], ["==", "brunnel", "bridge"]]
        },
        {
            "id": "boundary_3",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "boundary",
            "filter": ["all", ["in", "admin_level", 3, 4]],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#9e9cab",
                "line-dasharray": [5, 1],
                "line-width": {
                    "base": 1,
                    "stops": [
                        [4, 0.4],
                        [5, 1],
                        [12, 1.8]
                    ]
                }
            }
        },
        {
            "id": "boundary_2",
            "type": "line",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "boundary",
            "filter": ["all", ["==", "admin_level", 2]],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "hsl(248, 1%, 41%)",
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [0, 0.4],
                        [4, 1]
                    ]
                },
                "line-width": {
                    "base": 1,
                    "stops": [
                        [3, 1],
                        [5, 1.2],
                        [12, 3]
                    ]
                }
            }
        },
        {
            "id": "water_name_line",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "water_name",
            "filter": ["all", ["==", "$type", "LineString"]],
            "layout": {
                "text-field": "{name}",
                "text-font": ["Roboto Regular"],
                "text-max-width": 5,
                "text-size": 12,
                "symbol-placement": "line"
            },
            "paint": {
                "text-color": "#5d60be",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 1
            },
            "minzoom": 0
        },
        {
            "id": "water_name_point",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "water_name",
            "filter": ["==", "$type", "Point"],
            "layout": {
                "text-field": "{name}",
                "text-font": ["Roboto Regular"],
                "text-max-width": 5,
                "text-size": 12
            },
            "paint": {
                "text-color": "#5d60be",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 1
            },
            "minzoom": 0
        },
        {
            "id": "poi_z16",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "poi",
            "minzoom": 16,
            "filter": ["all", ["==", "$type", "Point"], [">=", "rank", 20]],
            "layout": {
                "icon-image": "{class}_11",
                "text-anchor": "top",
                "text-field": "{name}",
                "text-font": ["Roboto Condensed Italic"],
                "text-max-width": 9,
                "text-offset": [0, 0.6],
                "text-padding": 2,
                "text-size": 12
            },
            "paint": {
                "text-color": "#666",
                "text-halo-blur": 0.5,
                "text-halo-color": "#ffffff",
                "text-halo-width": 1
            }
        },
        {
            "id": "poi_z15",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "poi",
            "minzoom": 15,
            "filter": [
                "all",
                ["==", "$type", "Point"],
                [">=", "rank", 7],
                ["<", "rank", 20]
            ],
            "layout": {
                "icon-image": "{class}_11",
                "text-anchor": "top",
                "text-field": "{name}",
                "text-font": ["Roboto Condensed Italic"],
                "text-max-width": 9,
                "text-offset": [0, 0.6],
                "text-padding": 2,
                "text-size": 12
            },
            "paint": {
                "text-color": "#666",
                "text-halo-blur": 0.5,
                "text-halo-color": "#ffffff",
                "text-halo-width": 1
            }
        },
        {
            "id": "poi_z14",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "poi",
            "minzoom": 14,
            "filter": [
                "all",
                ["==", "$type", "Point"],
                [">=", "rank", 1],
                ["<", "rank", 7]
            ],
            "layout": {
                "icon-image": "{class}_11",
                "text-anchor": "top",
                "text-field": "{name}",
                "text-font": ["Roboto Condensed Italic"],
                "text-max-width": 9,
                "text-offset": [0, 0.6],
                "text-padding": 2,
                "text-size": 12
            },
            "paint": {
                "text-color": "#666",
                "text-halo-blur": 0.5,
                "text-halo-color": "#ffffff",
                "text-halo-width": 1
            }
        },
        {
            "id": "poi_transit",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "poi",
            "layout": {
                "icon-image": "{maki}_11",
                "text-anchor": "left",
                "text-field": "{name_en}",
                "text-font": ["Roboto Condensed Italic"],
                "text-max-width": 9,
                "text-offset": [0.9, 0],
                "text-padding": 2,
                "text-size": 12,
                "visibility": "visible"
            },
            "paint": {
                "text-color": "#4898ff",
                "text-halo-blur": 0.5,
                "text-halo-color": "#ffffff",
                "text-halo-width": 1
            },
            "filter": ["all", ["in", "class", "bus", "rail", "airport"]]
        },
        {
            "id": "road_label",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation_name",
            "filter": ["all"],
            "layout": {
                "symbol-placement": "line",
                "text-anchor": "center",
                "text-field": "{name}",
                "text-font": ["Roboto Regular"],
                "text-offset": [0, 0.15],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [13, 12],
                        [14, 13]
                    ]
                }
            },
            "paint": {
                "text-color": "#765",
                "text-halo-blur": 0.5,
                "text-halo-width": 1
            }
        },
        {
            "id": "road_shield",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "transportation_name",
            "minzoom": 7,
            "filter": ["all", ["<=", "ref_length", 6]],
            "layout": {
                "icon-image": "default_{ref_length}",
                "icon-rotation-alignment": "viewport",
                "symbol-placement": {
                    "base": 1,
                    "stops": [
                        [10, "point"],
                        [11, "line"]
                    ]
                },
                "symbol-spacing": 500,
                "text-field": "{ref}",
                "text-font": ["Roboto Regular"],
                "text-offset": [0, 0.1],
                "text-rotation-alignment": "viewport",
                "text-size": 10,
                "icon-size": 0.8
            },
            "paint": {}
        },
        {
            "id": "place_other",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": [
                "all",
                ["in", "class", "hamlet", "island", "islet", "neighbourhood", "suburb"]
            ],
            "layout": {
                "text-field": "{name_en}",
                "text-font": ["Roboto Condensed Italic"],
                "text-letter-spacing": 0.1,
                "text-max-width": 9,
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [12, 10],
                        [15, 14]
                    ]
                },
                "text-transform": "uppercase"
            },
            "paint": {
                "text-color": "#633",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "place_village",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": ["all", ["==", "class", "village"]],
            "layout": {
                "text-field": "{name_en}",
                "text-font": ["Roboto Regular"],
                "text-max-width": 8,
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [10, 12],
                        [15, 22]
                    ]
                }
            },
            "paint": {
                "text-color": "#333",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "place_town",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": ["all", ["==", "class", "town"]],
            "layout": {
                "icon-image": {
                    "base": 1,
                    "stops": [
                        [0, "dot_9"],
                        [8, ""]
                    ]
                },
                "text-anchor": "bottom",
                "text-field": "{name_en}",
                "text-font": ["Roboto Regular"],
                "text-max-width": 8,
                "text-offset": [0, 0],
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [7, 12],
                        [11, 16]
                    ]
                }
            },
            "paint": {
                "text-color": "#333",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "place_city",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "place",
            "minzoom": 5,
            "filter": ["all", ["==", "class", "city"]],
            "layout": {
                "icon-image": {
                    "base": 1,
                    "stops": [
                        [0, "dot_9"],
                        [8, ""]
                    ]
                },
                "text-anchor": "bottom",
                "text-field": "{name_en}",
                "text-font": ["Roboto Medium"],
                "text-max-width": 8,
                "text-offset": [0, 0],
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [7, 14],
                        [11, 24]
                    ]
                },
                "icon-allow-overlap": true,
                "icon-optional": false
            },
            "paint": {
                "text-color": "#333",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "state",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "place",
            "maxzoom": 6,
            "layout": {
                "text-field": "{name_en}",
                "text-font": ["Roboto Condensed Italic"],
                "text-size": {
                    "stops": [
                        [4, 11],
                        [6, 15]
                    ]
                },
                "text-transform": "uppercase"
            },
            "paint": {
                "text-color": "#633",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 1
            },
            "filter": ["all", ["==", "class", "state"]]
        },
        {
            "id": "country_3",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": ["all", [">=", "rank", 3], ["==", "class", "country"]],
            "layout": {
                "text-field": "{name_en}",
                "text-font": ["Roboto Condensed Italic"],
                "text-max-width": 6.25,
                "text-size": {
                    "stops": [
                        [3, 11],
                        [7, 17]
                    ]
                },
                "text-transform": "none"
            },
            "paint": {
                "text-color": "#334",
                "text-halo-blur": 1,
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 1
            }
        },
        {
            "id": "country_2",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": ["all", ["==", "rank", 2], ["==", "class", "country"]],
            "layout": {
                "text-field": "{name_en}",
                "text-font": ["Roboto Condensed Italic"],
                "text-max-width": 6.25,
                "text-size": {
                    "stops": [
                        [2, 11],
                        [5, 17]
                    ]
                },
                "text-transform": "none"
            },
            "paint": {
                "text-color": "#334",
                "text-halo-blur": 1,
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 1
            }
        },
        {
            "id": "country_1",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": ["all", ["==", "rank", 1], ["==", "class", "country"]],
            "layout": {
                "text-field": "{name_en}",
                "text-font": ["Roboto Condensed Italic"],
                "text-max-width": 6.25,
                "text-size": {
                    "stops": [
                        [1, 11],
                        [4, 17]
                    ]
                },
                "text-transform": "none"
            },
            "paint": {
                "text-color": "#334",
                "text-halo-blur": 1,
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 1
            }
        },
        {
            "id": "continent",
            "type": "symbol",
            "metadata": {},
            "source": "openmaptiles",
            "source-layer": "place",
            "maxzoom": 1,
            "layout": {
                "text-field": "{name_en}",
                "text-font": ["Roboto Condensed Italic"],
                "text-size": 13,
                "text-transform": "uppercase",
                "text-justify": "center"
            },
            "paint": {
                "text-color": "#633",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 1
            },
            "filter": ["all", ["==", "class", "continent"]]
        }
    ]
}

const LABELS = {
    none: {
        id: 'none',
        label: 'No labels',
        value: 'none',
    },
    light: {
        id: 'light',
        label: 'Labels light',
        value: 'light',
    },
    dark: {
        id: 'dark',
        label: 'Labels dark',
        value: 'dark',
    },
};

const BOUNDARIES = {
    dark: {
        id: "dark",
        label: "Show boundaries",
        value:
            "https://api.mapbox.com/styles/v1/resourcewatch/cjgcf8qdaai1x2rn6w3j4q805/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w",
    },
};

const BASEMAPS = {
    dark: {
        id: 'dark',
        value: 'dark',
        label: 'Dark',
        options: {
            attribution:
                '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>',
        },
    },
    light: {
        id: 'light',
        value: 'light',
        label: 'Light',
        options: {
            attribution:
                '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>',
        },
    },
    satellite: {
        id: 'satellite',
        value: 'satellite',
        label: 'Satellite',
        options: {
            attribution:
                '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>',
        },
    },
};

const DEFAULT_VIEWPORT = {
    zoom: 2,
    latitude: 0,
    longitude: 0,
    pitch: 0,
    bearing: 0,
    transitionDuration: 250,
};

export {DEFAULT_MAP_STYLE, DEFAULT_VIEWPORT, LABELS, BOUNDARIES, BASEMAPS};

