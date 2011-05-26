var util = require(process.binding('natives').util ? 'util' : 'sys');
var Producer = require('../Producer');


var FileProducer = module.exports = function FileProducer(options){
    Producer.call(this,options);
    this.emit('ready');
};
util.inherits(FileProducer, Producer);

FileProducer.prototype.process = function(exchange){
    // TODO what if the header prop is not set?
    var filename = exchange.getIn().header['DonkeyFileName']; 
    
    this.endpoint.operations.writeFile(filename,exchange);
    
}