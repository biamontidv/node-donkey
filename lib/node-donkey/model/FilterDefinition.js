var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var Filter = require('../processors/Filter');

var FilterDefinition = module.exports = function FilterDefinition(options){
    NodeDefinition.call(this,options);
    this.predicate;

}

util.inherits(FilterDefinition, NodeDefinition);

FilterDefinition.prototype.simple = function(def){
    this.predicate = def;    
};

FilterDefinition.prototype.assemble = function(){
    var self = this;    
    this.processor = new Filter({'predicate':this.predicate.expression});
}