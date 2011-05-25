var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var MulticastEndpoint = require('../components/MulticastEndpoint');

var MulticastDefinition = module.exports = function MulticastDefinition(options){
    NodeDefinition.call(this,options);
    this.targets = [];
    this.processor;

}

util.inherits(MulticastDefinition, NodeDefinition);

MulticastDefinition.prototype.to = function(def){
    this.targets.push(def);
}
MulticastDefinition.prototype.pipeline = function(def){
    this.targets.push(def);
}

MulticastDefinition.prototype.createEndpoint = function(){
    this.endpoint = new MulticastEndpoint();
    var self = this;
    this.targets.forEach(function(t){
        self.endpoint.addEndp(t.createEndpoint());
    });
    return this.endpoint;
};