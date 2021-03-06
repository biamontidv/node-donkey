
var ComponentFactory = module.exports = (function(){    
    var registry = {};
    
    function create(name){
        var Component = require('donkey-'+name);
        var ret = new Component();
        return ret;
    }
    
    function get(name){
        var ret = registry[name];
        if(ret === undefined){
            console.log('Component '+name+' does not exist yet, creating it now');
            ret = create(name);
            registry[name] = ret;
        }
        return ret;
    }
    
    return {
        'get': get
        };
})();