var ut = require('../Utils');
var Exchange = require('../Exchange');

var Endpoint = module.exports = function(options){
	this.endpointUri = "defaultUri";
    this.component;    
    ut.mixin(this,options);
};

Endpoint.prototype.createProducer;
Endpoint.prototype.createConsumer;
Endpoint.prototype.createExchange = function(options){
    return new Exchange(options);
}