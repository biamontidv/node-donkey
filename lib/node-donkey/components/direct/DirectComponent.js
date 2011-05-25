var util = require(process.binding('natives').util ? 'util' : 'sys');
var Component = require('../Component');
var DirectEndpoint = require('./DirectEndpoint');

var DirectComponent = module.exports = function DirectComponent(options){
    Component.call(this,options);
    this.endpoint;
}

util.inherits(DirectComponent,Component);

DirectComponent.prototype.createEndpoint = function(options){
    var endp = new DirectEndpoint({'uri':options.uri,'path':options.path,'param':options.param});
    return endp;
}