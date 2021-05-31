import mongodb from 'mongodb';
var MongoClient=mongodb.MongoClient;
var dburl='mongodb://127.0.0.1:27017';
var dbnm='crud';
MongoClient.connect(dburl,{useNewUrlParser: true},(error,client)=>{
    if(error)
      {
          return console.log("Unable to connect");
        
      }
      console.log("Connection Successful");
      var db=client.db(dbnm);
});