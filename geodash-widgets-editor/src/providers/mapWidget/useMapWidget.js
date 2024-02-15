/**
 * External dependencies
 */
import {identity, useContextSelector} from 'utils';
/**
 * Internal dependencies
 */
import Context from './context';

function useMapWidget(selector) {
    return useContextSelector(Context, selector ?? identity);
}

export default useMapWidget;
