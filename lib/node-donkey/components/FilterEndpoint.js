var util = require(process.binding('natives').util ? 'util' : 'sys');
var Endpoint = require('./Endpoint');
var Consumer = require('./Consumer');
var Producer = require('./Producer');
var ut = require('../Utils');


var FilterConsumer = function FilterConsumer(options){
    Consumer.call(this,options);
    console.log('['+this.constructor.name+'-'+this.endpoint.uri+'] emitting ready for first time');
    this.emit('ready');
    
};
util.inherits(FilterConsumer, Consumer);

FilterConsumer.prototype.process = function(exchange){ 
    
    if (this.predicate.evaluate(exchange)){
    	this.emit('exchangeOut',exchange);
	} else {
		this.emit('exchangeDiscarded',exchange);
	};
};


var FilterProducer = function FilterProducer(options){
    Producer.call(this,options);    
    console.log('['+this.constructor.name+'-'+this.endpoint.uri+'] emitting ready for first time');
    this.emit('ready');
};
util.inherits(FilterProducer, Producer);

FilterProducer.prototype.process = function(exchange){
    this.endpoint.consumer.process(exchange);
};



var FilterEndpoint = module.exports = function FilterEndpoint(options){
    Endpoint.call(this,options);
	var self = this;
    this.consumer = new FilterConsumer({'endpoint':this,'predicate':this.predicate});
    this.producer = new FilterProducer({'endpoint':this});
};
util.inherits(FilterEndpoint, Endpoint);

