var $ = jQuery = require('jquery');

/**
 * @module dispatcher test
 */

module.exports = function () {
    /* fireCallback */

    function fireCallback(callback, parameter) {
        if ($.isFunction(callback)) {
            callback(parameter);
        }
    }

    function fireCallbacks(callbacks, parameter) {
        for (var i = 0; i < callbacks.length; i++) {
            fireCallback(callbacks[i], parameter);
        }
    }

    return {
        fireCallbacks: fireCallbacks
    };
}();