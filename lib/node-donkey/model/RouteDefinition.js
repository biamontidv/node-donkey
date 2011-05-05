var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');

var RouteDefinition = module.exports = function RouteDefinition(options){
    NodeDefinition.call(this,options);
    this.processors = [];
};

util.inherits(RouteDefinition, NodeDefinition);

RouteDefinition.prototype.from = function(def){
    this.input = def;
}

RouteDefinition.prototype.to = function(def){
    this.output = def;
}

RouteDefinition.prototype.pipeline = function(def){
    this.output = def;
}

RouteDefinition.prototype.assemble = function(){
    var self = this;
    this.output.assemble();
    this.input.assemble();
    this.input.processor.on('exchangeOut',function(exchange){self.output.processor.process(exchange)});
    
}