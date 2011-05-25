var util = require(process.binding('natives').util ? 'util' : 'sys');
var ut = require('../Utils');

var Channel = require('../Channel');
var Endpoint = require('./Endpoint');

var PipelineEndpoint = module.exports =  function PipelineEndpoint(options){
    Endpoint.call(this,options);
    var self = this;
    this.endps = [];
    this.channels = [];
    
};
util.inherits(PipelineEndpoint, Endpoint);

PipelineEndpoint.prototype.addEndp = function(endp){
    this.endps.push(endp);
    if(this.endps.length > 1){
        var channel = new Channel();
        channel.setInput(this.endps[this.endps.length-2]);        
        channel.setOutput(this.endps[this.endps.length-1]);
        this.channels.push(channel);
        this.producer = this.channels[0].input;
    } 
};
