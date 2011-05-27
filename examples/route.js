
var RouteBuilder = require('../lib/node-donkey/builder/RouteBuilder');
var Exchange = require('../lib/node-donkey/Exchange');
var Message = require('../lib/node-donkey/Message');


var filename = "/home/biamontidv/projects/node-donkey/examples/simple.xml";
var rb = new RouteBuilder();
var route;

var fs = require('fs');

        

rb.configureRoute(filename);
rb.on('routes',function(routes){
    routes[0].on('started',function(){
        console.log('injecting data into first route...');
        var begin = routes[0].from.endpoint.producer;
        var c = 0;
        setInterval(function(){
            /*
            var msg = new Message({'header':{'DonkeyFileName':'test_'+c.toString()+'.txt'}
                    ,'body':"messageIn-"+c.toString()});
            */
            var msg = new Message({'body':"messageIn-"+c.toString()});            
            var ex = new Exchange({'in':msg});

            begin.process(ex);
        	c = c+1;
        },1000);
        
        });
    routes.forEach(function(r){r.start()});   
   
});
