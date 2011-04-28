var vows = require('vows');
var assert = require('assert');
var events = require('events');
var Multicast = require('../lib/node-donkey/Multicast');
var Exchange = require('../lib/node-donkey/Exchange');
var Processor = require('../lib/node-donkey/Processor');

var targets = [];
var e = new events.EventEmitter;
e.exchanges = [];
e.target_called = 0;
e.collect = function(err,ev){
	e.target_called = e.target_called+1;
	e.exchanges.push(ev.data);
	if(e.target_called = targets.length){
		e.emit('collected',null,{'exchanges':e.exchanges,'target_called':e.target_called});
	};
};
for(var i=0;i<8;i++){
	
	var pp = new Processor({'name':i,'process':function(exchange){
		this.exchange = exchange;
		this.emit('exchangeReceived',null,{'name':this.name,'data':this.exchange});
	}});
	pp.on('exchangeReceived',e.collect);
	targets.push(pp);
};
var target_called = 0;
var ex = new Exchange({'in':"IN"});

vows.describe('Multicast pattern').addBatch({
	'A Multicast':{
		topic: function(){
			var p = new Multicast({'targets':targets});
			return p		
		},
		'when receiving an exchange':{
			topic: function(p){
				e.on('collected',this.callback);
				p.process(ex);
			},
			'should send a new exchange to each target': function(err,a){
				assert.equal(a.target_called,targets.length);			
			},
			'and the new exchanges should be copies of the original ones': function(err,a){
				a.exchanges.forEach(function(item){
					assert.notStrictEqual(item,ex);
					assert.deepEqual(item,ex)
				});
			}
			
		}
	}
}).export(module);