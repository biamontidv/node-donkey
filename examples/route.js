
var RouteBuilder = require('../lib/node-donkey/builder/RouteBuilder');
var Exchange = require('../lib/node-donkey/Exchange');



var filename = "/home/biamontidv/projects/node-donkey/examples/sample.xml";
var rb = new RouteBuilder();
var route;

rb.configureRoute(filename);
rb.on('routes',function(routes){
        
    routes = routes;
    
    rb.assemble(routes); 
    
    
    var begin = routes[0].input.processor.endpoint.producer;    
    
    var c = 0;
    setInterval(function(){
        var ex = new Exchange({'in':"messageIn-"+c.toString(),'out':"messageOut"}); 

    	begin.process(ex);
    	c = c+1;
    },1000);
    
});

