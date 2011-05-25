var util = require(process.binding('natives').util ? 'util' : 'sys');
var ut = require('../Utils');
var Exchange = require('../Exchange');

var Endpoint = module.exports = function(options){
    process.EventEmitter.call(this);
	this.uri = "defaultUri";
    this.component;    
    ut.mixin(this,options);
    console.log('New '+this.constructor.name+' created');

};

util.inherits(Endpoint, process.EventEmitter);


Endpoint.prototype.createProducer;
Endpoint.prototype.createConsumer;
Endpoint.prototype.createExchange = function(options){
    return new Exchange(options);
};
