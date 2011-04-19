var Processor = require('../lib/node-donkey/Processor');
var Exchange = require('../lib/node-donkey/Exchange');
var Pipeline = require('../lib/node-donkey/Pipeline');


var ex = new Exchange("messageIn","messageOut");
var processors = [];
for (var i=0;i<2;i++){
	var p = new Processor();
	p.name = i.toString();
	p.process = function(exchange){		
		exchange.setIn(exchange.getIn()+"_"+this.name);
		console.log(exchange);
		this._onExchangeProcessed(exchange);
	};	
	processors.push(p);
}

var pp = new Pipeline(processors);
pp.process(ex);

