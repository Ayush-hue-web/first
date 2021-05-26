import fs from 'fs';
var bf=fs.readFileSync("config.json");
var dt=JSON.parse(bf);
var tp=dt[0];
var level=dt[1];
var location=dt[2];
var logg;
//fs.writeFileSync(location,JSON.stringify('ayush'));
export default logg= function(typ,lvl,msg){
      if(typ==tp.ter)
        {
            if(lvl==level.ERROR)
              {
                  console.log(lvl+':'+msg);
              }else if(lvl==level.TRACE)
              {
                  console.log(lvl+':'+msg);
              }else if(lvl==level.DEBUG)
              {
                  console.log(lvl+':'+msg);
              }else if(lvl==level.INFO)
              {
                  console.log(lvl+':'+msg);
              }else if(lvl==level.NONE)
              {
                  console.log(lvl+':'+msg);
              }else if(lvl==level.WARN)
              {
                  console.log(lvl+':'+msg);
              }
        }else if(typ==tp.file)
           {
            if(lvl==level.ERROR)
            {
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }else if(lvl==level.TRACE)
            {
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }
            else if(lvl==level.WARN)
            {
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }
            else if(lvl==level.ALL)
            {
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }
            else if(lvl==level.DEBUG)
            {
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }
            else if(lvl==level.NONE)
            {
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }
           }else if(typ==tp.both)
           {
            if(lvl==level.ERROR)
            {
                console.log(lvl+':'+msg);
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }else if(lvl==level.TRACE)
            {
                console.log(lvl+':'+msg);
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }
            else if(lvl==level.WARN)
            {
                console.log(lvl+':'+msg);
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }
            else if(lvl==level.ALL)
            {
                console.log(lvl+':'+msg);
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }
            else if(lvl==level.DEBUG)
            {
                console.log(lvl+':'+msg);
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }
            else if(lvl==level.NONE)
            {
                console.log(lvl+':'+msg);
                var f=JSON.stringify(lvl+':'+msg);
                fs.appendFileSync(location,f);
            }
           }
}
// logg('both','ERROR');
// logg('both','DEBUG');


// var l=fs.readFileSync('data.json');
// var l1=JSON.parse(l);
// console.log(l.toString());