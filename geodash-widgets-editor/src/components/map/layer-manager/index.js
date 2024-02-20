import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {LayerManager as VizzLayerManager, Layer} from "@wmo-raf/layer-manager/dist/components";
import {PluginMapboxGl} from "@wmo-raf/layer-manager";


import {parseLayers} from './utils';

const LayerManager = ({layers, map, providers}) => {


    const parsedLayers = useMemo(() => parseLayers(layers), [layers]);
    return (
        <VizzLayerManager map={map} plugin={PluginMapboxGl} providers={{}}>
            {parsedLayers.map((_layer) => (
                <Layer
                    key={_layer.id}
                    {..._layer}
                />
            ))}
        </VizzLayerManager>
    );
};

LayerManager.propTypes = {
    layers: PropTypes.array,
    providers: PropTypes.shape({}),
    map: PropTypes.shape({
        MAPSTYLES: PropTypes.string,
        VIEWPORT: PropTypes.object,
        providers: PropTypes.object,
        mapboxToken: PropTypes.string
    })
};


export default LayerManager;
