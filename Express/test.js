const ex=require('express');
const moment =require('moment');//deals with date and time.
const app=ex();
app.get('/',function(req,res){
    res.send('Hello WORLD');

});
app.listen(5000,()=>{
    console.log("SERVER STARTED ON 5000");
});
