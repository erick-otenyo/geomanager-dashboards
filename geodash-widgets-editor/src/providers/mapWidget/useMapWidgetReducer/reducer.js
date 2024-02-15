import * as types from "./types";

const loadInitial = (state, payload) => {
    return {
        ...state,
        initialLoaded: true,
        widgetConfig: {
            ...state.widgetConfig,
            ...payload,
        },
    };
}

const updateWidgetConfig = (state, payload) => {
    return {
        ...state,
        widgetConfig: {
            ...state.widgetConfig,
            ...payload,
        },
    };
}


const updateDatasets = (state, payload) => {
    return {
        ...state,
        datasets: payload,
    };
}

const updateDatasetsLoading = (state, payload) => {
    return {
        ...state,
        datasetsLoading: payload,
    };
}


function reducer(state, {type, payload}) {
    switch (type) {
        case types.LOAD_INITIAL: {
            return loadInitial(state, payload);
        }

        case types.UPDATE_WIDGET_CONFIG: {
            return updateWidgetConfig(state, payload);
        }

        case types.UPDATE_DATASETS: {
            return updateDatasets(state, payload);
        }
        case types.UPDATE_DATASETS_LOADING: {
            return updateDatasetsLoading(state, payload);
        }

        default:
            return state;
    }
}

export default reducer;
