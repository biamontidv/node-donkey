var vows = require('vows');
var assert = require('assert');
var events = require('events');
var Exchange = require('../../lib/node-donkey/Exchange');
var Filter = require('../../lib/node-donkey/processors/Filter');
var Choice = require('../../lib/node-donkey/processors/Choice');


var targets = [];
var e = new events.EventEmitter;
e.exchanges = [];

for(var i=0;i<3;i++){
    e['collect'+i] = function(ev){
    	e.emit('collected',null,{'exchange':ev,'target_called':id});
    };
    
	
	var pp = new Filter({'name':i,'predicate':{'name':i,'matches':function(exchange){
		return (exchange.properties.id === this.name);		
	}}});
	pp.on('exchangeOut',e['collect'+pp.name]);
	targets.push(pp);
}
var target_called = 0;
var ex0 = new Exchange({'properties':{'id':0},'in':"IN"});
var ex1 = new Exchange({'properties':{'id':1},'in':"IN"});
var ex2 = new Exchange({'properties':{'id':2},'in':"IN"});

vows.describe('Choice Router pattern').addBatch({
	'A Choice with filters [exchange.properties.id === filter.name]':{
		topic: function(){
			var p = new Choice({'filters':targets});
			return p;
		},
		'when receiving exchange matching filter 2':{
			topic: function(p){
				e.on('collected',this.callback);
				p.process(ex0);
				e.removeAllListeners('collected');
			},
			'should forward only from filter 2': function(err,a){
                console.log(a);
				assert.equal(a.target_called,a.exchange.properties.id);			
			},
			'and not from any others': function(err,a){
                assert.ok(false);
			}
			
		}
	}
}).export(module);