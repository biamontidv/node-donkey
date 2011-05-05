var ut = require('../Utils');

var Component = module.exports = function(options){
	ut.mixin(this,options);
    console.log('New '+this.constructor.name+' created');
};

Component.prototype.createEndpoint;