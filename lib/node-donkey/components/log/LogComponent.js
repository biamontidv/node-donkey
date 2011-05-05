var util = require(process.binding('natives').util ? 'util' : 'sys');
var Component = require('../Component');
var LogEndpoint = require('./LogEndpoint');

var LogComponent = module.exports = function LogComponent(options){
    Component.call(this,options);
    this.endpoint;
}

util.inherits(LogComponent,Component);

LogComponent.prototype.createEndpoint = function(){
    this.endpoint = new LogEndpoint({'endpointUri':this.uri,'category':this.path,'param':this.param});
}