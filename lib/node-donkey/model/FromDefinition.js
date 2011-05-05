var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var ComponentFactory = require('../components/ComponentFactory');

var FromDefinition = module.exports = function FromDefinition(options){
    NodeDefinition.call(this,options);
};

util.inherits(FromDefinition, NodeDefinition);

FromDefinition.prototype.assemble = function(){
    var self = this;
    var comp = ComponentFactory.create(this.uri);
    comp.createEndpoint();
    this.processor = comp.endpoint.consumer;
}