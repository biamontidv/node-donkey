var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('./Processor');
var ut = require('../Utils');

var Resequencer = module.exports = function(options){
	var self = this;
	this.sequence = [];
	this.expression = {'evaluate':function(exchange){
		return exchange.getIn().header['seqnum'] || exchange.properties['seqnum'];
	}};
	
	this.compare = function(a,b){
		return self.expression.evaluate(b)-self.expression.evaluate(a);
	};
	
	this.isPredecessor = function(a,b){
	//TODO implement a better algorithm
		return self.expression.evaluate(b)-self.expression.evaluate(a) <=1 ? true : false;
	};
	ut.mixin(this,options);
};
util.inherits(Resequencer, Processor);

Resequencer.prototype.process = function(exchange){
	this.sequence.push(exchange);
	this.sequence.sort(this.compare);
	// TODO implement a better algorithm
	while(this.sequence.length>1 && this.isPredecessor(this.sequence[this.sequence.length-1],this.sequence[this.sequence.length-2])){
		console.log(this.isPredecessor(this.sequence[this.sequence.length-1],this.sequence[this.sequence.length-2]));
		this.emit('exchangeOut',this.sequence.pop());
	}
}