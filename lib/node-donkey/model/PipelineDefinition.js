var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var PipelineEndpoint = require('../components/PipelineEndpoint');

var PipelineDefinition = module.exports = function PipelineDefinition(options){
    NodeDefinition.call(this,options);
    this.processors = [];

};
util.inherits(PipelineDefinition, NodeDefinition);

PipelineDefinition.prototype.to = function(def){
    this.processors.push(def);
};
PipelineDefinition.prototype.filter = function(def){
    this.processors.push(def);
};

PipelineDefinition.prototype.createEndpoint = function(){
    var self = this;
    this.endpoint = new PipelineEndpoint();
    this.processors.forEach(function(p){
        self.endpoint.addEndp(p.createEndpoint());
    });
    return this.endpoint;
};