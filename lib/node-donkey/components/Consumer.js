var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('../processors/Processor');
var ut = require('../Utils');

var Consumer = module.exports = function(options){
    this.endpoint;
    ut.mixin(this,options);
};
util.inherits(Consumer, Processor);