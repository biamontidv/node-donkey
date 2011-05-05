var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');

var WhenDefinition = module.exports = function WhenDefinition(options){
    NodeDefinition.call(this,options);
    this.predicate;

}

util.inherits(WhenDefinition, NodeDefinition);

WhenDefinition.prototype.simple = function(def){
    this.predicate = def;    
};

WhenDefinition.prototype.to = function(def){
    this.outputs = def;    
}