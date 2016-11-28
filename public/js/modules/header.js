var $ = jQuery = require('jquery');

module.exports = function() {
    
    var $body = $('body');
    var $hamburger = $('#header .hamburger');
    
    $hamburger.on('click', function() {
        var $btn = $(this);
        
        $body.toggleClass('nav-open');
        
        return false;
    });
    
    $body.on('mouseup', function(e) {
        if (document.documentElement.clientWidth < 768) {
            var $navContainer = $hamburger.next();
            if ($body.hasClass('nav-open') && !$navContainer.is(e.target) && $navContainer.has(e.target).length === 0 && !$hamburger.is(e.target.parentElement)) {
                $hamburger.trigger('click');
            }
        }
    });
    
}();