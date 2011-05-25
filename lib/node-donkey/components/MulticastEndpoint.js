var util = require(process.binding('natives').util ? 'util' : 'sys');
var ut = require('../Utils');

var Channel = require('../Channel');
var Endpoint = require('./Endpoint');
var Consumer = require('./Consumer');


var MulticastEndpoint = module.exports = function MulticastEndpoint(options){
    Endpoint.call(this);
/*    if(this.options.processors !== undefined){
    	for (var i = 0, l = this.options.processors.length || -1; i < l; i++){
            this.addProcessor(this.options.processors[i]);
        };
    }
*/
    this.endps = [];
    var self = this;
    
    var begin = new Consumer({'endpoint':this});
    begin.process = function(exchange){
        begin.emit('exchangeOut',exchange);
    };
    begin.emit('ready');
    
    this.producer = begin;
    this.begin = begin;    
    
    this.channels = [];
};
util.inherits(MulticastEndpoint, Endpoint);

// TODO refactor now that endp.init() is idempotent

MulticastEndpoint.prototype.addEndp = function(endp){
    console.log('[multicast] adding endpoint ' + endp.constructor.name);
    this.endps.push(endp);
    var channel = new Channel();
    channel.setInputConsumer(this.begin);        
    channel.setOutput(endp);
    this.channels.push(channel);    
};

