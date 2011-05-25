var util = require(process.binding('natives').util ? 'util' : 'sys');
var Component = require('../Component');
var LogEndpoint = require('./LogEndpoint');

var LogComponent = module.exports = function LogComponent(options){
    Component.call(this,options);
    this.endpoint;
}

util.inherits(LogComponent,Component);

LogComponent.prototype.createEndpoint = function(options){
    var endp = new LogEndpoint({'uri':options.uri,'category':options.path,'param':options.param});
    return endp;
}