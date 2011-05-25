var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var Filter = require('../processors/Filter');

var WhenDefinition = module.exports = function WhenDefinition(options){
    NodeDefinition.call(this,options);
    this.predicate;
    this.processor;
};

util.inherits(WhenDefinition, NodeDefinition);

WhenDefinition.prototype.simple = function(def){
    this.predicate = def;    
};

WhenDefinition.prototype.to = function(def){
    this.outputs = def;    
};

WhenDefinition.prototype.assemble = function(){
    this.outputs.assemble();
    var to = this.outputs.processor;
    this.processor = new Filter({'predicate':this.predicate.expression});    
    this.processor.on('exchangeOut',function(exchange){to.process(exchange);});
};