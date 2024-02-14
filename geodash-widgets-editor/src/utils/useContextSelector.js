/**
 * External dependencies
 */
import {useContextSelector as useContextSelectorOrig} from 'use-context-selector';

/**
 * Internal dependencies
 */
import {useRef} from './react';
import shallowEqual from './shallowEqual';

/**
 * This hook returns a part of the context value by selector.
 * It will trigger a re-render only if the selected value has changed.
 *
 * By default, a shallow equals of the selected context value is used to
 * determine if a re-render is needed.
 *
 * @param {import('react').Context} context Context.
 * @param {function(Object):Object} selector Returns a fragment of the context
 * that the consumer is interested in.
 * @param {function(Object, Object):boolean} equalityFn Used to compare the
 * selected context value. If the context fragment has not changed, a re-render
 * will not be triggered. This is {shallowEqual} by default.
 * @return {Object} The selected context value fragment.
 */
function useContextSelector(context, selector, equalityFn = shallowEqual) {
    const ref = useRef();

    const equalityFnCallback = (state) => {
        const selected = selector(state);
        if (equalityFn(ref.current, selected)) {
            return ref.current;
        }
        ref.current = selected;
        return selected;
    };

    // Update the selector fn to memoize the selected value by [equalityFn].
    const patchedSelector = equalityFn ? equalityFnCallback : selector;
    return useContextSelectorOrig(context, patchedSelector);
}

export default useContextSelector;
