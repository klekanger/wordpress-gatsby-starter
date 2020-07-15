"use strict";
var lodash_1 = require('lodash');
var deep_map_keys_1 = require('./deep-map-keys');
function deepMapKeys(object, mapFn, options) {
    options = lodash_1.isNil(options) ? {} : options;
    if (!mapFn) {
        throw new Error('mapFn is required');
    }
    else if (!lodash_1.isFunction(mapFn)) {
        throw new TypeError('mapFn must be a function');
    }
    else if (!lodash_1.isObject(options)) {
        throw new TypeError('options must be an object');
    }
    return new deep_map_keys_1.DeepMapKeys(mapFn, options).map(object);
}
module.exports = deepMapKeys;
//# sourceMappingURL=index.js.map