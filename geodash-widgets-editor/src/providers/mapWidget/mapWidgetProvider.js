import Context from './context';

import useMapWidgetReducer from './useMapWidgetReducer';
import {useEffect} from "react";

function MapWidgetProvider({initialEdits, children}) {
    const {
        state: reducerState,
        loadInitial,
        ...actions
    } = useMapWidgetReducer({});


    useEffect(() => {
        loadInitial(initialEdits);
    }, [initialEdits]);

    const state = {
        state: reducerState,
        actions: {
            ...actions
        },
    };

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    )
}

export default MapWidgetProvider;