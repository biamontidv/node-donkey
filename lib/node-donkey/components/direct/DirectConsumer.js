var util = require(process.binding('natives').util ? 'util' : 'sys');
var Consumer = require('../Consumer');

var DirectConsumer = module.exports = function(options){
    Consumer.call(this,options);
};
util.inherits(DirectConsumer, Consumer);

DirectConsumer.prototype.process = function(exchange){
    this.emit('exchangeOut',exchange);
}
