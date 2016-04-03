module.exports = function() {
    
    var Shuffler = (function() {
        
        function init() {
            console.log("shuffler init");
        }
        
        return {
            init: init
        }
    })();
    
    Shuffler.init();
}();