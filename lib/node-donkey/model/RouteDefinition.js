var util = require(process.binding('natives').util ? 'util' : 'sys');
var NodeDefinition = require('./NodeDefinition');

var Channel = require('../Channel');
var PipelineEndpoint = require('../components/PipelineEndpoint');

var RouteDefinition = module.exports = function RouteDefinition(options){
    NodeDefinition.call(this,options);
    this.from;
    this.tos = [];
};

util.inherits(RouteDefinition, NodeDefinition);

RouteDefinition.prototype.from = function(def){
    this.from = def;
}

RouteDefinition.prototype.to = function(def){
    this.tos.push(def);
}

RouteDefinition.prototype.filter = function(def){
    this.tos.push(def);
}


RouteDefinition.prototype.pipeline = function(def){
    this.channels[0].setOutput(def);
}

RouteDefinition.prototype.choice = function(def){
    this.channels[0].setOutput(def);
}

RouteDefinition.prototype.multicast = function(def){
    this.tos.push(def);
}

RouteDefinition.prototype.start = function(){
    var self = this;
    
    var pipeline = new PipelineEndpoint();
    pipeline.addEndp(this.from.createEndpoint());
    
    this.tos.forEach(function(t){
        pipeline.addEndp(t.createEndpoint());
        
    });
    console.log('[RouteDef] listening for channel[0] ready...');
    //pipeline.channels[0].on('ready',function(){console.log('route ready, starting route');self.emit('started')});
    console.log('route ready, starting route');self.emit('started')
    
};
