var fs = require('fs');

var FileOperations = module.exports = function FileOperation(){
};

FileOperations.prototype.writeFile = function(filename,exchange){
    var target = filename;
    var source = exchange.getIn().body;
    
    fs.writeFile(target,source,function(err){
        if (err) throw err;
        console.log('It\'s saved!');
    });
};