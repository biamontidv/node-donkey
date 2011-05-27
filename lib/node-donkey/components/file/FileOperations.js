var fs = require('fs');
var Path = require('path');

var FileOperations = module.exports = function FileOperation(){
    var self = this;
    
    var write = function(target,source){
        fs.writeFile(target,source,function(err){
            if (err) throw err;
            console.log('It\'s saved!');
        });
    };

    var doOverride = function Override(target,source){
        write(target,source);
    };
    
    var doAppend = function Append(target,source){
        console.log('['+self.constructor.name+'] operation Append currently not supported, ignoring');
        doIgnore(target,source);
    };
    
    var doFail = function Fail(target,source){
        if(Path.existsSync(target)){
            throw new Error('file already exists');
        } else {
            write(target,source);
        };
        
    };
    
    var doIgnore = function Ignore(target,source){
        if(Path.existsSync(target)){
            console.log('['+self.constructor.name+'] file exists, do nothing and carry on');
        } else {
            write(target,source);
        };
        
    };
    
    this.fileExistStrategy = {'Override':doOverride
                            ,'Append':doAppend
                            ,'Fail':doFail
                            ,'Ignore':doIgnore };
    
    
};

FileOperations.prototype.writeFile = function(filename,exchange,strategy){
    var target = filename;
    var source = exchange.getIn().body;
    console.log('[writeFile] strategy ' + strategy);
    this.fileExistStrategy[strategy](target,source);
    

};

FileOperations.prototype.createDir = function(dir){
    if (Path.existsSync(dir)) {
        console.log(dir + ' already exists');
    } else {
        console.log('creating ' + dir);
        var dirs = '';
        dir.split('/').forEach(function(d){
            dirs = Path.normalize(dirs+'/'+d);
            if (Path.existsSync(dirs)) {
                console.log(dir + ' already exists');
            } else {
                console.log('creating ' + dirs);                
                console.log(fs.mkdirSync(dirs,'0666'));
            }
        });
    }    
};