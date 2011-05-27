var util = require(process.binding('natives').util ? 'util' : 'sys');
var Producer = require('../Producer');
var Path = require('path');


var FileProducer = module.exports = function FileProducer(options){    
    Producer.call(this,options);
    console.log(this.endpoint);
    this.emit('ready');
};
util.inherits(FileProducer, Producer);

FileProducer.prototype.process = function(exchange){
    // TODO what if the header prop is not set?
    var path = exchange.getIn().header['DonkeyFileName'] || this.endpoint.param['fileName'];
    // now add the standard endpoint path if path is relative
    path = Path.normalize(path);
    console.log('path: ' + path);
    path = Path.resolve(this.endpoint.basepath,path);    
    
    console.log('basepath: ' + this.endpoint.basepath);
    console.log('fullpath: ' + path);
    // for now let's do it sync
    
    
    this.endpoint.operations.createDir(Path.dirname(path));
    this.endpoint.operations.writeFile(path,exchange,this.endpoint.param.fileExist);
    
}