var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('../lib/node-donkey/processors/Processor');

var ExampleProcessor = module.exports = function ExampleProcessor(options){
	Processor.call(this,options);
    
    var self = this;
    this.process = function(exchange){
        exchange.setIn(exchange.getIn()+'_processed');
        self.emit('exchangeOut',exchange);
    };
};
util.inherits(ExampleProcessor, Processor);

