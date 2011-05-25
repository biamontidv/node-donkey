var util = require(process.binding('natives').util ? 'util' : 'sys');
var Consumer = require('../Consumer');

var DirectConsumer = module.exports = function DirectConsumer(options){
    Consumer.call(this,options);
    this.emit('ready');
};
util.inherits(DirectConsumer, Consumer);

DirectConsumer.prototype.process = function(exchange){
    this.emit('exchangeOut',exchange);
}
