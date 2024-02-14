/**
 * External dependencies
 */
import {useState} from 'react';

/**
 * Takes an initialition function and returns a memoized result of
 * that function. This value is not subject to cache purging
 * and will only call your initialization function once.
 *
 * ie
 * ```js
 * function SomeComponent() {
 *   const id = useInitializedValue(() => generateId());
 *   // ...
 * }
 * ```
 *
 * @param {Function} initializer - initialization function
 * @return {any} result of initializer
 */
function useInitializedValue(initializer) {
    return useState(initializer)[0];
}

export default useInitializedValue;
