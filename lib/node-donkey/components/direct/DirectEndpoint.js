var util = require(process.binding('natives').util ? 'util' : 'sys');
var Endpoint = require('../Endpoint');
var DirectProducer = require('./DirectProducer');
var DirectConsumer = require('./DirectConsumer');


var DirectEndpoint = module.exports = function DirectEndpoint(options){
    Endpoint.call(this,options);
    this.producer = this.createProducer();
    this.consumer = this.createConsumer();
};
util.inherits(DirectEndpoint, Endpoint);

DirectEndpoint.prototype.createProducer = function(){
    return new DirectProducer({'endpoint':this});
};
DirectEndpoint.prototype.createConsumer = function(){
    return new DirectConsumer({'endpoint':this});
};
DirectEndpoint.prototype.addConsumer = function(consumer){
    this.consumer = consumer;
};