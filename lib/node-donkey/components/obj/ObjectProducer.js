var util = require(process.binding('natives').util ? 'util' : 'sys');
var Producer = require('../Producer');


var ObjectProducer = module.exports = function ObjectProducer(options){    
    Producer.call(this,options);
    this.emit('ready');
    var self = this;
    var onExchangeOut = function(exchange){self.emit('exchangeOut',exchange);};
    this.processor.on('exchangeOut',onExchangeOut);
};
util.inherits(ObjectProducer, Producer);

ObjectProducer.prototype.process = function(exchange){    
    this.processor[this.endpoint.param.method](exchange);
}