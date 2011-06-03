var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('../lib/node-donkey/processors/Processor');

var myObj = module.exports = function myObj(options){
    Processor.call(this);
};
util.inherits(myObj, Processor);

myObj.prototype.process = function(exchange){
	exchange.in.p = exchange.in.messageId;
    this.emit('exchangeOut',exchange);
};

myObj.prototype.myMethod = function(exchange){
    exchange.in.p = 'myMethod';
    this.emit('exchangeOut',exchange);
};