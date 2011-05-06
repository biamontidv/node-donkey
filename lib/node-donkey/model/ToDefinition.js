var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var EndpointRegistry = require('../components/EndpointRegistry');

var ToDefinition = module.exports = function ToDefinition(options){
    NodeDefinition.call(this,options);
    this.processor;
}

util.inherits(ToDefinition, NodeDefinition);

ToDefinition.prototype.assemble = function(){
    var self = this;
    var endp = EndpointRegistry.get(this.uri);
    this.processor = endp.producer;
}