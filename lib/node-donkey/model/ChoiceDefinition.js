var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');

var ChoiceDefinition = module.exports = function ChoiceDefinition(options){
    NodeDefinition.call(this,options);
    this.whens = [];
}

util.inherits(ChoiceDefinition, NodeDefinition);

ChoiceDefinition.prototype.when = function(def){
    this.whens.push(def);
}