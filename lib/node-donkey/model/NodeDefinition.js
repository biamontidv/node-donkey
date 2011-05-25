var util = require(process.binding('natives').util ? 'util' : 'sys');
var ut = require('../Utils');

var NodeDefinition = module.exports = function NodeDefinition(options){
    process.EventEmitter.call(this);
    this.input;
    this.output;
    ut.mixin(this,options);
}
util.inherits(NodeDefinition, process.EventEmitter);
NodeDefinition.prototype.assemble = function(){}