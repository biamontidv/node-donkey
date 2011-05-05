var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('./Processor');
var Exchange = require('../Exchange');
var ut = require('../Utils');

var Pipeline = module.exports = function(options){
	var self = this;
	this.processors;
	this.pipeOnEvent = 'exchangeOut';
	ut.mixin(this,options);
	for (var i = 1, l = this.processors.length; i < l; i++){
		var pp = this.processors[i];
		this.processors[i-1].on(this.pipeOnEvent,(function(pp){
			return function(exchange){
				pp.process(new Exchange(exchange))};			
			})(pp));
	};
	this.processors[this.processors.length-1].on(this.pipeOnEvent,function(exchange){
	 self.emit(self.pipeOnEvent,exchange);
	});
		
};
util.inherits(Pipeline, Processor);

Pipeline.prototype.process = function(exchange){
	this.processors[0].process(exchange);
};