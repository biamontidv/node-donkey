var vows = require('vows');
var assert = require('assert');
var events = require('events');

var Filter = require('../lib/node-donkey/processors/Filter');
var predicate = {'matches':function(exchange){return exchange}};
var e = new events.EventEmitter;


vows.describe('Filter pattern').addBatch({
	'A Filter':{
		topic: function(){
			var f = new Filter({'predicate':predicate});
			f.on('exchangeOut',function(exchange){
				e.emit('exchangeOut',null,{'event':'exchangeOut','data':exchange});
			});
			f.on('exchangeDiscarded',function(exchange){
				e.emit('exchangeDiscarded',null,{'event':'exchangeDiscarded','data':exchange});
			});
			return f		
		},
		'when the predicate matches':{
			topic: function(f){
				e.on('exchangeOut',this.callback);
				e.on('exchangeDiscarded',this.callback);
				f.process(true);
				e.removeAllListeners('exchangeOut');
				e.removeAllListeners('exchangeDiscarded');
			},
			'should forward the exchange': function(err,a){
				assert.equal('exchangeOut',a.event);
			},
			'and should not drop it': function(err,a){
				assert.notEqual('exchangeDiscarded',a.event);
			}
		},
		'when the predicate does not match':{
			topic: function(f){
				e.on('exchangeOut',this.callback);
				e.on('exchangeDiscarded',this.callback);
				f.process(false);
			},
			'should drop the exchange': function(err,a){
				assert.equal('exchangeDiscarded',a.event);
			},
			'and should not forward it': function(err,a){
				assert.notEqual('exchangeOut',a.event);
			}
		}
		
			
		}
}).export(module);