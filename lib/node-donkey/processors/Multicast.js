var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('./Processor');
var Exchange = require('../Exchange');
var ut = require('../Utils');

var Multicast = module.exports = function(options){
	this.targets;
	ut.mixin(this,options);
	for(var i=0,l=this.targets.length;i<l;i++){
		var pp = this.targets[i];
		this.on('exchangeOut',(function(pp){
			return function(exchange){
				pp.process(new Exchange(exchange));
			}
		})(pp));
	}
	
};
util.inherits(Multicast,Processor)

Multicast.prototype.process = function(exchange){
	this.emit('exchangeOut',exchange);
}