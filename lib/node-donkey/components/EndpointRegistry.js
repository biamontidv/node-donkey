
var EndpointRegistry = module.exports = (function(){
    var url = require('url');
    var qs = require('querystring');
    var ComponentFactory = require('./ComponentFactory');
    
    var registry = {};
    
    function parseUri(uri){
        var uriObj = url.parse(uri,true);
        var ret = {};
       // console.log('received URI: '+uri);
        ret.name = uriObj.protocol.substring(0,uriObj.protocol.length-1);
        ret.param = uriObj.query;
        ret.path = uriObj.host || ''+uriObj.pathname || '';
        ret.uri = uriObj.href;
        
       // console.log(ret);
        
        return ret;
    }
    
    function create(uri){
        var obj = parseUri(uri);
        var ret = ComponentFactory.get(obj.name).createEndpoint({'uri':obj.uri,'path':obj.path,'param':obj.param});
        return ret;
    }
    
    function get(uri){
        var ret = registry[uri];
        if(ret === undefined){
            console.log('Enpoint '+uri+' does not exist yet, creating it now');
            ret = create(uri);
            registry[uri] = ret;
        }
        return ret;
    }
    
    return {
        'get': get
        };
})();