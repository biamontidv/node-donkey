var ut = require('../Utils');

var NodeDefinition = module.exports = function NodeDefinition(options){
    this.input;
    this.output;
    ut.mixin(this,options);
}

NodeDefinition.prototype.assemble = function(){}