import * as types from "./types";

const loadInitial = (dispatch) => (payload) => {
    return dispatch({
        type: types.LOAD_INITIAL,
        payload: payload
    });
};

const updateWidgetConfig = (dispatch) => (payload) => {
    return dispatch({
        type: types.UPDATE_WIDGET_CONFIG,
        payload: payload,
    });
}


const updateDatasets = (dispatch) => (payload) => {
    return dispatch({
        type: types.UPDATE_DATASETS,
        payload: payload,
    });
}

const updateDatasetsLoading = (dispatch) => (payload) => {
    return dispatch({
        type: types.UPDATE_DATASETS_LOADING,
        payload: payload,
    });
}


export const exposedActions = {
    loadInitial,
    updateWidgetConfig,
    updateDatasets,
    updateDatasetsLoading
}