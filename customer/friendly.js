const comd=require('commander');
const inq=require('inquirer');
const signup=require('./mongose.js');
const psts=require('./post.js');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const fs=require('fs');
const valid=require('validator');
var token=null;

const postques=[{type:'input',name:'pst',message:'ENTER YOUR MESSAGE'}];

//FUNCTION TO FETCH CURRENT LOGGED IN USER EMAIL
var currUser=()=>{
    var tk=fs.readFileSync('tkn.json');
    tk=JSON.parse(tk);        
    const d=jwt.verify(tk,'friendly');
    return d.email;
}

const unq=[{type:'input',name:'choice',message:'ARE YOU SURE? yes/no : '}]

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
       message:"please enter your nickname:"
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
                    signup.findOne({ nickname:'@'+answers.nick },(error,found)=>
                    {   
                        if(found==null)
                        {
                            var nk=answers.nick;
                        const user=new signup({naam:answers.naam,email:answers.email,password:answers.pass,nickname:'@'+nk});
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
              var nk='@'+answers.username;
             signup.findOne({nickname:nk},(error,usr)=>
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
                         console.log(arr.friends[i].nick);
                         console.log(arr.friends[i].nm);
                         console.log('\r\n');
                     }
               }else{console.log(`Friends count: ${count}`); }
             if(pending>0)
                {
                    console.log(`Pending requests: ${pending}`);
                    for(var i=0;i<pending;i++)
                      {
                          console.log(arr.requests[i].nick);
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
        var nckn='@'+nname;
        var curr=currUser();  //FETCHES THE EMAIL ID OF LOGGED IN USER.
        signup.findOne({email:curr},(error,arr)=>
        {    
             signup.findOne({nickname:nckn},(error,found)=>
             {        

                      //console.log(arr);
                      //nme=found.naam;
                      //id=found._id;
                      var index=arr.requests.indexOf({nm:found.naam,nick:found.nickname,eml:found.email});
                      if(index<0)
                        {
                            index=arr.requests.length+index;
                        }
                      arr.friends.push(arr.requests[index]);
                      found.friends.push({nm:arr.naam,nick:arr.nickname,eml:arr.email});
                      arr.requests.splice(index,1);
                      //console.log("DONE");
                      signup.findOneAndUpdate({email:curr},{friends:arr.friends,requests:arr.requests},()=>
                      {
                             console.log("ACCEPTED "+nckn);
                      });
                      signup.findOneAndUpdate({email:found.email},{friends:found.friends},()=>
                      {
                             console.log("");
                      });
             });
              
        });
       
       
    });
//COMMAND TO ACCEPT FRIEND REQUEST FINISHED....

//COMMAND TO REJECT FRIEND REQUEST BEGINS....
comd.command('pending_request--reject <nname>').action((nname)=>
    {
        var nckn='@'+nname;
        var curr=currUser();  //FETCHES THE EMAIL ID OF LOGGED IN USER.
        signup.findOne({email:curr},(error,arr)=>
        {    
             signup.findOne({nickname:nckn},(error,found)=>
             {        

                      //console.log(arr);
                      //nme=found.naam;
                      //id=found._id;
                      var index=arr.requests.indexOf({nm:found.naam,nick:found.nickname,eml:found.email});
                      if(index<0)
                        {
                            index=arr.requests.length+index;
                        }
                      arr.requests.splice(index,1);
                      //console.log("DONE");
                      signup.findOneAndUpdate({email:curr},{requests:arr.requests},()=>
                      {
                             console.log("REJECTED "+nckn);
                      });
             });
              
        });
       
    });
    //COMMAND TO REJECT FRIEND REQUEST FINISHED....

//COMMAND TO FILTER FRIENDS USING EMAIL OR NICKNAME OR NAME BEGINS....
comd.command('friends--filter <input>').action((input)=>
   {
       var curr=currUser();
       signup.findOne({email:curr},(error,arr)=>
       {
        var count=0;
       
        if(valid.isEmail(input))
          {
              var length=arr.friends.length;
              for(var i=0;i<length;i++)
               {
                   if(arr.friends[i].eml===input)
                      {
                          count=count+1;
                      }
               }
          }
          else if(input.charAt(0)==='@')
          {
              var length=arr.friends.length;
              for(var i=0;i<length;i++)
               {
                   if(arr.friends[i].nick===input)
                      {
                          count=count+1;
                      }
               }
          }
          else
          {
              var length=arr.friends.length;
              for(var i=0;i<length;i++)
               {
                   if(arr.friends[i].nm===input)
                      {
                          count=count+1;
                      }
               }
          }
          console.log(`FOUND ${count} ${input}`);
       });
   });

//COMMAND TO FILTER FRIENDS USING EMAIL OR NICKNAME OR NAME FINISHED....

//COMMAND TO POST NEW MESSAGE STARTS
comd.command('post--new-post').action(()=>{                                                       
    inq.prompt(postques).then((answers)=>
    {
        var curr=currUser();
        
        signup.findOne({email:curr},(error,arr)=>
        {
            const dt=new Date();
            const day=dt.getDate()
            const month=dt.getMonth()+1;
            const year=dt.getFullYear();
            const hour=dt.getHours();
            const min=dt.getMinutes();
            const sec=dt.getSeconds();
            const stamp=`${day}-${month}-${year}  ${hour}:${min}:${sec}`;
            psts.countDocuments({},(error,count)=>{
                const npost=new psts({id:count+1,nickname:arr.nickname,date:stamp,message:answers.pst});
                npost.save().then(()=>{
                    console.log("POSTED SUCCESSFULLY")
            });

            
            });    
        });

    });
});

// SHOW PROFILE COMMAND BEGINS....
comd.command('show_profile <input>').action((input)=>
{
     curr=currUser();
     var ipt='@'+input;
     signup.findOne({nickname:ipt},(error,arr)=>
     {
          var count=arr.friends.length;
          var mfri=0;
          signup.findOne({email:curr},(error,found)=>
          {
              var ct=found.friends.length;
             for(var i=0;i<count;i++)
               {
                   for(var j=0;j<ct;j++)
                    {
                        if(arr.friends[i]===found.friends[j])
                        {
                            mfri=mfri+1;
                        }
                    }
                   
               }
          });
          var pstcnt;
          psts.countDocuments({nickname:arr.nickname},(error,c)=>
         {
              pstcnt=c;
             //});
             console.log("NAME:",arr.naam);
             console.log("FRIENDS COUNT:",count);
             console.log("MUTUAL FRIENDS:",mfri);
             console.log("POST COUNT",pstcnt);
          psts.find({nickname:arr.nickname},(error,pt)=>
            {
                    if(pt.length!=0 && pt.length<=10)
                {
                    console.log('RECENT POST :\n');
                    for(var i=0;i<pt.length;i++)
                    {
                         console.log(pt[i]);
                         console.log('\n');
                    }
                }
                else if(pt.length!=0 && pt.length>10)
                    {
                        console.log('RECENT POST :\n');
                           for(var i=0;i<10;i++)
                         {
                             console.log(pt[pt.length-i-1]);
                             console.log('\n');
                         }
                    }

           });
     });
    });
});
// SHOW PROFILE COMMAND FINISHED....

//UNFRIEND COMMAND BEGINS....
   comd.command('unfriend <input>').action((input)=>
   {
         inq.prompt(unq).then((answers)=>
         {  
             if(answers.choice==='yes')
             {
                var nk='@'+input;
                curr=currUser();
                signup.findOne({email:curr},(error,arr)=>
                  {
                      signup.findOne({nickname:nk},(error,found)=>
                      {
                        var index1=arr.friends.indexOf({nm:found.naam,nick:found.nickname,eml:found.email});
                        if(index1<0)
                          {
                              index1=arr.friends.length+index1;
                          }
                          var index2=found.requests.indexOf({nm:arr.naam,nick:arr.nickname,eml:arr.email});
                          if(index2<0)
                            {
                                index2=found.friends.length+index2;
                            }
                        found.friends.splice(index2,1);
                        arr.friends.splice(index1,1); 
                        signup.findOneAndUpdate({email:curr},{friends:arr.friends},()=>
                          {
                            signup.findOneAndUpdate({nickname:nk},{friends:found.friends},()=>
                            {
                                   console.log("");
                            });
                          });

                      });
                  });
             }
  
         });
   });

//UNFRIEND COMMAND FINISHED....

//POST LIKE COMMAND BEGINS...'
comd.command('post-like <id>').action((id)=>
  {
    curr=currUser();
    signup.findOne({email:curr},(error,arr)=>
    {
        var idi=Number(id);
       psts.findOne({id:idi},(error,found)=>
       {
             if(found!=null)
              {
                  found.like=found.like+1;
                  psts.findOneAndUpdate({id:idi},{like:found.like},()=>
                  {
                       console.log("");
                  });
              }
       });
    });
  });
//POST LIKE COMMAND FINISHED...
  
//POST DISLIKE COMMAND  BEGINS....
comd.command('post-dislike <id>').action((id)=>
{
  curr=currUser();
  signup.findOne({email:curr},(error,arr)=>
  {
      var idi=Number(id);
     psts.findOne({id:idi},(error,found)=>
     {
           if(found!=null)
            {
                found.like=found.like-1;
                psts.findOneAndUpdate({id:idi},{like:found.like},()=>
                {
                     console.log("");
                });
            }
     });
  });
});
//POST DISLIKE COMMAND  FINISHED....
  
//SEND FRIEND REQUEST COMMAND STARTS...
   comd.command('send_request <nkn>').action((nkn)=> 
      {
          var nknm='@'+nkn;
          curr=currUser();
          signup.findOne({email:curr},(error,arr)=>
          {
             signup.findOne({nickname:nknm},(error,found)=>
               {
                   found.requests.push({nm:arr.naam,nick:arr.nickname,eml:arr.email});
                   signup.findOneAndUpdate({nickname:nknm},{requests:found.requests},()=> 
                   {
                         console.log("REQUEST SENT..");
                   })   
               });
          });

      });
//SEND FRIEND REQUEST COMMAND FINISHED...

//LOGOUT COMMAND BEGINS.....
 comd.command('logout').action(()=>
    {
       fs.writeFileSync('tkn.json',"");
       console.log("LOGOUT SUCCESSFUL");
    });
//LOGOUT COMMAND FINISHED.....


comd.parse(process.argv);
