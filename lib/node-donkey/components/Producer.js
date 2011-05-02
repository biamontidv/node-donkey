var util = require(process.binding('natives').util ? 'util' : 'sys');
var ut = require('../Utils');
var Processor = require('../processors/Processor');

var Producer = module.exports = function(options){
    this.endpoint;
    ut.mixin(this,options);
};
util.inherits(Producer, Processor);

Producer.prototype.createExchange;