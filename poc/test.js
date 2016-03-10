var fs= require('fs');
'use strict';


var readFileP = function(path) {
  return new Promise(function(resolve) {
   fs.readFile(path,'utf8',function(error, data){
    if (error){
    console.log(error);
    }
    else {
    console.log(data);
    resolve(data);
    console.log('read done');
    }
})
    
  });
}

var writeFileP = function(data){
console.log(data);// data is not defined, but why?
fs.writeFile('./6.txt',data, function(err,data2){
if(err){
console.log(err);
}
else{
console.log('write done');
}
})
};

readFileP('./1.txt').then(writeFileP());