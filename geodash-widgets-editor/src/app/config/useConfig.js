/**
 * External dependencies
 */
import {identity, useContextSelector} from 'utils';
/**
 * Internal dependencies
 */
import Context from './context';

function useConfig(selector) {
    return useContextSelector(Context, selector ?? identity);
}

export default useConfig;
