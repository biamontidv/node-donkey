
var RouteBuilder = require('../lib/node-donkey/builder/RouteBuilder');
var Exchange = require('../lib/node-donkey/Exchange');



var filename = "/home/biamontidv/projects/node-donkey/examples/simple.xml";
var rb = new RouteBuilder();
var route;


rb.configureRoute(filename);
rb.on('routes',function(routes){
    routes[0].on('started',function(){
        console.log('injecting data into first route...');
        var begin = routes[0].from.endpoint.producer;
        var c = 0;
        setInterval(function(){
            var ex = new Exchange({'in':"messageIn-"+c.toString(),'out':"messageOut"});

            begin.process(ex);
        	c = c+1;
        },1000);
        
        });
    routes.forEach(function(r){r.start()});   
   
});
