
var ModelFactory = module.exports = (function(){
    function create(name,options){
        var modelName = name[0].toUpperCase()+name.substring(1);
        var Model = require('./'+modelName+'Definition');
        
        return new Model(options);
    };
    
    return {
        'create': create
        }
})()