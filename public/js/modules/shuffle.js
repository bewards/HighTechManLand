var $ = jQuery = require('jquery');
require('shufflejs');

module.exports = function() {
    
    var Shuffler = (function() {
        
        var $grid,
            $sizer,
            $categories,
            categories = [];
        
        var gutterWidths = {
            1170: 30,
            940: 20,
            724: 20
        };
        
        // returns true if any filter array is populated
        function hasActiveFilters() {
            return categories.length > 0;
        }
        
        // returns true if any value in both arrays match OR if a single array contains a value
        function valueInArrays(arr1, arr2) {
            if (typeof arr1 === "object" && typeof arr2 === "object") {
                return arr1.some(function (a) {
                    return arr2.indexOf(a) >= 0;
                });
            } else {
                return $.inArray(arr1, arr2) !== -1;
            }
        }
        
        // If a shapes filter is active
        function itemPassesFilters(data) {
            if (categories.length > 0 && !valueInArrays(data.categories, categories)) {
                return false;
            }
            return true;
        }
        
        function filter() {
            if (hasActiveFilters()) {
                $grid.shuffle('shuffle', function ($el) {
                    return itemPassesFilters($el.data());
                });
            } else {
                $grid.shuffle('shuffle', 'all');
            }
        }
        
        function initFilters() {
            
            // categories filter
            $categories.find('input').on('change', function() {
                var $checked = $categories.find('input:checked'),
                    groups = [];

                if ($checked.length !== 0) {
                    $checked.each(function () {
                        groups.push(this.value);
                    });
                }
                categories = groups;
                
                filter();
            });
        }
        
        function initShuffle() {
            $grid.shuffle({
                itemSelector: '.post',
                easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
//                gutterWidth: function (containerWidth) {
//                    var gutter = gutterWidths[containerWidth];
//                    if (gutter === undefined) {
//                        gutter = 0;
//                    }
//                    return gutter;
//                },
                sizer: $sizer,
                speed: 250
            });
        }
        
        function setVars() {
            $categories = $('.filter-group.categories');
            $sizer = $grid.find('.sizer');
        }
        
        function init() {
            $grid = $('.js-shuffle');
            if ($grid.length) {
                setVars();
                initFilters();
                initShuffle();
            }
        }
        
        return {
            init: init
        };
    })();
    
    Shuffler.init();
    
}();