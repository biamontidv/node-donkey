var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');

var SimpleDefinition = module.exports = function SimpleDefinition(options){
    NodeDefinition.call(this,options);
    this.ops = {};
    this.ops.predicate1 = {'matches':function(exchange){
		var num = exchange.getIn().split("-")[1].split("_")[0];
		
		if(num >10){
			return true;
		}
		else {
			return false;
		}
	}};
    this.ops.predicateA = {'matches':function(exchange){
        var num = exchange.getIn().split("-")[1].split("_")[0];
		
		if(num%3 === 0){
			return true;
		}
		else {
			return false;
		}
	}};
    this.ops.predicateB = {'matches':function(exchange){
        var num = exchange.getIn().split("-")[1].split("_")[0];
		
		if(num%5 === 0){
			return true;
		}
		else {
			return false;
		}
	}};
      
};

util.inherits(SimpleDefinition, NodeDefinition);

SimpleDefinition.prototype.init = function(){
    this.expression = this.ops[this.text];
};
