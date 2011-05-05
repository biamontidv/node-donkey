var Processor = require('../lib/node-donkey/processors/Processor');
var Exchange = require('../lib/node-donkey/Exchange');
var Pipeline = require('../lib/node-donkey/processors/Pipeline');
var Filter = require('../lib/node-donkey/processors/Filter');
var Choice = require('../lib/node-donkey/processors/Choice');
var Multicast = require('../lib/node-donkey/processors/Multicast');
var Splitter = require('../lib/node-donkey/processors/Splitter');
var Resequencer = require('../lib/node-donkey/processors/Resequencer');

var Endpoint = require('../lib/node-donkey/components/Endpoint');
var DirectEndpoint = require('../lib/node-donkey/components/direct/DirectEndpoint');

var ut = require('../lib/node-donkey/Utils');
var assert = require('assert');



var processors = [];
var fp1 = new Processor({'name':"filterProcessor",'process':function(exchange){
	exchange.setIn(exchange.getIn()+"_mod3");
	this._onExchangeProcessed(exchange);
}});
var filter1 = new Filter({'name':"filter1",
					'predicate':{'matches': function(exchange){
									var num = exchange.getIn().split("-")[1].split("_")[0];
									
									if(num%3 === 0){
										return true;
									}
									else {
										return false;
									}
								}}});


var fp2 = new Processor({'name':"filterProcessor",'process':function(exchange){
	exchange.setIn(exchange.getIn()+"_mod5");
	this._onExchangeProcessed(exchange);
}});

var filter2 = new Filter({'name':"filter2",
					'predicate':{matches: function(exchange){
									var num = exchange.getIn().split("-")[1].split("_")[0];
									
									if(num%5 === 0){
										return true;
									}
									else {
										return false;
									}
								}}});


var p3 = new Processor();
p3.name = "p3";
p3.process = function(exchange){
	exchange.setIn(exchange.getIn()+"_otherwise");
	this.emit('exchangeOut',exchange);
};	





var p1 = new Processor();
p1.name = "p1";
p1.process = function(exchange){
	exchange.setIn(exchange.getIn()+"_p1");
	this.emit('exchangeOut',exchange);
};	


var p2 = new Processor();
p2.name = "p2";
p2.process = function(exchange){
	exchange.setIn(exchange.getIn()+"_p2");
	this.emit('exchangeOut',exchange);
};	

// processors.push(filter1);
// processors.push(p1);
// processors.push(p2);
//var c1 = new Choice({'filters':[filter1,filter2]});
//var c1 = new Multicast({'targets':[filter1,p1,p2]});
// var sp1 = new Splitter({'expression':{'evaluate':function(exchange){
	 // var ret = exchange.getIn().split("s");
	 // return ret;
 // }}});
var tt = [];
var l = [9,7,5,3,1,8,6,4,2,10];
for(var i=0,o=l.length;i<o;i++){
	tt.push(new Exchange({'header':{'seqnum':l[i]}},""));
};
//var c1 = new Resequencer();
//var c1 = new Pipeline({'processors':[sp1],'pipeOnEvent':'exchangeOut'});
//pp.on('exchangeOut',function(exchange){console.log(exchange)});
//filter1.on('exchangeDiscarded',function(exchange){ console.log("discarded: "); console.log(exchange)});
//filter1.on('exchangeOut',function(exchange){console.log(exchange)});
//filter2.on('exchangeOut',function(exchange){console.log(exchange)});
//p1.on('exchangeOut',function(exchange){console.log(exchange)});
//p2.on('exchangeOut',function(exchange){console.log(exchange)});
//c1.on('exchangeOut',function(exchange){console.log(exchange)});
//sp1.on('exchangeOut',function(exchange){console.log(exchange)});
//c1.on('exchangeOut',function(exchange){console.log(exchange)});
var c = 0;

var de = new DirectEndpoint({'endpointUri':'direct:/a'});
de.addConsumer(de.createConsumer());
var begin = de.createProducer();

console.log(de);

var de2 = new DirectEndpoint({'endpointUri':'direct:/bb'});
de2.addConsumer(de.createConsumer());
var begin2 = de2.createProducer();

de.consumer.on('exchangeOut',function(exchange){begin2.process(exchange)});


de2.consumer.on('exchangeOut',function(exchange){console.log(exchange)});


setInterval(function(){
	var ex = new Exchange({'in':"messageIn-"+c.toString(),'out':"messageOut"});	
	begin.process(ex);
	c = c+1;
},1000);