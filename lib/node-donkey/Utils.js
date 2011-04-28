var mixin = function(target,source){
					Object.keys(source||{}).forEach(function(item){		
						target[item] = source[item];		
					})
				};

exports.mixin = mixin;