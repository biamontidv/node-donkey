var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var FilterEndpoint = require('../components/FilterEndpoint');

var FilterDefinition = module.exports = function FilterDefinition(options){
    NodeDefinition.call(this,options);
    this.predicate;

}

util.inherits(FilterDefinition, NodeDefinition);

FilterDefinition.prototype.expression = function(def){
    this.predicate = def.expression;
};

FilterDefinition.prototype.createEndpoint = function(){
    var self = this;
    this.endpoint = new FilterEndpoint({'predicate':this.predicate});
    return this.endpoint;
}