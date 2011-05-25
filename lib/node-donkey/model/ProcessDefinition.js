var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');

var ProcessDefinition = module.exports = function ProcessDefinition(options){
    NodeDefinition.call(this,options);
    this.processor;

}

util.inherits(ProcessDefinition, NodeDefinition);

ProcessDefinition.prototype.assemble = function(){
    var p = require(this.ref);
    this.processor = new p();
};