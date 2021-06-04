const comd=require('commander');
const inq=require('inquirer');
const signup=require('./mongose.js');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const fs=require('fs');
var token=null;

var currUser=()=>{
    var tk=fs.readFileSync('tkn.json');
    tk=JSON.parse(tk);        
    const d=jwt.verify(tk,'friendly');
    return d.email;
}

const signques=[{
    type:'input',
    name:'naam',
    message:"please enter your name:"},
    {
        type:'input',
        name:'email',
        message:"please enter your email:"
    },
    {
        type:'input',
        name:'pass',
        message:"please enter your password:"
    },
    {
        type:'input',
        name:'confirm',
        message:"please confirm your password:"
    },
    {
       type:'input',
       name:'nick',
       message:"please enter your name:"
    }];

    const login=[
        {
            type:'input',
            name:'username',
            message:'USERNAME:'
        },
        {
          type:'input',
          name:'pwd',
          message:'PASSWORD:'
        }
      ];
      
    


mongoose.connect('mongodb://127.0.0.1:27017/Friendly',{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});

//SIGNUP COMMAND BEGINS....
comd.command('signup').action(()=>{                                                         //SIGNUP BLOCK STARTS....              
        inq.prompt(signques).then((answers)=>
        {
            signup.findOne({ email:answers.email},(error,arr)=>
            {  
                if(arr===null)
                {   
                    signup.findOne({ nickname:answers.nick },(error,found)=>
                    {   
                        if(found==null)
                        {
                        const user=new signup({naam:answers.naam,email:answers.email,password:answers.pass,nickname:answers.nick});
                        user.save().then(()=>
                        {
                        
                            console.log("Sign in successful,please Login");
                         
                        }) //block to successfully save the document finish.
                        .catch((error)=>
                            {
                             console.log(error);  
                            });//block to catch error while saving document in database finish.
                        }
                        else
                        {
                            console.log("ERROR : Email or Nickname already exists.");
                        }
                    });
                }
                else
                {
                        console.log("ERROR : Email or Nickname already exists.");
                }

            });
             
        
        }); //block to provide credentials finish.signques prompt then finish.
        
   });
   //SIGNUP COMMAND FINISH .....
   
   
   //LOGIN COMMAND BEGINS....
   comd.command('login').action(()=>
   {
          inq.prompt(login).then((answers)=>
          {
             signup.findOne({nickname:answers.username},(error,usr)=>
             {      
                 
                     if(usr!=null)
                      {
                       
                          const pd=usr.password;
                          if(answers.pwd==pd) //We HAVE TO PRODUCE TOKEN INSIDE IT.
                           {       
                                   token=jwt.sign({email:usr.email},'friendly',{expiresIn:'600 seconds'});
                                   token=JSON.stringify(token);
                                   fs.writeFileSync('tkn.json',token); 
                                  
                                  // console.log(d.email);
                                   console.log("LOGIN SUCCEEDED");
                                  
                           }
                           else
                           {
                                    console.log("WRONG PASSWORD");
                           }
                      }
                      else
                      console.log('This User does not exists.Please signup');
             });
          });
   });
   //LOGIN COMMAND FINISH...

   // FETCH FRIEND LIST AND PENDING REQUEST COMMAND BEGINS....
   comd.command('friends').action(()=>
   {
          var curr=currUser();
          signup.findOne({email:curr},(error,arr)=>
          {
             var count=arr.friends.length;
             var pending=arr.requests.length;
             if(count>0)
               {
                   console.log(`Friends count: ${count}`);
                   for(var i=0;i<count;i++)
                     {
                         console.log('@'+arr.friends[i].nick);
                         console.log(arr.friends[i].nm);
                         console.log('\r\n');
                     }
               }else{console.log(`Friends count: ${count}`); }
             if(pending>0)
                {
                    console.log(`Pending requests: ${pending}`);
                    for(var i=0;i<pending;i++)
                      {
                          console.log('@'+arr.requests[i].nick);
                          console.log(arr.requests[i].nm);
                          console.log('\n');
                      }
                }else{console.log(`Pending requests: ${pending}`);}
          });
   });

   
// FETCH FRIEND LIST AND PENDING REQUEST COMMAND FINISHED....
  

//COMMAND TO ACCEPT FRIEND REQUEST BEGINS....
comd.command('pending_request--accept <nname>').action((nname)=>
    {
        var nckn=nname;
        var nme;
        var id;
        var user1;
        var curr=currUser();
        console.log(curr);
        signup.findOne({email:curr},(error,arr)=>
        {    
            arr.requests.push({nm:'Ayush Nigam',nick:'ayush'});
            console.log(arr);
             signup.findOne({nickname:nckn},(error,found)=>
             {        

                      //console.log(arr);
                      //nme=found.naam;
                      //id=found._id;
                      var index=arr.requests.indexOf({nm:found.naam,nick:found.nickname});
                      if(index<0)
                        {
                            index=arr.requests.length+index;
                        }
                        console.log(index);
                      arr.friends.push(arr.requests[index]);
                      arr.requests.splice(index,1);
                      //console.log("DONE");
             });
              
        });
       
       
    });
//COMMAND TO ACCEPT FRIEND REQUEST FINISHED....

comd.command('friends-filter')

  
  
  
  
   comd.parse(process.argv);
