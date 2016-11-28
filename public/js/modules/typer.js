var $ = jQuery = require('jquery');
require('typed.js');

module.exports = function() {
    
    var $typedModules = $('.typed');
    
    $typedModules.each(function(e) {
        
        var $typedModule = $(this);
        var $stringEls = $typedModule.find('.typed-strings');
        var $typer = $typedModule.find('.typer');
        if ($stringEls && $typer) {
            $typer.typed({
                stringsElement: $stringEls,
                loop: true,
                backDelay: 3000,
                typeSpeed: 100
            });
        }
    });
    
}();