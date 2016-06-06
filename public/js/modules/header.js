var $ = jQuery = require('jquery');

module.exports = function() {
    
    var $body = $('body');
    
    $('#header .hamburger').on('click', function() {
        var $btn = $(this);
        
        $body.toggleClass('nav-open');
        
        return false;
    });
    
}();