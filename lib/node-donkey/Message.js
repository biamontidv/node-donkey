var ut = require('./Utils');

var Message = module.exports = function Message(options){
	this.exchange;
	this.header = {};
	this.body = {};
    
    ut.mixin(this,options);
    
	this.messageId = Math.random();    
 };