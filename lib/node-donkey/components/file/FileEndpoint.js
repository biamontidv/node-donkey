var util = require(process.binding('natives').util ? 'util' : 'sys');
var Endpoint = require('../Endpoint');
var FileProducer = require('./FileProducer');
var FileOperations = require('./FileOperations');


var FileEndpoint = module.exports = function FileEndpoint(options){
    Endpoint.call(this,options);
    this.producer = this.createProducer();
    this.operations = new FileOperations();
};
util.inherits(FileEndpoint, Endpoint);

FileEndpoint.prototype.createProducer = function(){
    return new FileProducer({'endpoint':this});
};