var util = require(process.binding('natives').util ? 'util' : 'sys');
var Component = require('../Component');
var FileEndpoint = require('./FileEndpoint');

var FileComponent = module.exports = function FileComponent(options){
    Component.call(this,options);
    this.endpoint;
}

util.inherits(FileComponent,Component);

FileComponent.prototype.createEndpoint = function(options){
    var endp = new FileEndpoint({'uri':options.uri,'basepath':options.path,'param':options.param});
    return endp;
}