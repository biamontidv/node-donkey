
var RouteBuilder = require('../lib/node-donkey/builder/RouteBuilder');
var Exchange = require('../lib/node-donkey/Exchange');



var filename = "/home/biamontidv/projects/node-donkey/tests/sample.xml";
var rb = new RouteBuilder();
var route;

rb.configureRoute(filename);
rb.on('route',function(route){
    route = route;
    rb.assemble(route); 
    
    
    
    var begin = route.input.processor.endpoint.producer;    
    
    var c = 0;
    setInterval(function(){
        var ex = new Exchange({'in':"messageIn-"+c.toString(),'out':"messageOut"}); 

    	begin.process(ex);
    	c = c+1;
    },1000);
    
});

