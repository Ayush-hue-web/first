import fs from 'fs';
//console.log([1,2,3,4,5]);
//console.table({number : 1,name1 :'Ayush'});
//console.clear();
var dt=[];
var d=JSON.stringify(dt);
fs.writeFileSync("config.json",d);
var level ={
       'TRACE': 'TRACE',
       'DEBUG': 'DEBUG',
       'ERROR': 'ERROR',
       'ALL': 'ALL',
       'NONE': 'NONE',
       'WARN': 'WARN',
       'INFO':'INFO'
};
var type ={
    'ter': 'ter',
    'file': 'file',
    'both':'both'
};

var loc="data.json";
dt.push(type);
dt.push(level);
dt.push(loc);
var d=JSON.stringify(dt);
fs.writeFileSync("config.json",d);
 