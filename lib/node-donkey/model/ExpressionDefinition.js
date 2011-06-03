var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');
var Expression = require('../Expression');


var ExpressionDefinition = module.exports = function ExpressionDefinition(options){
    NodeDefinition.call(this,options);
      
};

util.inherits(ExpressionDefinition, NodeDefinition);

ExpressionDefinition.prototype.setText = function(text){
    this.expression = new Expression(text);
};

