var util = require(process.binding('natives').util ? 'util' : 'sys');
var Producer = require('../Producer');

var LogProducer = module.exports = function LogProducer(options){
    Producer.call(this,options);
    this.emit('ready');
};
util.inherits(LogProducer, Producer);

LogProducer.prototype.process = function(exchange){
    console[this.endpoint.param.level]('['+this.endpoint.category+' - '+this.endpoint.param.level.toUpperCase()+'] '+JSON.stringify(exchange));
}