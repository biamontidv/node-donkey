var Exchange = module.exports = function(In,Out){
	this.exchangePattern;
	this._in = In;
	this._out = Out;
	this.fromEndpoint
	this.fromRouteId;
	this.exchangeException;
};

Exchange.prototype.getIn = function(){
	return this._in;
};
Exchange.prototype.setIn = function(In){
	this._in = In;
};
Exchange.prototype.getOut = function(){
	return this._out;
};