var util = require(process.binding('natives').util ? 'util' : 'sys');
var Component = require('../Component');
var ObjectEndpoint = require('./ObjectEndpoint');

var ObjectComponent = module.exports = function ObjectComponent(options){
    Component.call(this,options);
    this.endpoint;
}

util.inherits(ObjectComponent,Component);

ObjectComponent.prototype.createEndpoint = function(options){
    var endp = new ObjectEndpoint({'uri':options.uri,'objId':options.path,'param':options.param});
    return endp;
}