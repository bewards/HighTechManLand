/* 
 This is meant to solve the common problem we have with needing to set consistent heights to items 
 that will be visually side by side but within container items.

  Options
    data-equalizer-dynamic: set on the same html element as data-equalizer, this option makes the
        calculation of rows responsive so that heights are so appropriately when 1-N columns in a
        row across breakpoints.

*/

var $ = jQuery = require('jquery');
var viewport = require('./viewport');

module.exports = function () {

    var $equalizeContainers = $("[data-equalizer]"),
        $equalizeContainersImageAlign = $("[data-equalizer-image-align]"),
        doNotEqualizeIfHasClasses = ".test";

    function equalize($equalizeContainer, cols) {

        var maxHeight = 0;
        var $equalizedItems = $equalizeContainer.find('[data-equalizer-watch]');

        // do not equalize
        if ($equalizeContainer.is(doNotEqualizeIfHasClasses)) {
            $equalizedItems.height('inherit');
            return;
        }

        // if dynamic mode has grouped rows, equalize cols by grouped row
        if (typeof cols !== 'undefined') {

            while ($equalizedItems.length) {
                var currentEqualizedItemGroup = $($equalizedItems.splice(0, cols));

                maxHeight = 0;
                currentEqualizedItemGroup.height('inherit');
                currentEqualizedItemGroup.each(function (i, element) {
                    var height = $(element).outerHeight();
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                });
                currentEqualizedItemGroup.height(maxHeight);
            }
        } else {
            $equalizedItems.height('inherit');
            $equalizedItems.each(function (i, element) {
                var height = $(element).height();
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });
            $equalizedItems.height(maxHeight);
        }
    }

    function equalizeImages($equalizeContainer, cols) {

        var maxHeight = 0;
        var $equalizedItems = $equalizeContainer.find('[data-equalizer-watch]');

        // do not equalize
        if ($equalizeContainer.is(doNotEqualizeIfHasClasses)) {
            $equalizedItems.height('inherit');
            return;
        }

        if ($equalizedItems.length < 2) {
            $equalizedItems.height('inherit');
            return;
        }

        $equalizedItems.height('inherit');
        $equalizedItems.each(function (i, element) {
            var $image = $(element).find('svg, img');
            $(element).height($image.height());
            var height = $(element).height();
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        $equalizedItems.height(maxHeight);
    }

    /* Summary: gets the column count of the first row in order to split all the columns into groups if set to dynamic mode
        - previous data-equalizer-watch elements may not be direct siblings, so we can get the collected columns of a row by index instead
    */
    function getRowColCount($container) {
        var $cols = $container.find('[data-equalizer-watch]');
        if ($cols) {

            var tempCount = 0;
            $cols.each(function (index) {
                var $col = $(this);

                if (index - 1 >= 0) {
                    if ($col.offset().top !== $cols.eq(index - 1).offset().top) {
                        return false;
                    }
                    tempCount++;
                } else {
                    tempCount++;
                }
            });
            return tempCount;
        }
        return $cols.length;
    }

    function equalizeAll() {
        $equalizeContainers.each(function (i, element) {
            var $container = $(element);

            // if need equalize each row group in container
            if (typeof $container.attr('data-equalizer-dynamic') === "string") {
                var rowColCount = getRowColCount($container);

                equalize($container, rowColCount);
            } else {
                equalize($container);
            }
        });
        $equalizeContainersImageAlign.each(function (i, element) {
            var $container = $(element);
            equalizeImages($container);
        });
    }

    function load() {
        //equalizeAll();
        viewport.resize(equalizeAll);
    }

    $(document).ready(function () {
        load();
    });
}();