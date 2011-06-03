var util = require(process.binding('natives').util ? 'util' : 'sys');



var RouteBuilder = module.exports = function(){
    process.EventEmitter.call(this);
    
    var modelFactory = require('../model/ModelFactory');
    var self = this;
    var sax = require("sax");
    var parser = this.parser = sax.parser(true);    
    var nodeStack = [];
    var routes = [];
    
    parser.onerror = function (e) {
      // an error happened.
    };
    parser.ontext = function (t) {
        // TODO need to handle empty text or text full of spaces/tabs better
        if(nodeStack.length>=1 && nodeStack[nodeStack.length-1].setText)
            nodeStack[nodeStack.length-1].setText(t);
    };
    parser.onopentag = function (node) {
        //console.log("opening..."+JSON.stringify(node));
        
        var ndef = modelFactory.create(node.name,node.attributes);        
        var pidx = nodeStack.push(ndef)-2;        
    };
    parser.onclosetag = function (node) {
        //console.log("closing..."+node);
        var cnode = nodeStack.pop();        
        //if(cnode.init) cnode.init();        
        parent = nodeStack[nodeStack.length-1];
        if(parent !== undefined){
            parent[node](cnode);
        } else {
            routes.push(cnode);
        }        
    };
    parser.onattribute = function (attr) {
      // an attribute.  attr has "name" and "value"
    };
    parser.onend = function () {
      // parser stream is done, and ready to have more stuff written to it.
      self.emit('routes',routes);
    };
};
util.inherits(RouteBuilder, process.EventEmitter);

RouteBuilder.prototype.configureRoute = function(filename){
    //example read from file
    
    var parser = this.parser;
    var fs = require('fs');
    fs.readFile(filename, 'utf8',function (err, data) {
          parser.write(data).close();
    });
};

RouteBuilder.prototype.assemble = function(routes){
    routes.forEach(function(route){route.assemble();});
    
};

