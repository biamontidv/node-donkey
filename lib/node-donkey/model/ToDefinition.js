var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var ComponentFactory = require('../components/ComponentFactory');

var ToDefinition = module.exports = function ToDefinition(options){
    NodeDefinition.call(this,options);
    this.processor;
}

util.inherits(ToDefinition, NodeDefinition);

ToDefinition.prototype.assemble = function(){
    var self = this;
    var comp = ComponentFactory.create(this.uri);
    comp.createEndpoint();
    this.processor = comp.endpoint.producer;
}