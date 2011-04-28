var Processor = require('../lib/node-donkey/Processor');
var Exchange = require('../lib/node-donkey/Exchange');
var Pipeline = require('../lib/node-donkey/Pipeline');
var Filter = require('../lib/node-donkey/Filter');
var Choice = require('../lib/node-donkey/Choice');
var Multicast = require('../lib/node-donkey/Multicast');
var Splitter = require('../lib/node-donkey/Splitter');
var Resequencer = require('../lib/node-donkey/Resequencer');
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

var ex1 = new Exchange({'in':{'header':{'seqnum':1}}});
var ex2 = new Exchange(ex1);
var ex3 = ex1;

assert.notEqual(ex1,ex2);
assert.equal(ex1,ex3);
assert.notEqual(ex2,ex3);

assert.deepEqual(ex1,ex2);
assert.deepEqual(ex1,ex3);
assert.deepEqual(ex2,ex3);

assert.notStrictEqual(ex1,ex2);
assert.strictEqual(ex1,ex3);
assert.notStrictEqual(ex2,ex3);


/* setInterval(function(){
	var ex = new Exchange("messageIn-"+c.toString(),"messageOut");
	
	if(c<tt.length){c1.process(tt[c]);}
	// c1.process(ex);
	c = c+1;
},1000); */