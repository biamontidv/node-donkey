var ut = require('../Utils');

var Component = module.exports = function(options){

	ut.mixin(this,options);
};

Component.prototype.newEndpoint = function(uri){
    //TODO get the remaining path and parameters from uri
    return this.createEndpoint(uri,path,parameters);
}