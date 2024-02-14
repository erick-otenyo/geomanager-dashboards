import {shallowEqualArrays, shallowEqualObjects} from 'shallow-equal';

function shallowEqual(a, b) {
    if (a === b) {
        return true;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        return shallowEqualArrays(a, b);
    }

    if (typeof a === 'object' && typeof b === 'object') {
        return shallowEqualObjects(a, b);
    }

    return false;
}

export default shallowEqual;
