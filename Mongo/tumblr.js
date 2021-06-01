import mongodb from 'mongodb';
import request from 'request';
import fs from 'fs';
var operation=function(dt){
    dt=dt.replace(/(\r\n|\n|\r)/gm,'');
    var api='https://'+dt+'.tumblr.com/api/read/json'; 
    request({url:api},(error,response)=>{
          if(error){
              console.log('Connection unavailable');
          }else if(response.statusCode!=200)
             {
                 console.log("INVALID HOST NAME");
             }else{
                var MongoClient=mongodb.MongoClient;
                var dburl='mongodb://127.0.0.1:27017';
                var dbnm='crud';
                
                  //console.log(nw);
                var dt1=JSON.stringify(response);
                fs.writeFileSync('dt.json',dt1);
                var rd=fs.readFileSync('dt.json');
                var rsp=JSON.parse(rd);
                //console.log(rsp.body);
               // fs.writeFileSync('dt1.json',rsp.body);
                var bdy=fs.readFileSync('dt1.json');
                bdy=JSON.parse(bdy);
                console.log('BLOG INFO::\r\n'+bdy.tumblelog.description);
                var lt=bdy.posts.length;
                console.log(lt);
                MongoClient.connect(dburl,{useNewUrlParser: true},(error,client)=>{
                    if(error)
                      {
                          return console.log("Unable to connect to database");
                        
                      }
                      console.log("Database Connection Successful");
                      var db=client.db(dbnm);
                    for(var i=0;i<lt;i++){
                        var t=bdy.posts[i].url;
                        console.log(t);
                       db.collection(dt).insertOne({link: t});
                    }
                });
          }
    });//request function end
    

}// operation function end














console.log("ENTER BLOG NAME");
process.stdin.once('data',(chunk)=>{
    operation(chunk.toString());
}
);