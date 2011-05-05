
var ComponentFactory = module.exports = (function(){
    var url = require('url');
    var qs = require('querystring');
    
    function parseUri(uri){
        var uriObj = url.parse(uri,true);
        var ret = {};
        
        ret.name = uriObj.protocol.substring(0,uriObj.protocol.length-1);
        ret.param = uriObj.query;
        ret.path = uriObj.host || ''+uriObj.pathname || '';
        ret.uri = uriObj.href;
        
        return ret;
    }
    
    function create(uri){
        var obj = parseUri(uri);
        var componentDir = obj.name.toLowerCase();
        var componentName = obj.name[0].toUpperCase()+obj.name.substring(1);
        var Component = require('./'+componentDir+'/'+componentName+'Component');

        var ret = new Component({'uri':obj.uri,'path':obj.path,'param':obj.param});
        return ret
    }
    
    return {
        'create': create
        };
})();