var util = require(process.binding('natives').util ? 'util' : 'sys');
var ut = require('./Utils');

var Exchange = require('./Exchange');

var Channel = module.exports = function(options){
    process.EventEmitter.call(this);
	ut.mixin(this,options);
    this.input;
    this.output;
    var self = this;
    
    var inputReady = false;
    var outputReady = false;
    
    var in2out = function(exchange){
        //self.output.producer.process(new Exchange(exchange))
        self.output.process(exchange);
    };
    
    var activateChannel = function(){
        if(inputReady && outputReady){
            console.log(self.input.constructor.name + ' ' + self.input);
            self.input.on('exchangeOut',in2out);
            self.emit('ready');
        };        
    };
    
    
    this.onInputReady = function(){
        inputReady = true;
        console.log('[channel] onInputReady from ' + self.input.constructor.name +'-'+self.input.endpoint.uri);
        activateChannel();
    };
    this.onOutputReady = function(){
        outputReady = true;
        console.log('[channel] onOutputReady from ' + self.output.constructor.name+'-'+self.input.endpoint.uri);
        activateChannel();
    };
};
util.inherits(Channel, process.EventEmitter);

Channel.prototype.setInput = function(input){
    this.input = input.consumer;
    console.log('[channel] setInput to ' + input.constructor.name);
    this.input.once('ready',this.onInputReady);
    
};


Channel.prototype.setInputConsumer = function(inputc){
    console.log('[channel] adding InputConsumer');
    this.input = inputc;
    this.onInputReady();
    
};

Channel.prototype.setOutput = function(output){
    this.output = output.producer;
    console.log('[channel] setOutput to ' + output.constructor.name);
    this.output.once('ready',this.onOutputReady);
    
};