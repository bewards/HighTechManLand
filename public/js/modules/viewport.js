var $ = jQuery = require('jquery');
var dispatcher = require('./dispatcher');

module.exports = function () {

    var $window = $(window);
    var $document = $(document);
    var $htmlBody = $('html, body');

    var documentHeight = '';

    var currentViewport = {
        width: 0,
        height: 0
    };

    var callbacks = {
        scroll: [],
        scrollUp: [],
        scrollDown: [],
        resize: []
    };

    //public methods
    function resize(callback) {
        callbacks.resize.push(callback);
    }

    function get() {
        return currentViewport;
    }

    //private methods
    function updateCurrentViewport() {
        currentViewport.width = $window.width();
        currentViewport.height = $window.height();
    }

    function handleResize() {
        updateCurrentViewport();
        dispatcher.fireCallbacks(callbacks.resize);
    }

    function checkHtmlSize() {
        if (documentHeight !== $document.height()) {
            documentHeight = $document.height();

            handleResize();
        }
    }

    function checkHtmlResize() {
        setInterval(checkHtmlSize, 1);
    }

    function load() {
        updateCurrentViewport();
        $window.resize(handleResize);
        checkHtmlResize();
    }

    load();

    return {
        resize: resize,
        get: get
    };
}();