var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('./Processor');
var Multicast = require('./Multicast');
var ut = require('./Utils');

var Choice = module.exports = function(options){
	var self = this;
	this.filters;
	ut.mixin(this,options);
	this.multiFilter = new Multicast({'targets':this.filters});
};
util.inherits(Choice, Processor);

Choice.prototype.process = function(exchange){
	this.multiFilter.process(exchange);
};
