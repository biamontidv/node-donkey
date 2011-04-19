var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('./Processor');

var Pipeline = module.exports = function(processors){
	var self = this;
	this.processors = processors;
	
	for (var i = 1, l = this.processors.length; i < l; i++){
		var pp = this.processors[i];
		this.processors[i-1].on('exchangeProcessed',function(exchange){pp.process(exchange)});
	};
	this.processors[processors.length-1].on('exchangeProcessed',function(exchange){
	 self._onExchangeProcessed(exchange);
	});
		
};
util.inherits(Pipeline, Processor);

Pipeline.prototype.process = function(exchange){
	this.processors[0].process(exchange);
};
