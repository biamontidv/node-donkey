var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var EndpointRegistry = require('../components/EndpointRegistry');

var FromDefinition = module.exports = function FromDefinition(options){
    NodeDefinition.call(this,options);
};

util.inherits(FromDefinition, NodeDefinition);

FromDefinition.prototype.assemble = function(){
    var self = this;
    var endp = EndpointRegistry.get(this.uri);
    this.processor = endp.consumer;
}