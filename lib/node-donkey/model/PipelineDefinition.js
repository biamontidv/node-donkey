var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var Pipeline = require('../processors/Pipeline');

var PipelineDefinition = module.exports = function PipelineDefinition(options){
    NodeDefinition.call(this,options);
    this.processors = [];
    this.processor;

}

util.inherits(PipelineDefinition, NodeDefinition);

PipelineDefinition.prototype.choice = function(def){
    this.processors.push(def);
}

PipelineDefinition.prototype.filter = function(def){
    this.processors.push(def);
}

PipelineDefinition.prototype.to = function(def){
    this.processors.push(def);
}

PipelineDefinition.prototype.assemble = function(){
    var self = this;
    var proc = [];
    this.processors.forEach(function(p){        
        p.assemble();
        proc.push(p.processor);
    });
    
    this.processor = new Pipeline({'processors':proc});
    this.processor.on('exchangeOut',function(exchange){self.output.processor.process(exchange)});
 
}