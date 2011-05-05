var util = require(process.binding('natives').util ? 'util' : 'sys');
var Endpoint = require('../Endpoint');
var LogProducer = require('./LogProducer');


var LogEndpoint = module.exports = function LogEndpoint(options){
    Endpoint.call(this,options);
    this.producer = this.createProducer();
};
util.inherits(LogEndpoint, Endpoint);

LogEndpoint.prototype.createProducer = function(){
    return new LogProducer({'endpoint':this});
};
LogEndpoint.prototype.addConsumer = function(consumer){
    this.consumer = consumer;
};