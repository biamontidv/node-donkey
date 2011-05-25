var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var Choice = require('../processors/Choice');

var ChoiceDefinition = module.exports = function ChoiceDefinition(options){
    NodeDefinition.call(this,options);
    this.whens = [];
    this.processor;
};

util.inherits(ChoiceDefinition, NodeDefinition);

ChoiceDefinition.prototype.when = function(def){
    this.whens.push(def);
};

ChoiceDefinition.prototype.assemble = function(){
    var self = this;
    var filters = [];
    this.whens.forEach(function(item){
        item.assemble();
        filters.push(item.processor);
    });
    
    this.processor = new Choice({'filters':filters});
};