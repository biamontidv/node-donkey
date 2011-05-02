var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('./Processor');
var ut = require('../Utils');

var Filter = module.exports = function(options){
	var self = this;
	this.predicate;
	ut.mixin(this,options);
};
util.inherits(Filter, Processor);

Filter.prototype.process = function(exchange){
	if (this.predicate.matches(exchange)){
		this.emit('exchangeOut',exchange);
	} else {
		this.emit('exchangeDiscarded',exchange);
	};
};
