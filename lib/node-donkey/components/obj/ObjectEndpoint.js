var util = require(process.binding('natives').util ? 'util' : 'sys');
var Endpoint = require('../Endpoint');
var ObjectProducer = require('./ObjectProducer');
var ObjectResolver = require('./ObjectResolver');


var ObjectEndpoint = module.exports = function ObjectEndpoint(options){
    Endpoint.call(this,options);
    this.producer = this.createProducer();
    this.consumer = this.producer;
};
util.inherits(ObjectEndpoint, Endpoint);

ObjectEndpoint.prototype.createProducer = function(){
    return new ObjectProducer({'endpoint':this,'processor':ObjectResolver.resolve(this.objId)});
};