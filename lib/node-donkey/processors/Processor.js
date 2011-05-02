var util = require(process.binding('natives').util ? 'util' : 'sys');
var ut = require('../Utils');

var Processor = module.exports = function(options){
	process.EventEmitter.call(this);
	ut.mixin(this,options);
};
util.inherits(Processor, process.EventEmitter);
