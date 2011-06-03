var vm = require('vm');
var ut = require('./Utils');

var Expression = module.exports = function Expression(text,options){
    this.language = 'js';
    ut.mixin(this,options);
    
    var parseJs = function parseJs(text){
        var completeText = 'var evaluate = function(exchange){return '+text+';}';
        var f = {};
        vm.runInNewContext(completeText,f);
        return f.evaluate;
    };
    
    var parsers = {'js':parseJs};
    
    this.evaluate = parsers[this.language](text);
    console.log(this.evaluate);

};