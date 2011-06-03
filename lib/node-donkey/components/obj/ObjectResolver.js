


var ObjectResolver = module.exports = (function ObjectProducer(options){
    
    var registry = {};
    
    function lookup(objId){
        console.log('current dir: '+__dirname);
         var obj = require(objId);
         return obj;
    };
    
    function resolve(objId){
        console.log(registry);
        var obj = registry[objId];
        if(obj === undefined){
            console.log('Object '+objId+' not in registry');
            obj = lookup(objId);
            registry[objId] = obj;            
        };      
        return obj;
    };
    
    
    return { 'resolve': resolve,
            'register': function(name,obj){
                registry[name] = obj;
                }};
})();