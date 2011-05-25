var util = require(process.binding('natives').util ? 'util' : 'sys');
var Processor = require('../processors/Processor');
var ut = require('../Utils');

var Consumer = module.exports = function(options){
    this.endpoint;
    ut.mixin(this,options);
    this.on('ready',function(){this.ready = true;});
    var onNewListener = function(event,listener){
        console.log('['+this.constructor.name+'-'+this.endpoint.uri+'] new listener for event '+event);
        if(event === 'ready' && this.ready === true){
            console.log('['+this.constructor.name+'-'+this.endpoint.uri+'] emitting ready as initialised and new listener');            
            listener();
        };
    };
    this.on('newListener',onNewListener);
    console.log('New '+this.constructor.name+' created');
};
util.inherits(Consumer, Processor);