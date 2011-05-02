var util = require(process.binding('natives').util ? 'util' : 'sys');
var Producer = require('../Producer');

var DirectProducer = module.exports = function(options){
    Producer.call(this,options);
};
util.inherits(DirectProducer, Producer);

DirectProducer.prototype.process = function(exchange){
    this.endpoint.consumer.process(exchange);
}


