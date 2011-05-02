var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('./Processor');
var Exchange = require('../Exchange');
var ut = require('../Utils');

var Splitter = module.exports = function(options){
	var self = this;
	this.expression;
	ut.mixin(this,options);
	
	

};
util.inherits(Splitter, Processor);

Splitter.prototype.process = function(exchange){
	var pieces = this.expression.evaluate(exchange);
	
	for(var i=0,l=pieces.length;i<l;i++){
		var exchange = new Exchange(pieces[i],"");
		this.emit("exchangeOut",exchange);
	}
}