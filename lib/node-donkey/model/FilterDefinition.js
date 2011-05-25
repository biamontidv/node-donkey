var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var FilterEndpoint = require('../components/FilterEndpoint');

var FilterDefinition = module.exports = function FilterDefinition(options){
    NodeDefinition.call(this,options);
    this.predicate;

}

util.inherits(FilterDefinition, NodeDefinition);

FilterDefinition.prototype.simple = function(def){
    this.predicate = def;
};

FilterDefinition.prototype.createEndpoint = function(){
    var self = this;
    this.endpoint = new FilterEndpoint({'predicate':this.predicate});
    return this.endpoint;
}