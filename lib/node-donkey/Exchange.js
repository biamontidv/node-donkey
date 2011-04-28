var ut = require('./Utils');

var Exchange = module.exports = function(options){
	this.exchangePattern;
	this.in;
	this.out;
	this.fromEndpoint
	this.fromRouteId;
	this.exchangeException;
	this.properties;
	ut.mixin(this,options);
};

Exchange.prototype.getIn = function(){
	return this.in;
};
Exchange.prototype.setIn = function(In){
	this.in = In;
};
Exchange.prototype.getOut = function(){
	return this.out;
};