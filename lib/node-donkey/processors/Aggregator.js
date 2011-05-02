var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('./Processor');
var Exchange = require('./Exchange');

var Aggregator = module.exports = function(correlationExpression,aggregationStrategy){
	var self = this;
	this.correlationExpression = correlationExpression;
	this.aggregationStrategy = aggregationStrategy;
	this.closedKeys = [];
	this.aggregatedExchanges = {};

};
util.inherits(Aggregator, Processor);

Aggregator.prototype.process = function(exchange){
	var key = this.correlationExpression.evaluate(exchange);
	if(key !== undefined && this.closedKeys.indexOf(key) !== -1){		
		var agEx = this.aggregationStrategy.aggregate(this.aggregatedExchanges[key],exchange)
		this.aggregatedExchanges[key] = agEx;
		if(this.isCompleted(key,agEx)){
			this.emit('exchangeOut',agEx);
			this.closedKeys.push(key);
			this.aggregatedExchanges[key] = Null;
		}
	}
}