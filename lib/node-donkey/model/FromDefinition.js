var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var EndpointRegistry = require('../components/EndpointRegistry');

var FromDefinition = module.exports = function FromDefinition(options){
    NodeDefinition.call(this,options);
};

util.inherits(FromDefinition, NodeDefinition);

FromDefinition.prototype.createEndpoint = function(){
    var self = this;
    // TODO: what about enpoint with multiple consumers/producers?????
    var endp = EndpointRegistry.get(this.uri);
    this.endpoint = endp;
    return endp;
}