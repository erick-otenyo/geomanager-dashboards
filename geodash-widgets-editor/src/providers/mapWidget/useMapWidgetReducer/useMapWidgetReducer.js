import {useMemo, useReducer} from 'utils';
import reducer from './reducer';

import {exposedActions} from './actions';
import {DEFAULT_MAP_STYLE} from "map-config";

const INITIAL_STATE = {
    "datasets": [],
    "datasetsLoading": false,
    "initialLoaded": false,
    "widgetConfig": {
        "title": "",
        "description": null,
        "caption": null,
        "dataset": null,
        "layer_type": null,
        "layer": null,
        "basemap": "light",
        "labels": "dark",
        "show_boundary": true,
        "has_time": false,
        "time": null,
        "lat": 0,
        "lng": 0,
        "zoom": 2,
        "bounds": null,
    },
    "mapConfig": {
        "mapStyle": DEFAULT_MAP_STYLE,
    }
};

function useMapWidgetReducer(partial) {
    const [state, dispatch] = useReducer(reducer, {
        ...INITIAL_STATE,
        ...partial,
    });

    const wrappedActions = useMemo(() => {
        const wrapWithDispatch = (actions) =>
            Object.keys(actions).reduce(
                (collection, action) => ({
                    ...collection,
                    [action]: actions[action](dispatch),
                }),
                {}
            );
        return wrapWithDispatch(exposedActions)
    }, [dispatch]);

    return {
        state,
        ...wrappedActions
    };
}

export default useMapWidgetReducer;
