var util = require(process.binding('natives').util ? 'util' : 'sys');
var Component = require('../Component');
var DirectEndpoint = require('./DirectEndpoint');

var DirectComponent = module.exports = function DirectComponent(options){
    Component.call(this,options);
    this.endpoint;
}

util.inherits(DirectComponent,Component);

DirectComponent.prototype.createEndpoint = function(){
    this.endpoint = new DirectEndpoint({'endpointUri':this.uri,'path':this.path,'param':this.param});
}