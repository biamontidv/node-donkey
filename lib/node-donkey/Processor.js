var util = require(process.binding('natives').util ? 'util' : 'sys');

var Processor = module.exports = function(){
	process.EventEmitter.call(this);
};
util.inherits(Processor, process.EventEmitter);

Processor.prototype._onExchangeProcessed = function(exchange){
	this.emit('exchangeProcessed',exchange);
};

